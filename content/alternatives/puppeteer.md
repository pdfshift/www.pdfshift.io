---
title: "Puppeteer alternatives for PDF generation in 2026"
description: "Puppeteer alternatives for PDFs, sorted by what you still run: a browser, a hosted browser, or nothing. Plus the page.pdf() options you use, mapped to one API call."
date: "2026-11-08"
dateModified: "2026-11-08"
author: "Cyril Nicodème"
---

People don't buy PDFs. They buy not having to run Chromium. So if Puppeteer only makes your PDFs, pick its replacement by how much of the browser you still want to run. Playwright and Gotenberg keep the browser on your servers, and Browserless runs it for you. A PDF API like PDFShift takes your HTML in one request and sends back the PDF, so there's no browser on your side at all.

<figure>
<svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="alt-kinds-title alt-kinds-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="alt-kinds-title">What stays on your side with each kind of Puppeteer alternative</title>
<desc id="alt-kinds-desc">Three boxes from top to bottom. A renderer you run (a browser or a layout engine): you keep engine updates, fonts, memory and restarts, and scaling. A browser someone else runs: you keep your browser code, waits and timeouts. No browser, a PDF API: you keep one HTTP request.</desc>
<rect style="stroke-width:2" x="1.5" y="1.5" width="357" height="120" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text x="20" y="32" style="font-size:16px;font-weight:600" fill="#0A0C3D">A renderer you run</text>
<text x="20" y="58" style="font-size:14px" fill="#4C556D">Engine updates and fonts</text>
<text x="20" y="80" style="font-size:14px" fill="#4C556D">Memory, crashes and restarts</text>
<text x="20" y="102" style="font-size:14px" fill="#4C556D">Scaling and queueing</text>
<rect style="stroke-width:2" x="1.5" y="135.5" width="357" height="98" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text x="20" y="166" style="font-size:16px;font-weight:600" fill="#0A0C3D">A browser someone else runs</text>
<text x="20" y="192" style="font-size:14px" fill="#4C556D">Your browser code</text>
<text x="20" y="214" style="font-size:14px" fill="#4C556D">Waits and timeouts</text>
<rect style="stroke-width:2" x="1.5" y="247.5" width="357" height="76" rx="8" fill="#F3EFFF" stroke="#6C47FF"/>
<text x="20" y="278" style="font-size:16px;font-weight:600" fill="#0A0C3D">No browser: a PDF API</text>
<text x="20" y="304" style="font-size:14px" fill="#4C556D">One HTTP request</text>
<text x="180" y="350" text-anchor="middle" style="font-size:13px" fill="#4C556D">What stays on your side</text>
</svg>
</figure>

## Best Puppeteer alternatives for PDF generation in 2026

| Option | What you still run | What it costs you |
|---|---|---|
| **PDFShift** | Nothing: one POST with your HTML or a URL, the PDF comes back | 50 free credits a month, no card; $9 a month for 500 |
| Api2Pdf | Nothing: you get back a link to the file, deleted after 24 hours | $1 a month plus usage |
| PDFBolt | Nothing | 50 free documents a month; $19 a month for 2,000 |
| Doppio | Nothing | 400 free docs a month; $16 a month for 4,000 |
| DocRaptor | Nothing (runs the Prince engine, not Chromium) | 5 free documents a month; $15 a month for 125 |
| Browserless | Your Puppeteer or Playwright code, connected to their browsers, or a call to their /pdf endpoint | 1,000 free units a month (a unit is up to 30 seconds of browser time) |
| Playwright | Chromium, on your servers | Free and open source, plus your servers |
| Gotenberg | A Docker container with Chromium and LibreOffice | Free and open source, plus your servers |
| WeasyPrint | A Python library with its own layout engine | Free and open source, plus your servers |
| wkhtmltopdf | An old Qt WebKit binary, archived since January 2023 | Free and open source, plus your servers |

## What running Puppeteer for PDFs costs you

Puppeteer costs nothing to install. The bill comes from the browser it drives, and it grows when PDFs pile up at once.

We tested Puppeteer 25.16.0 on one invoice, on an Apple M5 Pro. Launching a browser for each PDF took 1.47 seconds a job. Reusing one browser and waiting for `load` plus `document.fonts.ready` got it to 0.24 seconds, but now you have to manage that browser. Leave pages open after each job, and Chromium goes from 323 MB to 5,046 MB over 200 jobs. We walk through the fixes in [Puppeteer PDF in production](/guides/puppeteer-pdf-in-production/).

## Puppeteer vs Playwright vs Gotenberg vs WeasyPrint for PDFs

**Playwright** is the closest swap. It drives the same Chromium with the same `page.pdf()` call, and it's available for Node, Python, Java and .NET. It doesn't take the browser off your hands, though. In our test, 200 browser contexts left open grew the browser to 7,734 MB, the same memory leak under a new name. Our [Playwright PDF guide](/guides/playwright-pdf-in-production/) covers the timeouts and cleanup it needs on a server.

**Gotenberg** moves Chromium into a Docker container: you start it with `docker run --rm -p 3000:3000 gotenberg/gotenberg:9` and send files to it as multipart form data. Your app no longer has browser code in it, but the container is still a server you run, size and restart.

