---
title: "Playwright PDF generation: fix page.pdf() on a server"
description: "Playwright page.pdf() on a server: why jobs hang, a deadline pattern for Node and Python, the sandbox default, and our memory test over 200 PDFs."
date: "2026-11-06"
dateModified: "2026-11-06"
author: "Cyril Nicodème"
faq:
  - question: "How do I generate a PDF with Playwright in C#?"
    answer: "Call PdfAsync on the page: await page.PdfAsync(new() { Path = \"invoice.pdf\" });. The options are the same as in Node, in PascalCase, such as Format and PrintBackground. Wrap it in the same pattern: a context per document and your own deadline around the job."
  - question: "Can Playwright make a PDF from a URL instead of HTML?"
    answer: "Yes. Call page.goto(url, { waitUntil: 'load' }) instead of setContent, then page.pdf(). Keep the deadline around the whole job, because a slow or unreachable site can stall it."
  - question: "Is Playwright free for PDF generation?"
    answer: "Yes. Playwright is open source under the Apache 2.0 license. What you pay for is the server that runs Chromium, and the time you spend keeping it running."
---

When a Playwright PDF job breaks on a server, it breaks one of two ways. Loading the HTML throws `Timeout 30000ms exceeded`, or the job never returns. The second is harder to stop, because `page.pdf()` [takes no timeout option](https://playwright.dev/docs/api/class-page).

Playwright's defaults are built for tests against your own pages, not for rendering other people's HTML on a server. That takes three things Playwright leaves to you: a new browser context for each PDF, closed in `finally`; a deadline around the whole job; and Chromium's sandbox, turned on when the HTML comes from your users.

## How do I fix Playwright page.pdf() timeouts on a server?

Give the whole job a deadline, and close the context when it runs out. This is the pattern for Playwright 1.65.0, released November 5, 2026:

```javascript
import { chromium } from 'playwright';

// One browser per process, launched once and reused for every job.
const browser = await chromium.launch();

export async function htmlToPdf(html, deadlineMs = 30_000) {
    // A new context per document: its own cookies, storage and renderer.
    const context = await browser.newContext();
    let timer;
    const job = (async () => {
        const page = await context.newPage();
        await page.setContent(html, { waitUntil: 'load', timeout: deadlineMs });
        await page.evaluate(() => document.fonts.ready); // web fonts too
        return page.pdf({ format: 'A4', printBackground: true });
    })();
    job.catch(() => {}); // if the deadline wins, the job's own error is expected
    const deadline = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`PDF job over ${deadlineMs} ms`)), deadlineMs);
    });
    try {
        // page.pdf() has no timeout option, so the whole job gets one.
        return await Promise.race([job, deadline]);
    } finally {
        clearTimeout(timer);
        await context.close(); // also ends a page stuck in page.pdf()
    }
}
```

Each step has a different default limit, and the one around the PDF itself is missing:

::guide-figure{caption="Default time limits for each step of a Playwright PDF job. Playwright 1.65.0 docs, and our test of setContent(), November 6, 2026."}
<svg viewBox="0 0 360 292" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pw-steps-title pw-steps-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pw-steps-title">page.pdf() is the one step with no time limit</title>
<desc id="pw-steps-desc">Three steps from top to bottom. chromium.launch(): defaults to 3 minutes. page.setContent() or page.goto(): threw after 30 seconds in our test. page.pdf(): no timeout option.</desc>
<rect style="stroke-width:2" x="1.5" y="1.5" width="357" height="73" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px" x="18" y="29" fill="#4C556D">chromium.launch()</text>
<text style="font-size:20px;font-weight:600" x="18" y="58" fill="#6C47FF">3 minutes</text>
<text style="font-size:13px" x="342" y="58" fill="#4C556D" text-anchor="end">launch default</text>
<path style="stroke-width:2" d="M180 80 v24 m-6 -6 l6 6 l6 -6" stroke="#4C556D" fill="none"/>
<rect style="stroke-width:2" x="1.5" y="109.5" width="357" height="73" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px" x="18" y="137" fill="#4C556D">setContent() / goto()</text>
<text style="font-size:20px;font-weight:600" x="18" y="166" fill="#6C47FF">30 seconds</text>
<text style="font-size:13px" x="342" y="166" fill="#4C556D" text-anchor="end">then throws</text>
<path style="stroke-width:2" d="M180 188 v24 m-6 -6 l6 6 l6 -6" stroke="#4C556D" fill="none"/>
<rect style="stroke-width:3" x="1.5" y="217.5" width="357" height="73" rx="8" fill="#FFFFFF" stroke="#FF9D28"/>
<text style="font-size:13px" x="18" y="245" fill="#4C556D">page.pdf()</text>
<text style="font-size:20px;font-weight:600" x="18" y="274" fill="#FF9D28">No limit</text>
<text style="font-size:13px" x="342" y="274" fill="#4C556D" text-anchor="end">no timeout option</text>
</svg>
::

We hit that 30-second limit in Node with no timeout set, on a page with an image that never answered. Playwright's Node docs call the default 0, for no timeout, and its Python docs say 30 seconds. Don't rely on either: set it yourself. Pick a deadline a little above your slowest real document, and log every job that hits it. Those are the templates worth fixing first.

Skip `networkidle`. Playwright's docs mark it "DISCOURAGED": it waits until the page has had no network connections for 500 ms. With a web font that took 300 ms to arrive, a PDF of a 30-row invoice took a median 815 ms with `networkidle` against 313 ms with `load`, for the same file (10 runs each). A page that holds a connection open, like an analytics socket, never goes quiet at all.

### Why does memory keep growing when jobs fail?

A job that throws or hangs before it closes its context leaves that context's renderer running. We converted the same invoice 200 times on one browser, once leaving every context open and once closing each one:

::guide-figure{caption="Chromium memory over 200 PDF jobs on one browser, contexts left open vs closed. Our test, Playwright 1.65.0, November 6, 2026."}
<svg viewBox="-34 0 594 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pw-mem-title pw-mem-desc" style="max-width:594px;min-width:460px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pw-mem-title">Each context left open added about 38 MB</title>
<desc id="pw-mem-desc">Line chart of the browser's memory in MB every 25 jobs. Contexts left open: 28, 1,143, 2,226, 3,332, 4,314, 5,145, 6,020, 6,875 and 7,734 MB at 200 jobs, with 203 processes. Contexts closed: 28 MB at the start and 36 MB at 200 jobs, with 3 processes.</desc>
<g style="font-size:13px" fill="#4C556D">
<line x1="70" y1="250" x2="530" y2="250" stroke="#DBE4F2"/>
<line x1="70" y1="195" x2="530" y2="195" stroke="#DBE4F2"/>
<line x1="70" y1="140" x2="530" y2="140" stroke="#DBE4F2"/>
<line x1="70" y1="85" x2="530" y2="85" stroke="#DBE4F2"/>
<line x1="70" y1="30" x2="530" y2="30" stroke="#DBE4F2"/>
<text x="62" y="254" text-anchor="end">0</text>
<text x="62" y="199" text-anchor="end">2,000</text>
<text x="62" y="144" text-anchor="end">4,000</text>
<text x="62" y="89" text-anchor="end">6,000</text>
<text x="62" y="34" text-anchor="end">8,000 MB</text>
<text x="80" y="272" text-anchor="middle">0</text>
<text x="190" y="272" text-anchor="middle">50</text>
<text x="300" y="272" text-anchor="middle">100</text>
<text x="410" y="272" text-anchor="middle">150</text>
<text x="520" y="272" text-anchor="middle">200</text>
<text x="300" y="294" text-anchor="middle">PDF jobs on one browser</text>
</g>
<polyline style="stroke-width:3" points="80,249 135,219 190,189 245,158 300,131 355,109 410,84 465,61 520,37" fill="none" stroke="#FF9D28"/>
<polyline style="stroke-width:3" points="80,249 135,249 190,249 245,249 300,249 355,249 410,249 465,249 520,249" fill="none" stroke="#6C47FF"/>
<g fill="#FF9D28"><circle cx="300" cy="131" r="4"/><circle cx="520" cy="37" r="4"/></g>
<g fill="#6C47FF"><circle cx="520" cy="249" r="4"/></g>
<g style="font-size:13px;font-weight:500">
<rect x="84" y="46" width="12" height="4" fill="#FF9D28"/>
<text x="102" y="52" fill="#0A0C3D">Contexts left open: 7,734 MB, 203 processes</text>
<rect x="84" y="68" width="12" height="4" fill="#6C47FF"/>
<text x="102" y="74" fill="#0A0C3D">Contexts closed: 36 MB, 3 processes</text>
</g>
</svg>
::

With every context left open, the browser went from 28 MB to 7,734 MB and 203 processes after 200 jobs, about 38 MB a job. Closing each context held it at 36 MB and 3 processes. That's why `context.close()` sits in `finally` above, where it runs on success, on error and when the deadline fires.

We ran this on an Apple M5 Pro with 64 GB of RAM, on macOS, with Node 26, Playwright 1.65.0 and its default Chromium, the headless shell 158. Memory is macOS's physical footprint, summed over the browser's process tree, and the invoice's font came from a local server.

### What if Chromium itself crashes?

Closing contexts handles a bad document. If the browser itself crashes, every job after it fails. Playwright fires `disconnected` on the browser when it closes or crashes, so listen for it and launch a new one:

```javascript
let browser = await chromium.launch();

function watch(b) {
    b.on('disconnected', async () => {
        browser = await chromium.launch(); // jobs that start after this get a fresh browser
        watch(browser);
    });
}
watch(browser);
```

`browser.close()` fires the same event, so remove the listener or set a flag before you shut down on purpose.

### How many PDFs can one browser make at once?

More than you'd guess, as long as each job gets its own context. With ten contexts at a time on one browser, our test made 100 PDFs in 2.65 seconds, about 38 a second. Each job took longer, a median of 260 ms against 82 ms when it ran alone, but the browser finished three times as many in the same time. Keep adding parallel contexts until memory or time per job gets too high, then add more processes.

### The same pattern in Python

Use the async API. Playwright's docs say to use it if your project uses asyncio, and the API isn't thread-safe: in a threaded worker, create one Playwright instance per thread.

```python
import asyncio
from playwright.async_api import async_playwright

async def html_to_pdf(browser, html, deadline_s=30):
    context = await browser.new_context()
    try:
        async def job():
            page = await context.new_page()
            await page.set_content(html, wait_until="load", timeout=deadline_s * 1000)
            await page.evaluate("document.fonts.ready.then(() => true)")
            return await page.pdf(format="A4", print_background=True)
        # page.pdf() has no timeout, so the whole job gets one.
        return await asyncio.wait_for(job(), timeout=deadline_s)
    finally:
        await context.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        pdf = await html_to_pdf(browser, "<h1>Invoice #1</h1>")
        await browser.close()

asyncio.run(main())
```

## Which Chromium does Playwright's page.pdf() run, and is it sandboxed?

By default, a separate build called the Chromium headless shell, and no, it isn't sandboxed.

- **The headless shell.** Playwright ships a full Chromium for headed runs and the headless shell for headless ones, and `page.pdf()` runs in the headless shell unless you set a `channel`. On a server that only renders PDFs, `npx playwright install --with-deps --only-shell` skips downloading the full Chromium. On our Mac, the shell took 205 MB and the full Chromium 376 MB.
- **No sandbox by default.** `chromiumSandbox` [defaults to `false`](https://playwright.dev/docs/api/class-browsertype). Playwright's Docker image also runs as root, which turns the sandbox off as well. If the HTML you render comes from users, run the container as the image's `pwuser` with Playwright's seccomp profile, and launch with `chromiumSandbox: true`.
- **Pin the image to your version.** If the Docker image's Playwright version doesn't match the one in your project, Playwright can't find the browser. Use `mcr.microsoft.com/playwright:v1.65.0-noble` with Playwright 1.65.0, and upgrade both together. Skip Alpine: Playwright doesn't support musl-based distributions.
- **Two flags on `docker run`.** Playwright's docs recommend `--init`, so finished processes don't pile up as zombies, and `--ipc=host`, without which Chromium can run out of memory and crash.
- **On AWS Lambda, use a container image.** A zip package is capped at [250 MB unzipped, layers included](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html). An image can be 10 GB.

The print defaults match Puppeteer's: Letter paper, no background colors and the print media type. Our [Puppeteer guide](/guides/puppeteer-pdf-in-production/) walks through them. Two options are off by default: `tagged: true` builds an accessible PDF, and `outline: true` embeds the document's outline.

## Playwright vs Puppeteer for PDF generation

Both drive Chromium and call its print engine, so the same HTML gives you the same kind of PDF. On a server, the differences are in the code around the call.

- **Timeouts.** [Puppeteer's `page.pdf()`](https://pptr.dev/api/puppeteer.pdfoptions) takes a `timeout` and defaults to 30 seconds. Playwright's takes none.
- **Languages.** Playwright has official Python, .NET and Java versions with the same API. Puppeteer is JavaScript.

Whichever you use, what you create for each PDF matters more than the library. In our Playwright test, with the font served instantly, a new browser per PDF took a median 264 ms, a new context on a running browser 82 ms, and a single reused page 10 ms (30 to 100 runs each). The reused page is fastest, but it carries cookies, storage and whatever the last document left behind into the next one. A context is the isolated unit, and at 82 ms it's cheap.

## Is there a hosted alternative to Playwright for PDFs?

Yes. With Playwright, the deadline, the cleanup, the crash handler, the sandbox and the pinned image are all yours to run, for every document your users send.

People don't buy PDFs. They buy not having to run Chromium. That's the job we took on at PDFShift, and we've run Chromium conversions since 2018. You send your HTML or a URL in one request and get the PDF back:

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

The request format is in the [conversion API reference](https://docs.pdfshift.io/api-reference/convert-to-pdf), and our [Python guides](/guides/python/) cover the same call from Python. The free plan has 50 credits a month with no credit card, and the [paid plans](/pricing/) start at $9 a month. [Get a free API key](/register/) and send your own template through it.

## Frequently asked questions

### How do I generate a PDF with Playwright in C#?

Call `PdfAsync` on the page: `await page.PdfAsync(new() { Path = "invoice.pdf" });`. The options are the same as in Node, in PascalCase, such as `Format` and `PrintBackground`. Wrap it in the same pattern: a context per document and your own deadline around the job.

### Can Playwright make a PDF from a URL instead of HTML?

Yes. Call `page.goto(url, { waitUntil: 'load' })` instead of `setContent`, then `page.pdf()`. Keep the deadline around the whole job, because a slow or unreachable site can stall it.

### Is Playwright free for PDF generation?

Yes. Playwright is open source under the Apache 2.0 license. What you pay for is the server that runs Chromium, and the time you spend keeping it running.
