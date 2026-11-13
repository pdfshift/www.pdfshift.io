---
title: "HTML to PDF in Node.js: replace html-pdf-node"
description: "html-pdf-node is Google's top result for HTML to PDF in Node, and it failed on our invoice. Here's what it does to your HTML, and the code to use instead."
date: "2026-11-13"
dateModified: "2026-11-13"
author: "Cyril Nicodème"
---

The `generatePdf({ content: html }, options)` call on html-pdf-node's npm page looks like it hands your HTML straight to Chrome. It doesn't. Your HTML first goes through a CSS inliner and a strict Handlebars template, and every call starts a new browser. Our test invoice didn't survive the first step. Keep your route and your options, and swap the package: Puppeteer with one browser you keep open, or one `fetch` to PDFShift.

## What does html-pdf-node do to your HTML?

The whole package is one 94-line file, short enough to read in a few minutes.

::guide-figure{caption="The steps inside html-pdf-node's generatePdf, and what each one did to our test invoice. Our test, November 13, 2026."}
<svg viewBox="0 0 360 436" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2n-pipe-title h2n-pipe-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2n-pipe-title">What html-pdf-node does between your HTML and the PDF</title>
<desc id="h2n-pipe-desc">Your HTML goes through three steps before it becomes a PDF. Step 1, inline-css: it removed the style tag and threw an error on the page-number rule. Step 2, Handlebars in strict mode: any double curly braces in the HTML throw an error. Step 3, a new Chrome for every call: about 2.2 seconds per PDF including the launch, and the browser stays open when a step before it fails.</desc>
<defs><marker id="h2n-pipe-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4C556D"/></marker></defs>
<g style="font-size:13px" fill="#0A0C3D" text-anchor="middle">
<text x="180" y="20" style="font-weight:600">Your HTML</text>
<text x="180" y="428" style="font-weight:600">PDF</text>
</g>
<g stroke="#4C556D" stroke-width="1.5" marker-end="url(#h2n-pipe-arrow)">
<line x1="180" y1="28" x2="180" y2="50"/>
<line x1="180" y1="148" x2="180" y2="170"/>
<line x1="180" y1="268" x2="180" y2="290"/>
<line x1="180" y1="388" x2="180" y2="410"/>
</g>
<g fill="#FFFFFF" stroke="#DBE4F2" stroke-width="1.5">
<rect x="20" y="56" width="320" height="88" rx="12"/>
<rect x="20" y="176" width="320" height="88" rx="12"/>
<rect x="20" y="296" width="320" height="88" rx="12"/>
</g>
<g style="font-size:14px;font-weight:600" fill="#0A0C3D" text-anchor="middle">
<text x="180" y="82">1. inline-css</text>
<text x="180" y="202">2. Handlebars, strict mode</text>
<text x="180" y="322">3. A new Chrome for every call</text>
</g>
<g style="font-size:13px" fill="#4C556D" text-anchor="middle">
<text x="180" y="106">Removed the &lt;style&gt; tag</text>
<text x="180" y="126">Threw on the page-number rule</text>
<text x="180" y="226">Any {{ }} in your HTML throws</text>
<text x="180" y="246">Your markup is read as a template</text>
<text x="180" y="346">About 2.2 s a PDF, launch included</text>
<text x="180" y="366">Left open when a step fails</text>
</g>
</svg>
::

**1. inline-css.** It copies your CSS into `style` attributes and then removes the `<style>` tag, which is what its `removeStyleTags` option does by default. Rules that can't be inlined go with it, `@page` size and margins included. Our invoice also had a page-number footer in an `@page` margin box (`@bottom-right { content: "Page " counter(page) " of " counter(pages) }`). inline-css couldn't parse it and threw `Error: Unexpected } (line 2, char 128)`, so there was no PDF at all.

**2. Handlebars in strict mode.** html-pdf-node compiles your HTML as a Handlebars template, with your HTML passed in as the data. Any double braces in it make the call fail. `<p>Hello {{name}}</p>` threw `Cannot use 'in' operator to search for 'name' in <p>Hello {{name}}</p>`. Double braces turn up in code samples and in Vue or Angular markup.

**3. A new browser per call.** `generatePdf` launches Chrome with `--no-sandbox` before steps 1 and 2, prints one PDF and closes the browser, but only when everything worked. When a step throws, Chrome stays open. Three failed requests to our Express handler left three Chrome processes running.