**WeasyPrint** isn't a browser. It's a Python library with its own CSS layout engine, so HTML built and tested in Chrome can lay out differently.

**wkhtmltopdf**: don't start a new project on it. Its repo is read-only, so nothing in it gets fixed.

## Switching from Puppeteer to a hosted HTML to PDF API

We've run Chromium for PDFShift customers since 2018. Here's the Puppeteer code you get to delete:

```javascript
const page = await browser.newPage();
try {
    await page.setContent(html, { waitUntil: 'load' });
    return await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' },
    });
} finally {
    await page.close();
}
```

And the same document from PDFShift's [conversion API](https://docs.pdfshift.io/api-reference/convert-to-pdf):

```javascript
const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.PDFSHIFT_API_KEY,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        source: html, // raw HTML or a URL
        format: 'A4',
        margin: '40px', // all four sides
        use_print: true, // print CSS, like page.pdf()
    }),
});

if (!response.ok) {
    throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
}

const pdf = Buffer.from(await response.arrayBuffer());
```

Three defaults differ, and each one changes the PDF if you don't set it:

<figure>
<svg viewBox="0 0 360 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="alt-defaults-title alt-defaults-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="alt-defaults-title">Three defaults that change the PDF when you switch</title>
<desc id="alt-defaults-desc">Puppeteer's default next to PDFShift's for three settings. Paper size: Letter in Puppeteer, A4 in PDFShift. Backgrounds: off in Puppeteer, on in PDFShift. Stylesheet: print in Puppeteer, screen in PDFShift.</desc>
<text x="132" y="20" text-anchor="middle" style="font-size:13px;font-weight:600" fill="#4C556D">Puppeteer</text>
<text x="272" y="20" text-anchor="middle" style="font-size:13px;font-weight:600" fill="#6C47FF">PDFShift</text>
<rect style="stroke-width:2" x="1.5" y="33.5" width="357" height="66" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text x="16" y="72" style="font-size:14px;font-weight:600" fill="#0A0C3D">Paper</text>
<text x="132" y="72" text-anchor="middle" style="font-size:14px" fill="#0A0C3D">Letter</text>
<text x="202" y="72" text-anchor="middle" style="font-size:14px" fill="#4C556D">→</text>
<text x="272" y="72" text-anchor="middle" style="font-size:14px;font-weight:600" fill="#6C47FF">A4</text>
<rect style="stroke-width:2" x="1.5" y="111.5" width="357" height="66" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text x="16" y="150" style="font-size:14px;font-weight:600" fill="#0A0C3D">Backgrounds</text>
<text x="132" y="150" text-anchor="middle" style="font-size:14px" fill="#0A0C3D">Off</text>
<text x="202" y="150" text-anchor="middle" style="font-size:14px" fill="#4C556D">→</text>
<text x="272" y="150" text-anchor="middle" style="font-size:14px;font-weight:600" fill="#6C47FF">On</text>
<rect style="stroke-width:2" x="1.5" y="189.5" width="357" height="66" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text x="16" y="228" style="font-size:14px;font-weight:600" fill="#0A0C3D">Stylesheet</text>
<text x="132" y="228" text-anchor="middle" style="font-size:14px" fill="#0A0C3D">Print</text>
<text x="202" y="228" text-anchor="middle" style="font-size:14px" fill="#4C556D">→</text>
<text x="272" y="228" text-anchor="middle" style="font-size:14px;font-weight:600" fill="#6C47FF">Screen</text>
</svg>
</figure>

- **Paper size.** Send `format: 'Letter'` to keep US paper.
- **Backgrounds.** They're on already. Send `disable_backgrounds: true` if you printed without `printBackground`.
- **Stylesheet.** Send `use_print: true` to render with your print CSS, the way `page.pdf()` does.

To see your HTML at A4 width with its print CSS before you send it, paste it into our [free HTML viewer](/tools/html-viewer/).

The rest of the options map one to one:

| Puppeteer | PDFShift |
|---|---|
| `page.setContent(html)` or `page.goto(url)` | `source` takes either |
| `landscape: true` | `landscape: true` |
| `margin: { top, right, bottom, left }` | `margin` as an object, or a CSS-style string such as `'40px 20px'` |
| `pageRanges: '1-5'` | `pages: '1-5'` |
| `scale` (0.1 to 2) | `zoom` (0.1 to 2) |
| `headerTemplate` and `footerTemplate` with `pageNumber` and `totalPages` | `header` and `footer`, each with its own `source`, and `{{ page }}`, `{{ total }}` and `{{ date }}` |
| `page.goto(url, { waitUntil: 'networkidle0' })` | `wait_for_network`, on by default: waits until no request has run for 500 ms |
| `page.waitForFunction(...)` | `wait_for`: the name of a global function that returns true when the page is ready |
| `page.addStyleTag()`, `page.evaluate()` | `css` and `javascript` |
| `timeout` in milliseconds | `timeout` in seconds |

PDFShift headers and footers don't inherit your page's CSS, so style them inline. While you compare output, send `sandbox: true`. Those documents are free and watermarked, up to 10 a minute.

That's the whole migration. [Get a free API key](/register/) and send it the HTML you print with Puppeteer today.
