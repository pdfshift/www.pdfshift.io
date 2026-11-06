---
title: "HTML viewer"
seoTitle: "HTML Viewer: Preview HTML Online, Free | PDFShift"
description: "Free HTML viewer: paste or open HTML and see it rendered as you type, in a sandboxed frame. Check it at A4 page width with its print CSS before you make a PDF."
lead: "Paste or open HTML and see it rendered as you type."
date: "2026-11-05"
dateModified: "2026-11-05"
author: "Cyril Nicodème"
---

If your HTML is going to be a PDF, don't judge it in Desktop view. Switch to A4 page and turn on Print CSS: you'll see it at the width a PDF page gives it, with the styles its print rules set. That's the check worth doing before you convert anything.

## Why does my HTML look different as a PDF?

Two things change when HTML becomes a PDF page: the width and the styles.

The width comes from the paper size. An A4 page is [210 mm wide](https://www.w3.org/TR/css-page-3/), and at [96 CSS pixels to the inch](https://www.w3.org/TR/css-values-4/) that's about 794 pixels. A layout that's fine on a wide screen can wrap, squeeze or flip to its phone layout at that width. A4 page shows your HTML at 794 pixels, so you see it before your customer does.

The styles come from print rules. A stylesheet's `@media print` rules say how the document should look on paper: hide the navigation, drop the buttons, change the colors. Print CSS applies them and switches off the screen-only rules. In PDFShift, that's the [`use_print` option](https://docs.pdfshift.io/api-reference/convert-to-pdf), and it's off by default. So if your HTML relies on print rules, send `use_print: true`. If it doesn't, leave Print CSS off here too.

The invoice already in the editor has print rules. Switch to A4 page, then tick Print CSS: the navigation bar and the Pay online button go, and the invoice is all that's left. That's the version you want in the PDF.

::guide-figure{caption="The sample invoice at A4 page width, with Print CSS off and on."}
<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hv-print-title hv-print-desc" style="max-width:560px;min-width:420px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="hv-print-title">Print CSS hides what a printed page doesn't need</title>
<desc id="hv-print-desc">Two sketches of the same invoice at A4 width. On the left, Print CSS off: a dark navigation bar, the invoice title, a table and a purple Pay online button. On the right, Print CSS on: the navigation bar and the button are gone, and the invoice title and table remain.</desc>
<g font-size="13" fill="#0A0C3D" font-weight="500">
<text x="140" y="18" text-anchor="middle">Print CSS off</text>
<text x="420" y="18" text-anchor="middle">Print CSS on (use_print: true)</text>
</g>
<rect x="40" y="30" width="200" height="260" rx="6" fill="#FFFFFF" stroke="#C6B2FF"/>
<rect x="56" y="46" width="168" height="20" rx="4" fill="#0A0C3D"/>
<text x="66" y="60" fill="#FFFFFF" style="font-size:10px">Dashboard  Invoices  Settings</text>
<rect x="56" y="80" width="80" height="12" rx="2" fill="#0A0C3D"/>
<rect x="56" y="98" width="110" height="6" rx="2" fill="#DBE4F2"/>
<g fill="#DBE4F2"><rect x="56" y="122" width="168" height="6" rx="2"/><rect x="56" y="140" width="168" height="6" rx="2"/><rect x="56" y="158" width="168" height="6" rx="2"/><rect x="56" y="176" width="168" height="6" rx="2"/></g>
<rect x="56" y="200" width="70" height="22" rx="4" fill="#6C47FF"/>
<text x="91" y="215" fill="#FFFFFF" style="font-size:10px" text-anchor="middle">Pay online</text>
<rect x="320" y="30" width="200" height="260" rx="6" fill="#FFFFFF" stroke="#C6B2FF"/>
<rect x="336" y="46" width="80" height="12" rx="2" fill="#0A0C3D"/>
<rect x="336" y="64" width="110" height="6" rx="2" fill="#DBE4F2"/>
<g fill="#DBE4F2"><rect x="336" y="88" width="168" height="6" rx="2"/><rect x="336" y="106" width="168" height="6" rx="2"/><rect x="336" y="124" width="168" height="6" rx="2"/><rect x="336" y="142" width="168" height="6" rx="2"/></g>
</svg>
::

The preview is one long page. It doesn't show page breaks, margins, headers or footers: those only appear in the PDF itself. Print CSS reads the print rules in `<style>` tags and in the `media` attribute of `<link>` tags. It doesn't pick up an `@media print` block inside a linked stylesheet file.

## Why are images or fonts missing in the preview?

Because the preview can't find your files. Relative URLs in pasted HTML are read against the address of this page, so `<img src="logo.png">` asks pdfshift.io for a file it doesn't have. Stylesheets and fonts loaded by relative path break the same way.

The fix is one line. Add a `<base>` tag at the top of `<head>` with the address your files live at, or write the URLs out in full.

::guide-figure{caption="Where a relative image path points, with and without a base tag."}
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hv-base-title hv-base-desc" style="max-width:560px;min-width:420px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="hv-base-title">A base tag sends relative paths back to your own site</title>
<desc id="hv-base-desc">Without a base tag, img src logo.png resolves to https://pdfshift.io/tools/html-viewer/logo.png, which doesn't exist. With base href https://example.com/invoices/, it resolves to https://example.com/invoices/logo.png, where the file is.</desc>
<g font-size="13" fill="#0A0C3D">
<text x="20" y="30" font-weight="500">Without a base tag</text>
<rect x="20" y="42" width="170" height="34" rx="6" fill="#FFFFFF" stroke="#C6B2FF"/>
<text x="105" y="64" text-anchor="middle">src="logo.png"</text>
<line x1="190" y1="59" x2="232" y2="59" stroke="#4C556D" stroke-width="2"/>
<polygon points="232,54 242,59 232,64" fill="#4C556D"/>
<rect x="244" y="42" width="296" height="34" rx="6" fill="#FFFFFF" stroke="#FF9D28" stroke-width="2"/>
<text x="392" y="64" text-anchor="middle">pdfshift.io/tools/html-viewer/logo.png</text>
<text x="392" y="94" text-anchor="middle" fill="#4C556D">Not found: the image doesn't show</text>
<text x="20" y="130" font-weight="500">With &lt;base href="https://example.com/invoices/"&gt;</text>
<rect x="20" y="142" width="170" height="34" rx="6" fill="#FFFFFF" stroke="#C6B2FF"/>
<text x="105" y="164" text-anchor="middle">src="logo.png"</text>
<line x1="190" y1="159" x2="232" y2="159" stroke="#4C556D" stroke-width="2"/>
<polygon points="232,154 242,159 232,164" fill="#4C556D"/>
<rect x="244" y="142" width="296" height="34" rx="6" fill="#FFFFFF" stroke="#6C47FF" stroke-width="2"/>
<text x="392" y="164" text-anchor="middle">example.com/invoices/logo.png</text>
</g>
</svg>
::

```html
<head>
  <base href="https://example.com/invoices/">
  ...
</head>
```

## Is my HTML sent anywhere?

No. Your browser draws it in an `<iframe>` on this page, and nothing in the tool uploads it. Files you open are read by your browser too, up to 2 MB.

The frame is sandboxed. Scripts stay off until you tick Run JavaScript. Forms show but don't submit, links that open new windows do nothing, and even with scripts on, the HTML can't read pdfshift.io's cookies or move you to another page.

## Turn the HTML into a PDF

When it looks right, send the same HTML to PDFShift as the `source` of one request. We render it in Chromium and send the PDF back, so there's no browser for you to run or patch. Here it is in Node 18 or later:

```javascript
import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile('invoice.html', 'utf8');

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.PDFSHIFT_API_KEY,
        'Content-Type': 'application/json'
    },
    // use_print: true applies your @media print rules, like Print CSS above
    body: JSON.stringify({ source: html, use_print: true })
});

if (!response.ok) {
    throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
}

await writeFile('invoice.pdf', Buffer.from(await response.arrayBuffer()));
```

The free plan gives you 50 credits a month with no credit card: [create an account](/register/) to get an API key. For the same call in other languages, see [converting raw HTML to PDF](/guides/node/axios/convert-html-to-pdf-from-raw-html/) in our guides.