Its last release, 1.0.8, came out on December 14, 2021, and it still gets [about 50,000 downloads a week](https://www.npmjs.com/package/html-pdf-node). It pins Puppeteer `^10.4.0` from September 2021, which installs Chromium 93. Installing it today prints npm's own warning, `puppeteer@10.4.0: < 24.15.0 is no longer supported`, and `npm audit` reports 14 high-severity vulnerabilities. On an Apple Silicon Mac without Rosetta, the Chromium it downloads is an x86_64 build that won't start (`spawn Unknown system error -86`), so we pointed it at a current Chrome 157. The three failures described above come from html-pdf-node's own code, not from the old browser.

The older `html-pdf` package (PhantomJS) isn't a fix either. It's deprecated on npm, and [its notice](https://www.npmjs.com/package/html-pdf) reads "Please migrate your projects to a newer library like puppeteer".

## How do you replace html-pdf-node with Puppeteer?

Say your app has this Express route. It takes HTML in a POST and returns a PDF:

```js
// Before: html-pdf-node
const express = require('express');
const html_to_pdf = require('html-pdf-node');

const app = express();
app.use(express.text({ type: 'text/html', limit: '5mb' }));

app.post('/invoice.pdf', async (req, res) => {
  const pdf = await html_to_pdf.generatePdf(
    { content: req.body },
    { format: 'A4', printBackground: true }
  );
  res.type('application/pdf').send(pdf);
});

app.listen(3001);
```

And here's the same route with Puppeteer. The browser starts once, when the server starts, and each request gets its own page:

```js
// After: Puppeteer, one browser for the whole process
import express from 'express';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const app = express();
app.use(express.text({ type: 'text/html', limit: '5mb' }));

app.post('/invoice.pdf', async (req, res) => {
  const page = await browser.newPage();
  try {
    await page.setContent(req.body, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    res.type('application/pdf').send(Buffer.from(pdf));
  } finally {
    await page.close();
  }
});

app.listen(3002);
```

The options carry over, because html-pdf-node passes them straight to Puppeteer's `page.pdf()`. Keep `printBackground: true` (the default is `false`) and set `format`, because Puppeteer defaults to Letter. Add `preferCSSPageSize: true` so an `@page` size in your CSS wins over `format`.

We posted the same invoice to both handlers. html-pdf-node answered 500. Puppeteer answered 200 with a 2-page A4 PDF: "Page 1 of 2" and "Page 2 of 2" in the footer, the table's header row repeated at the top of page 2, and the invoice's one line of JavaScript had run. To get any PDF out of html-pdf-node, we had to delete the page-number rule. Here's what both handlers printed from that cut-down invoice:

::guide-figure{caption="Page 1 of the same invoice, without its page-number rule, from each Express handler. Our test, November 13, 2026."}
<svg viewBox="0 0 360 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2n-pages-title h2n-pages-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2n-pages-title">html-pdf-node printed to the edge of the page; Puppeteer kept the 15 mm margins</title>
<desc id="h2n-pages-desc">Two A4 pages side by side. Left, html-pdf-node: the invoice header, addresses and table run to the edges of the sheet, because the @page margins were removed with the style tag. Right, Puppeteer: the same content sits inside 15 millimetre margins on every side.</desc>
<g fill="#FFFFFF" stroke="#4C556D" stroke-width="1">
<rect x="20" y="8" width="150" height="212"/>
<rect x="190" y="8" width="150" height="212"/>
</g>
<g fill="#0A0C3D">
<rect x="20" y="8" width="56" height="9"/>
<rect x="130" y="8" width="40" height="5"/>
<rect x="20" y="30" width="34" height="4"/>
<rect x="95" y="30" width="34" height="4"/>
<rect x="20" y="48" width="150" height="7"/>
<rect x="198" y="16" width="44" height="7"/>
<rect x="300" y="16" width="32" height="4"/>
<rect x="198" y="34" width="28" height="3"/>
<rect x="266" y="34" width="28" height="3"/>
<rect x="198" y="50" width="134" height="6"/>
</g>
<g stroke="#DBE4F2" stroke-width="2">
<line x1="20" y1="62" x2="170" y2="62"/><line x1="20" y1="70" x2="170" y2="70"/><line x1="20" y1="78" x2="170" y2="78"/><line x1="20" y1="86" x2="170" y2="86"/><line x1="20" y1="94" x2="170" y2="94"/><line x1="20" y1="102" x2="170" y2="102"/><line x1="20" y1="110" x2="170" y2="110"/><line x1="20" y1="118" x2="170" y2="118"/><line x1="20" y1="126" x2="170" y2="126"/><line x1="20" y1="134" x2="170" y2="134"/><line x1="20" y1="142" x2="170" y2="142"/><line x1="20" y1="150" x2="170" y2="150"/><line x1="20" y1="158" x2="170" y2="158"/><line x1="20" y1="166" x2="170" y2="166"/><line x1="20" y1="174" x2="170" y2="174"/><line x1="20" y1="182" x2="170" y2="182"/><line x1="20" y1="190" x2="170" y2="190"/><line x1="20" y1="198" x2="170" y2="198"/><line x1="20" y1="206" x2="170" y2="206"/><line x1="20" y1="214" x2="170" y2="214"/>
<line x1="198" y1="64" x2="332" y2="64"/><line x1="198" y1="72" x2="332" y2="72"/><line x1="198" y1="80" x2="332" y2="80"/><line x1="198" y1="88" x2="332" y2="88"/><line x1="198" y1="96" x2="332" y2="96"/><line x1="198" y1="104" x2="332" y2="104"/><line x1="198" y1="112" x2="332" y2="112"/><line x1="198" y1="120" x2="332" y2="120"/><line x1="198" y1="128" x2="332" y2="128"/><line x1="198" y1="136" x2="332" y2="136"/><line x1="198" y1="144" x2="332" y2="144"/><line x1="198" y1="152" x2="332" y2="152"/><line x1="198" y1="160" x2="332" y2="160"/><line x1="198" y1="168" x2="332" y2="168"/><line x1="198" y1="176" x2="332" y2="176"/><line x1="198" y1="184" x2="332" y2="184"/><line x1="198" y1="192" x2="332" y2="192"/><line x1="198" y1="200" x2="332" y2="200"/><line x1="198" y1="208" x2="332" y2="208"/>
</g>
<g stroke="#FF9D28" stroke-width="1.5" fill="none" stroke-dasharray="3 3">
<rect x="198" y="16" width="134" height="196"/>
</g>
<g style="font-size:13px" text-anchor="middle">
<text x="95" y="240" fill="#0A0C3D" style="font-weight:600">html-pdf-node</text>
<text x="95" y="256" fill="#4C556D">no margins</text>
<text x="265" y="240" fill="#0A0C3D" style="font-weight:600">Puppeteer</text>
<text x="265" y="256" fill="#4C556D">15 mm margins kept</text>
</g>
</svg>
::

html-pdf-node took 2.2 s per request on that cut-down invoice, browser launch included. The Puppeteer handler printed the same cut-down invoice in 1.1 s with its browser already open. Single requests on one Mac: rough numbers, not a benchmark.

Prefer Playwright? It's the same route with `chromium.launch()` and `page.pdf()`. It printed the same 2 pages in our script. For memory limits, crashed browsers and timeouts under load, see our guides to [Puppeteer PDF in production](/guides/puppeteer-pdf-in-production/) and [Playwright PDF in production](/guides/playwright-pdf-in-production/).

## What does Puppeteer install, and why pin it?

`npm i puppeteer` also downloads its own browsers: Chrome for Testing and chrome-headless-shell. For Puppeteer 25.17.0 that was Chrome for Testing 157 (390 MB on our Mac) and chrome-headless-shell (210 MB), and they go in every image you ship. npm 11 now prints a warning that Puppeteer's install script isn't in your `allowScripts` list. It still ran and downloaded Chrome for us, but with `strict-allow-scripts` turned on, npm fails the install instead.

Each Puppeteer release downloads one specific Chrome version, so a version bump in your lockfile is also a browser upgrade. Lock the `puppeteer` version and update it on purpose. One developer [on r/node](https://www.reddit.com/r/node/comments/10avyxb/is_node_the_right_choice_for_html_to_pdf/) got hit by exactly this: "we didn't lock down our chrome version and after a chrome release everything we printed in the factory was shrunk in scale by like 20%."

## Can the same handler call an API instead of running Chrome?

Yes. Keep the route and replace the browser with one request to PDFShift. `fetch` has been built into Node since version 18, so there's nothing to install:

```js
import express from 'express';

const app = express();
app.use(express.text({ type: 'text/html', limit: '5mb' }));

app.post('/invoice.pdf', async (req, res) => {
  const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.PDFSHIFT_API_KEY,
    },
    body: JSON.stringify({ source: req.body, format: 'A4', use_print: true }),
  });
  if (!response.ok) {
    return res.status(response.status).send(await response.text());
  }
  res.type('application/pdf').send(Buffer.from(await response.arrayBuffer()));
});

app.listen(3003);
```

`use_print: true` renders your HTML with its print CSS, the same media Puppeteer's `page.pdf()` uses. We posted the full invoice, page-number rule included, and got back the same 2 pages Puppeteer printed. Each request took 1.5 to 1.9 s, network included. That's the whole setup: no Chrome in your install or your image, no browser to keep alive, and a failed request leaves nothing running.

Requests without a key work too, watermarked and up to 10 a day. [Create a free account](/register/) to get 50 credits a month, no card needed. Every parameter is in the [API docs](https://docs.pdfshift.io/), and our [Node guides](/guides/node/) show the same call with axios, got and node-fetch.

## What about jsPDF, PDFKit, pdfmake and html2pdf.js?

None of them print the HTML and CSS you render on your server the way a browser does. PDFKit and pdfmake build a PDF from code: you place the text, tables and lines yourself. jsPDF's `.html()` depends on html2canvas, and html2pdf.js calls itself "Client-side HTML-to-PDF rendering". They fit a receipt you lay out in code, or a download button in the browser. For an invoice you already have as HTML, use one of the handlers above. If your app is in React, [our React to PDF guide](/guides/react-to-pdf/) compares those routes.
