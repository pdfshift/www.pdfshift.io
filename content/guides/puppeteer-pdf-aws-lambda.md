---
title: "Puppeteer PDFs on Lambda and Vercel with @sparticuz/chromium"
description: "Puppeteer and Playwright PDFs on AWS Lambda and Vercel: the version pairing that works today, our bundle sizes against each limit, and the 6 MB response cap."
date: "2026-11-09"
dateModified: "2026-11-09"
author: "Cyril Nicodème"
faq:
  - question: "Does @sparticuz/chromium work on arm64 (Graviton) Lambda functions?"
    answer: "Not from the main npm package, which includes only x64 binaries. Since Chromium 135, each GitHub release also has an arm64 Lambda layer zip and an arm64 pack tar. Use the layer, or @sparticuz/chromium-min with the arm64 pack."
  - question: "How do I add a Lambda layer for @sparticuz/chromium?"
    answer: "Take the layer zip from a GitHub release, or build it with make chromium.x64.zip from the repository. It's over 50 MB, so upload it to S3 and publish the layer from there. Then make @sparticuz/chromium a dev dependency, since the layer carries the binary. Without a layer, it stays a production dependency."
  - question: "Can @sparticuz/chromium make tagged (accessible) PDFs?"
    answer: "No. This build of Chromium can't make tagged PDFs, and the package's README says you'd need to compile Chromium yourself to get them."
---

A PDF function built from `puppeteer-core` and `@sparticuz/chromium` zips to 78 MB, and Lambda refuses a direct upload over 50 MB. So ship it through S3, a layer or a container image. Then pin `puppeteer-core` to the Chromium version `@sparticuz/chromium` ships (25.11.x for 153 today), give the function 1,600 MB of memory or more, and send the PDF back through S3 or a stream.

On Lambda or Vercel, you're still running a browser, just in a smaller box, and each of those workarounds is one more thing you maintain.

## How do you run Puppeteer page.pdf() on AWS Lambda?

Here's a handler for the Node.js 22 runtime on x86_64, written for `puppeteer-core` 25.11.0 and `@sparticuz/chromium` 153.0.0:

```javascript
// index.mjs
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({});

export const handler = async (event) => {
    const browser = await puppeteer.launch({
        args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
        executablePath: await chromium.executablePath(),
        headless: 'shell',
    });

    try {
        const page = await browser.newPage();
        await page.setContent(event.html, { waitUntil: 'load' });
        const pdf = await page.pdf({ format: 'A4', printBackground: true });

        // Write the PDF to S3 rather than returning it (see the 6 MB limit below)
        const key = `pdfs/${Date.now()}.pdf`;
        await s3.send(new PutObjectCommand({
            Bucket: process.env.PDF_BUCKET,
            Key: key,
            Body: pdf,
            ContentType: 'application/pdf',
        }));
        return { key };
    } finally {
        // Always close the browser, even when the job throws
        await browser.close();
    }
};
```

```json
{
  "type": "module",
  "dependencies": {
    "@sparticuz/chromium": "153.0.0",
    "puppeteer-core": "~25.11.0"
  }
}
```

The Node.js runtimes already include the AWS SDK for JavaScript v3, so `@aws-sdk/client-s3` isn't in the bundle. Then get three settings right:

- **Memory.** The [@sparticuz/chromium README](https://github.com/Sparticuz/chromium) asks for at least 512 MB and recommends 1,600 MB or more. Lambda gives CPU in proportion to memory, with the equivalent of one vCPU at 1,769 MB.
- **Timeout.** Raise it well past the default, since a cold start unpacks Chromium before the first page loads.
- **Bundling.** If you bundle with esbuild, webpack or rollup, mark `@sparticuz/chromium` as external. The error `The input directory "/var/task/bin" does not exist` almost certainly means you didn't.

`@sparticuz/chromium` 153.0.0 needs Node.js `^22.17.0` or `>=24.0.0`. For waiting on fonts and freeing memory between jobs, the same rules as on a server apply: see [our Puppeteer production guide](/guides/puppeteer-pdf-in-production/).

## Which puppeteer-core version works with @sparticuz/chromium?

The one whose Chrome for Testing has the same major version. `@sparticuz/chromium` versions follow Chromium's (153.x.x is Chromium 153) and don't follow semantic versioning, so a breaking change can land in a patch release. Puppeteer's [supported browsers page](https://pptr.dev/supported-browsers) says which Chrome each release targets:

| puppeteer-core | Chrome for Testing | @sparticuz/chromium |
|---|---|---|
| 25.11.0 | 153.0.8010.36 | 153.0.0 |
| 25.16.0 (npm latest) | 156.0.8078.47 | none yet |

That second row is what `npm install puppeteer-core` gives you on November 9, 2026. The newest `@sparticuz/chromium` is 153.0.0, published September 11. Install both at their latest and you get a pair that was never meant to run together. Pin `puppeteer-core` to `~25.11.0` until a `@sparticuz/chromium` 156 ships.

When you upgrade, move both packages together. In one [r/node thread](https://www.reddit.com/r/node/comments/1o741zn/puppeteercore_with_sparticuzchromium_fails_on/), Chromium wouldn't start on Vercel with `error while loading shared libraries: libnss3.so`, and one commenter fixed it by taking `@sparticuz/chromium` from 131 to 141 with `puppeteer-core` alongside.

## Will @sparticuz/chromium fit in a Lambda or Vercel function?

It fits the unzipped limit, not the zipped one. Lambda takes [50 MB zipped through the API, SDKs or console](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html), and 250 MB unzipped, layers included. Vercel's limit is 250 MB uncompressed. Here's each route zipped with its handler and `node_modules`, at the latest npm versions on November 9, 2026 (puppeteer-core 10.4.0 for chrome-aws-lambda):

| Route | Zip | Unzipped |
|---|---|---|
| puppeteer-core 25.16.0 + @sparticuz/chromium 153.0.0 | 78.14 MB | 104.26 MB |
| playwright-core 1.65.0 + @sparticuz/chromium 153.0.0 | 75.77 MB | 91.23 MB |
| chrome-aws-lambda 10.1.0 + puppeteer-core 10.4.0 | 52.28 MB | 61.04 MB |
| playwright-aws-lambda 0.11.0 + playwright-core 1.65.0 | 47.54 MB | 58.61 MB |
| puppeteer-core 25.16.0 + @sparticuz/chromium-min 153.0.0 | 8.18 MB | 34.22 MB |

::guide-figure{caption="Deploy zip per Chromium route, with Lambda's 50 MB direct-upload limit. Our measurement, latest version of each package (puppeteer-core 10.x for chrome-aws-lambda), zip -9, November 9, 2026."}
<svg viewBox="0 0 400 324" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lz-zip-title lz-zip-desc" style="max-width:400px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="lz-zip-title">Two current Chromium routes zip past Lambda's 50 MB upload limit</title>
<desc id="lz-zip-desc">Horizontal bar chart of deploy zip size in MB. puppeteer-core with @sparticuz/chromium 78.14 MB; playwright-core with @sparticuz/chromium 75.77 MB; chrome-aws-lambda with puppeteer-core 10 52.28 MB; playwright-aws-lambda with playwright-core 47.54 MB; puppeteer-core with @sparticuz/chromium-min 8.18 MB. A marker shows the 50 MB direct-upload limit.</desc>
<g style="font-size:13px" fill="#0A0C3D">
<text x="193" y="18" fill="#FF9D28" style="font-weight:500">50 MB upload limit</text>
<text x="0" y="42">puppeteer-core + @sparticuz/chromium</text>
<text x="0" y="98">playwright-core + @sparticuz/chromium</text>
<text x="0" y="154">chrome-aws-lambda + puppeteer-core 10</text>
<text x="0" y="210">playwright-aws-lambda + playwright-core</text>
<text x="0" y="266">puppeteer-core + @sparticuz/chromium-min</text>
</g>
<g fill="#6C47FF">
<rect x="0" y="48" width="293" height="18" rx="2"/>
<rect x="0" y="104" width="284" height="18" rx="2"/>
<rect x="0" y="160" width="196" height="18" rx="2"/>
<rect x="0" y="216" width="178" height="18" rx="2"/>
<rect x="0" y="272" width="31" height="18" rx="2"/>
</g>
<g stroke="#FF9D28" stroke-width="2" stroke-dasharray="4 3">
<line x1="187.5" y1="45" x2="187.5" y2="69"/>
<line x1="187.5" y1="101" x2="187.5" y2="125"/>
<line x1="187.5" y1="157" x2="187.5" y2="181"/>
<line x1="187.5" y1="213" x2="187.5" y2="237"/>
<line x1="187.5" y1="269" x2="187.5" y2="293"/>
</g>
<g style="font-size:13px;font-weight:500" fill="#0A0C3D">
<text x="299" y="62">78.14 MB</text>
<text x="290" y="118">75.77 MB</text>
<text x="202" y="174">52.28 MB</text>
<text x="194" y="230">47.54 MB</text>
<text x="37" y="286">8.18 MB</text>
</g>
<g style="font-size:13px" fill="#4C556D">
<line x1="0" y1="300" x2="300" y2="300" stroke="#DBE4F2"/>
<text x="0" y="318">0</text>
<text x="75" y="318" text-anchor="middle">20</text>
<text x="150" y="318" text-anchor="middle">40</text>
<text x="225" y="318" text-anchor="middle">60</text>
<text x="300" y="318" text-anchor="middle">80 MB</text>
</g>
</svg>
::

The weight is one file: `chromium.br`, 67.02 MB of Brotli-compressed Chromium. It's already compressed, so zip can't shrink it. There are four ways past the 50 MB limit:

- **Upload the zip through S3.** Lambda takes larger files from Amazon S3, and the 250 MB unzipped limit still applies.
- **Use a layer.** Each GitHub release has a ready layer zip, and your function zip shrinks to your own code.
- **Use a container image.** Lambda accepts images up to 10 GB.
- **Use @sparticuz/chromium-min.** It ships without Chromium. You host the `chromium-pack` tar from the release at a URL, and the function downloads it on a cold start.

The zip is only half the cost. At a cold start, `@sparticuz/chromium` unpacks its files into `/tmp`: the 209.02 MB `chromium` binary, 7.49 MB of SwiftShader graphics libraries, 0.46 MB of fonts and, on Amazon Linux 2023, 3.53 MB of system libraries. The Node.js 22, 24 and 26 runtimes all run Amazon Linux 2023, so plan for 220.50 MB in `/tmp`, which you can size from 512 MB to 10,240 MB. A warm function keeps `/tmp`, so the unpack happens once per execution environment.

::guide-figure{caption="@sparticuz/chromium 153.0.0: files in the package vs what it unpacks into /tmp on Amazon Linux 2023. Our measurement, November 9, 2026."}
<svg viewBox="0 0 400 162" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lz-tmp-title lz-tmp-desc" style="max-width:400px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="lz-tmp-title">70 MB in the package becomes 220.5 MB in /tmp</title>
<desc id="lz-tmp-desc">Horizontal bar chart in MB. Brotli files in the package: 70.05 MB. Unpacked into /tmp at a cold start: 220.50 MB. A marker shows the smallest /tmp size, 512 MB.</desc>
<g style="font-size:13px" fill="#0A0C3D">
<text x="300" y="18" text-anchor="end" fill="#FF9D28" style="font-weight:500">512 MB: smallest /tmp</text>
<text x="0" y="42">Files in the npm package (.br)</text>
<text x="0" y="98">Unpacked into /tmp at a cold start</text>
</g>
<g fill="#6C47FF">
<rect x="0" y="48" width="41" height="18" rx="2"/>
<rect x="0" y="104" width="129" height="18" rx="2"/>
</g>
<g style="font-size:13px;font-weight:500" fill="#0A0C3D">
<text x="47" y="62">70.05 MB</text>
<text x="135" y="118">220.50 MB</text>
</g>
<line x1="299" y1="26" x2="299" y2="132" stroke="#FF9D28" stroke-width="2" stroke-dasharray="4 3"/>
<g style="font-size:13px" fill="#4C556D">
<line x1="0" y1="138" x2="300" y2="138" stroke="#DBE4F2"/>
<text x="0" y="156">0</text>
<text x="150" y="156" text-anchor="middle">256</text>
<text x="300" y="156" text-anchor="end">512 MB</text>
</g>
</svg>
::

## Is chrome-aws-lambda still maintained?

No. Its last release, 10.1.0, came out July 17, 2021, with Chromium 92. Its fork, `@sparticuz/chrome-aws-lambda`, is marked deprecated on npm with "Please migrate to @sparticuz/chromium". If you're still on it, your PDFs come out of a 2021 browser. Moving means swapping the package and the launch options for the ones above, and pinning a `puppeteer-core` that matches.

## How do you use Playwright with @sparticuz/chromium?

Point Playwright's Chromium at the binary `@sparticuz/chromium` unpacks, and give each call its own user data directory. Here it is for `playwright-core` 1.65.0:

```javascript
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
import { randomUUID } from 'node:crypto';
import { rm } from 'node:fs/promises';

export const handler = async (event) => {
    // A fresh user data dir per call, removed afterwards
    const userDataDir = `/tmp/pw-${randomUUID()}`;
    const browser = await playwright.launch({
        args: [...chromium.args, `--user-data-dir=${userDataDir}`],
        executablePath: await chromium.executablePath(),
        headless: true,
    });

    try {
        const page = await browser.newPage();
        await page.setContent(event.html, { waitUntil: 'load' });
        const pdf = await page.pdf({ format: 'A4', printBackground: true });
        // Then write pdf to S3, as in the Puppeteer handler above
    } finally {
        await browser.close();
        await rm(userDataDir, { recursive: true, force: true });
    }
};
```

Playwright doesn't clean its user data directory between calls on a warm Lambda. Without the per-call folder, `/tmp` fills up and you get `ERR_INSUFFICIENT_RESOURCES`. Playwright's docs also say it ["only works with the bundled Chromium"](https://playwright.dev/docs/api/class-browsertype), so a custom `executablePath` is "use at your own risk", and the same version pairing applies.

The older `playwright-aws-lambda` was last released as 0.11.0 on July 25, 2024, and its README lists runtimes up to `nodejs20.x`. For page options, timeouts and memory, see [our Playwright PDF guide](/guides/playwright-pdf-in-production/).

## How do you generate PDFs with Puppeteer on Vercel?

[Vercel's own guide](https://vercel.com/kb/guide/deploying-puppeteer-with-nextjs-on-vercel) uses `puppeteer-core` with `@sparticuz/chromium-min`, because the full `puppeteer` package is too large for the 250 MB function limit. In a Next.js route, that looks like this:

```javascript
// app/api/pdf/route.js
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export async function POST(request) {
    const { html } = await request.json();
    const browser = await puppeteer.launch({
        args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
        // The chromium-pack tar from the @sparticuz/chromium release, hosted by you
        executablePath: await chromium.executablePath(process.env.CHROMIUM_PACK_URL),
        headless: 'shell',
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'load' });
        const pdf = await page.pdf({ format: 'A4', printBackground: true });
        return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });
    } finally {
        await browser.close();
    }
}
```

In `next.config.js`, list `puppeteer-core` and `@sparticuz/chromium` in `serverExternalPackages`. In the [Vercel community thread](https://community.vercel.com/t/sparticuz-chromium-min-working-with-vercel-for-pdf/7877) where the function failed with `The input directory "/var/task/.next/server/bin" does not exist`, that setting plus hosting the pack at a URL was the fix.

Here's what Vercel gives that function:

- **Memory.** 2 GB with 1 vCPU on Hobby. Up to 4 GB with 2 vCPUs on Pro and Enterprise.
- **Duration.** 300 seconds by default with fluid compute, up to 800 seconds on Pro and Enterprise.

## Why won't my PDF come back from Lambda or Vercel?

Because it's bigger than the response limit. A synchronous Lambda call returns at most 6 MB, and a Vercel function body at most [4.5 MB](https://vercel.com/docs/functions/limitations). Return it as base64 and it grows by a third first. So a 4.5 MB PDF already fills Lambda's 6 MB, and on Vercel a base64 PDF has to stay under 3.37 MB.

::guide-figure{caption="Largest PDF one response can carry, from Lambda's 6 MB synchronous response limit and Vercel's 4.5 MB body limit. Base64 turns every 3 bytes into 4."}
<svg viewBox="0 0 400 186" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lz-resp-title lz-resp-desc" style="max-width:400px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="lz-resp-title">A PDF over 4.5 MB doesn't fit in one response</title>
<desc id="lz-resp-desc">Horizontal bar chart of the largest PDF in MB that fits in one response. Lambda, base64 in a 6 MB response: 4.5 MB. Vercel, raw bytes in a 4.5 MB body: 4.5 MB. Vercel, base64 in a 4.5 MB body: 3.37 MB.</desc>
<g style="font-size:13px" fill="#0A0C3D">
<text x="0" y="16">Lambda, base64 in a 6 MB response</text>
<text x="0" y="72">Vercel, raw bytes in a 4.5 MB body</text>
<text x="0" y="128">Vercel, base64 in a 4.5 MB body</text>
</g>
<g fill="#6C47FF">
<rect x="0" y="22" width="225" height="18" rx="2"/>
<rect x="0" y="78" width="225" height="18" rx="2"/>
<rect x="0" y="134" width="169" height="18" rx="2"/>
</g>
<g style="font-size:13px;font-weight:500" fill="#0A0C3D">
<text x="231" y="36">4.5 MB</text>
<text x="231" y="92">4.5 MB</text>
<text x="175" y="148">3.37 MB</text>
</g>
<g style="font-size:13px" fill="#4C556D">
<line x1="0" y1="162" x2="300" y2="162" stroke="#DBE4F2"/>
<text x="0" y="180">0</text>
<text x="100" y="180" text-anchor="middle">2</text>
<text x="200" y="180" text-anchor="middle">4</text>
<text x="300" y="180" text-anchor="middle">6 MB</text>
</g>
</svg>
::

Two ways out:

- **Write it to S3 and return the URL or key**, like the Lambda handler above.
- **Stream it.** Lambda's streamed responses go up to 200 MB, and Vercel's limit doesn't apply to streamed responses.

## Which fonts does @sparticuz/chromium include?

Only Open Sans, in regular, bold and italic, which covers Latin, Greek and Cyrillic. The Lambda runtime has no fonts of its own, so your brand font, or text in any other script, has to come with you. Add fonts through a Lambda layer, or in a `fonts` folder in your function. The package looks in `/var/task/fonts`, `/var/task/.fonts`, `/opt/fonts` and `/tmp/fonts`. Emoji need their own font file, such as Noto Color Emoji.

## What does the same function look like without Chromium?

It's one `fetch` call to a Chromium we run, and have run for PDFs since 2018. The handler below zips to under 1 KB, against 78.14 MB for the Puppeteer one, and it has no versions to match, nothing to unpack and no 50 MB limit to dodge:

```javascript
// index.mjs: no dependencies
export const handler = async (event) => {
    const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
        method: 'POST',
        headers: {
            'X-API-Key': process.env.PDFSHIFT_API_KEY,
            'Content-Type': 'application/json',
        },
        // filename makes PDFShift return JSON with a URL instead of the file
        body: JSON.stringify({ source: event.html, filename: 'invoice.pdf' }),
    });

    if (!response.ok) {
        throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
    }

    const { url } = await response.json();
    return { url };
};
```

With `filename`, the PDF never passes through your function's response, so the 6 MB and 4.5 MB limits don't apply. We keep that file for 2 days, then delete it. Without `filename`, you get the raw PDF back. `s3_destination` saves it straight to your own bucket, and `webhook` makes the call async and posts you the URL when it's done.

The free plan gives you 50 credits a month with no card, and `sandbox: true` makes watermarked test PDFs that don't use credits. [Create a free account](/register/) to get a key, and check the [convert endpoint reference](https://docs.pdfshift.io/api-reference/convert-to-pdf) for every parameter.

## Frequently asked questions

### Does @sparticuz/chromium work on arm64 (Graviton) Lambda functions?

Not from the main npm package, which includes only x64 binaries. Since Chromium 135, each GitHub release also has an arm64 Lambda layer zip and an arm64 pack tar. Use the layer, or `@sparticuz/chromium-min` with the arm64 pack.

### How do I add a Lambda layer for @sparticuz/chromium?

Take the layer zip from a GitHub release, or build it with `make chromium.x64.zip` from the repository. It's over 50 MB, so upload it to S3 and publish the layer from there. Then make `@sparticuz/chromium` a dev dependency, since the layer carries the binary. Without a layer, it stays a production dependency.

### Can @sparticuz/chromium make tagged (accessible) PDFs?

No. This build of Chromium can't make tagged PDFs, and the package's README says you'd need to compile Chromium yourself to get them.
