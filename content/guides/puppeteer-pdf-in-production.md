---
title: "How to run Puppeteer page.pdf() in production"
description: "Puppeteer page.pdf() in production: production-safe code, our measured numbers on memory, browser reuse and waitUntil, and a container checklist."
date: "2026-11-04"
dateModified: "2026-11-04"
author: "Cyril Nicodème"
---

To run Puppeteer's `page.pdf()` in production, launch one browser per process and reuse it, open a new page for each document and close it in `finally`, wait for `load` and then `document.fonts.ready`, keep a timeout on loading and rendering, and install the fonts your documents use in the image.

In a tutorial, `page.pdf()` is three lines. In production, it's a browser you now operate. We ran the same 30-line invoice through it hundreds of times to put numbers on what goes wrong.

## What does production-safe page.pdf() code look like?

Here's the baseline, written for [Puppeteer 25.16.0, which ships with Chrome for Testing 156](https://pptr.dev/supported-browsers), and its [page.pdf() options](https://pptr.dev/api/puppeteer.pdfoptions).

```javascript
import puppeteer from 'puppeteer';

// One browser per process, launched once and reused for every job.
const browser = await puppeteer.launch();

export async function htmlToPdf(html) {
    // A new page (tab) per document.
    const page = await browser.newPage();
    try {
        // 'load' waits for the stylesheets and images in the HTML.
        await page.setContent(html, { waitUntil: 'load', timeout: 30_000 });
        // Then wait for the web fonts the page asked for.
        await page.evaluate(() => document.fonts.ready);

        return await page.pdf({
            format: 'A4',          // the default is Letter
            printBackground: true, // the default is false: no background colors or images
            margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
            timeout: 30_000,
        });
    } finally {
        // Always close the page, even when something above threw.
        await page.close();
    }
}
```

## Why does Puppeteer's memory keep growing?

Because pages you don't close stay open. In our test, every page added a Chromium process and its memory, and both stayed after the PDF was done.

We converted the same invoice 200 times on one browser, once without `page.close()` and once with it. Without it, the Chromium process tree grew from 323 MB to 2,715 MB after 100 jobs and 5,046 MB after 200, running 206 processes. With `page.close()` in `finally`, it went from 325 MB to 642 MB after 100 jobs and held at 659 MB after 200, with 17 processes. That's about 24 MB for every page you forget.

::guide-figure{caption="Chromium memory over 200 PDF jobs on one browser, with and without page.close(). Our test, Puppeteer 25.16.0, November 4, 2026."}
<svg viewBox="-34 0 594 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pptr-mem-title pptr-mem-desc" style="max-width:594px;min-width:460px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pptr-mem-title">Memory grows by about 24 MB a job when pages aren't closed</title>
<desc id="pptr-mem-desc">Line chart of the Chromium process tree's memory in MB after 0, 100 and 200 jobs. Without page.close(): 323, 2,715 and 5,046 MB. With page.close(): 325, 642 and 659 MB.</desc>
<g font-size="13" fill="#4C556D">
<line x1="70" y1="250" x2="530" y2="250" stroke="#DBE4F2"/>
<line x1="70" y1="196" x2="530" y2="196" stroke="#DBE4F2"/>
<line x1="70" y1="141" x2="530" y2="141" stroke="#DBE4F2"/>
<line x1="70" y1="87" x2="530" y2="87" stroke="#DBE4F2"/>
<line x1="70" y1="32" x2="530" y2="32" stroke="#DBE4F2"/>
<text x="62" y="254" text-anchor="end">0</text>
<text x="62" y="200" text-anchor="end">1,500</text>
<text x="62" y="145" text-anchor="end">3,000</text>
<text x="62" y="91" text-anchor="end">4,500</text>
<text x="62" y="36" text-anchor="end">6,000 MB</text>
<text x="80" y="272" text-anchor="middle">0</text>
<text x="300" y="272" text-anchor="middle">100</text>
<text x="520" y="272" text-anchor="middle">200</text>
<text x="300" y="294" text-anchor="middle">Jobs on one browser</text>
</g>
<polyline points="80,238 300,151 520,67" fill="none" stroke="#FF9D28" stroke-width="3"/>
<polyline points="80,238 300,227 520,226" fill="none" stroke="#6C47FF" stroke-width="3"/>
<g fill="#FF9D28"><circle cx="80" cy="238" r="4"/><circle cx="300" cy="151" r="4"/><circle cx="520" cy="67" r="4"/></g>
<g fill="#6C47FF"><circle cx="300" cy="227" r="4"/><circle cx="520" cy="226" r="4"/></g>
<g font-size="13" font-weight="500">
<rect x="84" y="46" width="12" height="4" fill="#FF9D28"/>
<text x="102" y="52" fill="#0A0C3D">No page.close(): 5,046 MB</text>
<rect x="84" y="68" width="12" height="4" fill="#6C47FF"/>
<text x="102" y="74" fill="#0A0C3D">With page.close(): 659 MB</text>
</g>
</svg>
::

