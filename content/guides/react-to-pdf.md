---
title: "React to PDF: 4 ways, one invoice, measured"
description: "React to PDF four ways, one 45-row invoice: react-to-pdf, @react-pdf/renderer, Puppeteer and an API. File sizes, selectable text and page breaks."
date: "2026-11-10"
dateModified: "2026-11-10"
author: "Cyril Nicodème"
faq:
  - question: "Is react-pdf the same package as @react-pdf/renderer?"
    answer: "No. @react-pdf/renderer creates PDFs from its own components (Document, Page, View, Text). The package named react-pdf displays existing PDFs inside a React app. Install the first to generate a PDF, the second to show one."
  - question: "What about react-to-print?"
    answer: "react-to-print prints a React component in the browser. It opens the print dialog, so a person picks Save as PDF themselves. That's fine for a print button, but your code never gets the PDF file, so you can't email it or store it."
  - question: "Can I generate a PDF in the browser without taking a screenshot?"
    answer: "Yes, with @react-pdf/renderer, which runs in the browser as well as in Node. Its PDFDownloadLink and BlobProvider components build a real PDF with selectable text on the user's device."
---

Render the React component you already have in a real browser, on the server. In our test of one 45-row invoice, that gave a 64 KB to 103 KB PDF with every word selectable, the CSS grid intact and no row cut in half. The browser-screenshot route gave a 1.74 MB PDF with 2 characters of text, and the PDF-renderer route needed a second copy of the component and split a row until we told it not to. So the choice is: run that browser yourself with Puppeteer, or send us the HTML and we run it.

## Which React to PDF method gives the best file?

We built one invoice the way a web developer would: a flex header, a CSS grid for the bill-to and ship-to blocks, a `<table>` of 45 line items that runs onto a second A4 page, and a totals block. Then we turned it into a PDF four ways and measured each file:

| Method | File size | Selectable text | Row cut at page break |
|---|---|---|---|
| **PDFShift API**, same HTML | **64 KB** | **Yes, 3,455 characters** | **No** |
| `renderToStaticMarkup` + Puppeteer | 103 KB | Yes, 3,451 characters | No |
| @react-pdf/renderer | 7.5 KB | Yes, 3,350 characters | Yes, row 24, until we added `wrap={false}` |
| react-to-pdf (html2canvas + jsPDF) | 1,744 KB | No, 2 characters | Cuts at a fixed height |

::guide-figure{caption="PDF file size for the same 45-row React invoice, four methods. Our test, November 10, 2026."}
<svg viewBox="0 0 360 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="r2p-size-title r2p-size-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="r2p-size-title">react-to-pdf's file is 17 to 232 times bigger than the others</title>
<desc id="r2p-size-desc">Horizontal bar chart of file size in KB. PDFShift API 64 KB. renderToStaticMarkup plus Puppeteer 103 KB. @react-pdf/renderer 7.5 KB. react-to-pdf 1,744 KB, with no selectable text.</desc>
<g stroke="#DBE4F2">
<line x1="10" y1="4" x2="10" y2="232"/>
<line x1="170" y1="4" x2="170" y2="232"/>
<line x1="330" y1="4" x2="330" y2="232"/>
</g>
<g style="font-size:13px" fill="#4C556D">
<text x="10" y="254" text-anchor="start">0</text>
<text x="170" y="254" text-anchor="middle">1,000</text>
<text x="350" y="254" text-anchor="end">2,000 KB</text>
<text x="18" y="18" fill="#0A0C3D" style="font-weight:600">PDFShift API</text>
<text x="18" y="76">renderToStaticMarkup + Puppeteer</text>
<text x="18" y="134">@react-pdf/renderer</text>
<text x="18" y="192">react-to-pdf</text>
</g>
<rect x="10" y="26" width="10" height="22" rx="3" fill="#6C47FF"/>
<rect x="10" y="84" width="17" height="22" rx="3" fill="#4C556D"/>
<rect x="10" y="142" width="2" height="22" rx="1" fill="#4C556D"/>
<rect x="10" y="200" width="279" height="22" rx="3" fill="#FF9D28"/>
<g style="font-size:13px" fill="#0A0C3D">
<text x="28" y="42" style="font-weight:600">64 KB</text>
<text x="35" y="100">103 KB</text>
<text x="20" y="158">7.5 KB</text>
<text x="281" y="216" text-anchor="end">1,744 KB, no text</text>
</g>
</svg>
::

The difference is where the PDF gets made: in a screenshot in the user's browser, in a second component tree in a PDF library, or from your own HTML in Chromium. Only Chromium did both: it took our component as it was and gave back real text.

## Why is the react-to-pdf file so big, and why can't I copy its text?

Because it's a picture. react-to-pdf draws your component onto a canvas with html2canvas, saves it as JPEG, and puts the image on PDF pages with jsPDF. [Its README](https://www.npmjs.com/package/react-to-pdf) says so: "Not vectorized - the pdf is created from a screenshot of the component." Our invoice came out at 1,744 KB, and a text extractor found 2 characters in it. Nobody can search it, copy an amount from it, or read it with a screen reader.

```jsx
import { usePDF } from 'react-to-pdf';

export function DownloadInvoice() {
    const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });
    return (
        <>
            <button onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef}><Invoice /></div>
        </>
    );
}
```

It looked exactly like the browser, grid and all, because it is the browser. But the image is cut into pages at a fixed height, not between rows. Ours happened to break between rows 44 and 45; a longer description would have sliced a row through its text. The output also changes with the window width, since that's what gets captured. And it only runs in a browser: the README says "No SSR".

Use it for a one-page card or chart a user downloads from the screen. Don't use it for invoices, contracts or anything someone needs to search.

## Is @react-pdf/renderer worth rewriting your component?