A process manager won't save you here: the browser is healthy, it just has 200 tabs open. Close pages in `finally`, and restart the browser now and then if your jobs run for days.

We ran these tests on an Apple M5 Pro with 64 GB of RAM, on macOS, with Node 26 and Puppeteer 25.16.0. Memory is the sum over the browser's process tree. Our test environment blocked Chrome's sandbox, so these runs used `--no-sandbox`.

## Should I launch a new browser for every PDF?

No. You pay for the launch on every job, and a page on a running browser does the same work.

With `networkidle0` as the wait, launching a browser, converting and closing it took 1.47 seconds per job (the median of 30 runs). Reusing one browser cut that to 1.06 seconds (100 runs). So the launch alone cost about 0.4 seconds.

The wait cost more than the launch. With `load` followed by `document.fonts.ready`, the reused browser took 0.24 seconds per job (100 runs), for the same 121.5 KB PDF.

::guide-figure{caption="Median time per PDF in seconds, same 30-line invoice. Our test, Puppeteer 25.16.0, November 4, 2026."}
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pptr-time-title pptr-time-desc" style="max-width:560px;min-width:460px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pptr-time-title">Reusing the browser and waiting for load cut each PDF from 1.47 s to 0.24 s</title>
<desc id="pptr-time-desc">Bar chart of median seconds per PDF. New browser per job, networkidle0: 1.47 s (30 runs). Reused browser, networkidle0: 1.06 s (100 runs). Reused browser, load then fonts ready: 0.24 s (100 runs).</desc>
<g font-size="13" fill="#0A0C3D">
<text x="0" y="30">New browser per job, networkidle0: 1.47 s</text>
<text x="0" y="92">Reused browser, networkidle0: 1.06 s</text>
<text x="0" y="154">Reused browser, load + fonts ready: 0.24 s</text>
</g>
<rect x="0" y="40" width="540" height="22" rx="4" fill="#FF9D28"/>
<rect x="0" y="102" width="389" height="22" rx="4" fill="#4C556D"/>
<rect x="0" y="164" width="88" height="22" rx="4" fill="#6C47FF"/>
<line x1="0" y1="34" x2="0" y2="196" stroke="#DBE4F2"/>
</svg>
::

Running pages in parallel on one browser helps too. With 10 pages at a time and the same `networkidle0` wait, 100 jobs took 13.9 seconds, about 7 PDFs a second against about 1 a second one at a time, and memory peaked around 678 MB. Each job got slower (median 1.16 seconds), but throughput went up a lot. To find your limit, keep raising the number of parallel pages until memory or per-job time gets worse than you'll accept, then scale out with more processes.

## Which waitUntil should I use with page.pdf()?

Use `load`, then wait for `document.fonts.ready`. `load` fires once the page's stylesheets, scripts and images have loaded, except lazy-loaded ones. The fonts wait covers web fonts the page asked for.

The two other common choices each cost you something:

- **`domcontentloaded`** doesn't wait for stylesheets to load. In 10 runs out of 10, our invoice came out without its web font, and the PDF was 82.6 KB instead of 121.5 KB. `page.pdf()` waits for fonts by default (its `waitForFonts` option), and that didn't change the result.
- **`networkidle0`** waits until the page has had [no network connections for 500 ms](https://pptr.dev/api/puppeteer.puppeteerlifecycleevent). The fonts arrive, but every job pays for that quiet period, about 0.8 seconds a job in our test. A page that keeps a connection open, an analytics socket for example, may never go quiet, and the job runs until it times out.

Puppeteer's TypeScript types don't allow `networkidle0` or `networkidle2` with `setContent()`, though plain JavaScript passed it through in our runs. For a URL, `page.goto(url, { waitUntil: 'load' })` followed by the same fonts wait works the same way.

Whichever you pick, keep the timeouts. Navigation and `setContent()` default to 30 seconds, and so does `page.pdf()`. Passing `0` turns a timeout off, which is how a single bad page holds a worker forever.

## Why are backgrounds, page sizes or headers wrong in the PDF?

Most of the time it's a default.

- **Missing colors or background images:** `printBackground` is off by default, so colored table headers and background images disappear. Turn it on. If colors still look washed out, that's `page.pdf()` adjusting them for print: add `-webkit-print-color-adjust: exact` to your CSS.
- **Screen styles that don't show:** `page.pdf()` renders with the print media type, so your `@media print` rules apply and `@media screen` ones don't.
- **The wrong page size:** Letter is the default, and `format` wins over `width` and `height`. If your CSS has an `@page { size: A4 }` rule you want to keep, set `preferCSSPageSize: true`. Otherwise Puppeteer scales your content to fit the paper size it was given.
- **Page numbers in headers and footers:** turn on `displayHeaderFooter` and put elements with the classes `pageNumber` and `totalPages` in `headerTemplate` or `footerTemplate`. The classes `date`, `title` and `url` work the same way.

## What breaks when Puppeteer runs in Docker or serverless?

Your laptop has everything Chrome needs. A slim container image doesn't. Here's the checklist:

- **Missing libraries.** Chrome won't start without them. Run `ldd chrome | grep not` on the browser binary to list the ones you're missing.
- **No usable sandbox.** Chrome crashes with `No usable sandbox!` when the container can't give it one. Puppeteer's docs say running without one [is "strongly discouraged"](https://pptr.dev/troubleshooting) and accept `--no-sandbox` only when you trust all the content you render. If users can send you HTML, set up the sandbox instead. On Ubuntu 23.10 and later, AppArmor blocks the sandbox for the Chrome that Puppeteer downloads, which gives the same error.
- **Zombie processes.** Start the container with `--init`, or a custom entrypoint, so finished Chrome processes get cleaned up instead of piling up. Puppeteer's own image is run that way.
- **Fonts.** Chinese, Japanese, Arabic, Hebrew or Thai text needs fonts a slim image doesn't have. Puppeteer's troubleshooting page installs `fonts-ipafont-gothic`, `fonts-wqy-zenhei`, `fonts-thai-tlwg`, `fonts-kacst` and `fonts-freefont-ttf` for those, plus the fonts your own templates use.
- **Alpine.** Chrome doesn't support Alpine out of the box. Use a Debian-based image.
- **The browser isn't in `node_modules`.** Puppeteer downloads Chrome into `~/.cache/puppeteer`, so a multi-stage build that copies only `node_modules` ships without a browser.
- **Serverless size limits.** An AWS Lambda deployment package is [capped at 250 MB unzipped](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html), layers included, and the Chrome folder Puppeteer downloaded on our machine was 376 MB. Plan on a container image instead.

Then pin your versions. Chrome moved to [a release every two weeks](https://developer.chrome.com/blog/chrome-two-week-release) with Chrome 153 in September 2026, and each Puppeteer release targets one Chrome version. Upgrade on purpose, and compare a few real PDFs before and after.

## When is running Chromium yourself not worth it?

When the PDF is a feature of your product and not the product itself. Add up what this page asked of you: close every page, reuse and restart browsers, tune how many pages run at once, keep the timeouts on, keep the sandbox working, install fonts, and retest your PDFs each time you move to a new Chrome. That's a service you maintain, for a feature your users see as one button.

People don't buy PDFs. They buy not having to run Chromium. That's the job we took on at PDFShift, and we've run Chromium conversions since 2018. You send one request with your HTML or a URL to a current Chromium we run and patch, and get the PDF back:

```javascript
const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.PDFSHIFT_API_KEY,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source: html }), // raw HTML or a URL
});

if (!response.ok) {
    throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
}

const pdf = Buffer.from(await response.arrayBuffer());
```

The request format is in the [conversion API reference](https://docs.pdfshift.io/api-reference/convert-to-pdf), and there are more examples for [Node with fetch](/guides/node/node-fetch/) and the other libraries in our [guides](/guides/). The free plan has 50 credits a month with no credit card, and the [paid plans](/pricing/) start at $9 a month. [Get a free API key](/register/) and send your own invoice through it.