It made the smallest, fastest file: 7.5 KB in a median 33 ms, with real text. The price is a second component. @react-pdf/renderer doesn't render HTML. You write the document with its own primitives (`Document`, `Page`, `View`, `Text`) and a `StyleSheet`, and its styling is Flexbox only: the [styling docs](https://react-pdf.org/styling) list `display: flex` and `none`, with no grid. Units are points by default. Custom fonts must be TTF or WOFF files registered with `Font.register`.

Our port was 48 lines against the original's 46. The grid became two 50%-wide flex columns, and the table became rows of `View`s:

```jsx
import { renderToBuffer, Document, Page, View, Text } from '@react-pdf/renderer';

const InvoicePdf = () => (
    <Document>
        <Page size="A4" style={s.page}>
            {/* header, parties and table head as View and Text */}
            {items.map(i => (
                // wrap={false} keeps each row whole across a page break
                <View style={s.row} wrap={false} key={i.id}>
                    <Text style={s.desc}>{i.desc}</Text>
                    <Text style={s.num}>{i.qty}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

const buffer = await renderToBuffer(<InvoicePdf />); // a Node Buffer, ready to save or send
```

Without `wrap={false}`, row 24 split across the break: its top padding stayed on page 1 and its text landed on page 2. With it, the row moved whole to page 2. The table header didn't repeat on page 2 either way, because there's no table, only rows we drew. You'd add that yourself.

It's the right tool when you design the document for PDF from the start and never need it to match a web page. It's the wrong one when the component already exists and has to look the same in both places, because then you maintain two of them.

## How do you render an existing React component to PDF on the server?

Turn the component into an HTML string with `renderToStaticMarkup` from `react-dom/server`, put it in a full HTML document, and print that with headless Chromium. Same component, same CSS, no rewrite. This is what we ran:

```jsx
import { renderToStaticMarkup } from 'react-dom/server';
import puppeteer from 'puppeteer';

const html = `<!doctype html><html><head><meta charset="utf-8"></head>
<body style="margin:0">${renderToStaticMarkup(<Invoice />)}</body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html);
const pdf = await page.pdf({ format: 'A4', printBackground: true });
await browser.close();
```

The PDF kept the grid and the flex header, broke cleanly after row 33, and repeated the table's header row at the top of page 2. Use a real `<table>` and you get that for free. Keep `printBackground: true`. Puppeteer defaults to `false`, which drops the grey header row's background.

Two gotchas. The HTML string has no styles unless your component brings them, so put your CSS in the document's `<head>` or in a `<style>` tag. And `renderToStaticMarkup` doesn't wait for data: if a component suspends, React [sends its fallback](https://react.dev/reference/react-dom/server/renderToStaticMarkup) instead. Load the data first and pass it in as props, or use React 19's `prerenderToNodeStream`, which waits for it.

The 67 ms is with the browser already open; launching it took 404 ms more. And now you run Chromium on your servers, with its memory, its crashes and its updates. Our [Puppeteer production guide](/guides/puppeteer-pdf-in-production/) covers what that takes.

## Can you send that HTML string to an API instead of running Chromium?

Yes. The `html` string from the last step is all the [PDFShift API](https://docs.pdfshift.io/api-reference/convert-to-pdf) needs. We render it on our Chromium and send the PDF back:

```js
const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.PDFSHIFT_API_KEY,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source: html, format: 'A4' }),
});

if (!response.ok) {
    throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
}

const pdf = Buffer.from(await response.arrayBuffer());
```

In a Next.js Route Handler, return it with `new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } })`. If your component loads something after the first paint, the `wait_for` parameter names a global function we wait on before printing, for up to 30 seconds.

Our invoice came back as two pages with every row whole and every word selectable: the same result as Puppeteer, without a browser to install, patch or keep alive. People don't buy PDFs from us. They buy not having to run Chromium.

The free plan has 50 credits a month with no credit card. [Get a free API key](/register/) and send your own component through it.

## How we tested

One machine, November 10, 2026: Apple Silicon, macOS 27.0.1, Node 26.11.1. React and react-dom 19.3.1, @react-pdf/renderer 4.9.0, react-to-pdf 3.2.2 (with html2canvas 1.4.1 and jsPDF 4.2.1), Puppeteer 25.17.0 with Chrome for Testing 157. The web component (`Invoice.jsx`, 46 lines) and its @react-pdf/renderer port (48 lines) read the same 45-item data file. Built-in Helvetica, no web fonts.

- **react-to-pdf** ran in headless Chrome at a 1,000 px wide window, with its default options (A4, JPEG, resolution 3). We timed from the call to the finished download.
- **Puppeteer** timings are `setContent` plus `page.pdf()`, with the browser already launched. Chrome needed the `--no-sandbox` flag on our test machine to load the page; keep the sandbox on for HTML your users write.
- **PDFShift** was three calls without an API key, so the file carries the watermark keyless calls get. We timed them with `curl` from our machine to the API, network included.
- Each time is the median of 3 runs. Text was counted with pdf.js, and we checked every page break by rendering the pages to images and looking at them.

## Frequently asked questions

### Is react-pdf the same package as @react-pdf/renderer?

No. @react-pdf/renderer creates PDFs from its own components (`Document`, `Page`, `View`, `Text`). The package named react-pdf displays existing PDFs inside a React app. Install the first to generate a PDF, the second to show one.

### What about react-to-print?

react-to-print prints a React component in the browser. It opens the print dialog, so a person picks Save as PDF themselves. That's fine for a print button, but your code never gets the PDF file, so you can't email it or store it.

### Can I generate a PDF in the browser without taking a screenshot?

Yes, with @react-pdf/renderer, which runs in the browser as well as in Node. Its `PDFDownloadLink` and `BlobProvider` components build a real PDF with selectable text on the user's device.
