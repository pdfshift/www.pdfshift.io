---
title: "DocRaptor alternative: PDFShift, tested on the same page"
description: "A DocRaptor alternative tested on one page: DocRaptor stacked the CSS grid and skipped the script, PDFShift didn't. Prices at 3 volumes, options mapped."
date: "2026-11-11"
dateModified: "2026-11-11"
author: "Cyril Nicodème"
faq:
  - question: "Is DocRaptor free?"
    answer: "DocRaptor's Free plan makes 5 documents a month, with no overage. Every DocRaptor account also gets unlimited test documents, which carry a watermark and don't count against the plan. PDFShift's free plan gives you 50 credits a month, and you don't need a card to sign up."
  - question: "Does PDFShift have test documents like DocRaptor?"
    answer: "Yes. Send sandbox: true and the document uses no credits. It carries a watermark, and you can make up to 10 a minute."
  - question: "Is DocRaptor HIPAA compliant?"
    answer: "DocRaptor offers HIPAA compliance on its paid plans once you sign its Business Associate Agreement and change a setting on your account. PDFShift handles protected health information when you send is_hipaa: true and sign our BAA. With is_hipaa, a PDF you ask us to save goes to your own S3 bucket, not ours."
---

We sent one page to DocRaptor and to PDFShift on November 11, 2026: a CSS grid, a flexbox row and a short modern script. DocRaptor stacked the grid into one column and skipped the script. PDFShift printed the page the way Chromium shows it. If your templates are ordinary HTML and CSS, that's the engine you want. It's cheaper too: 5,000 documents a month cost $39 on PDFShift and $149 on DocRaptor.

## Will a DocRaptor template look the same on PDFShift?

The test page had a three-column CSS grid, a flexbox row with a 24px gap, a color set with a CSS variable, a print stylesheet, and a script that writes one line using an arrow function. A second copy added an `@page` rule with a page-number footer. DocRaptor made its PDFs with Prince 15.1, its default engine. Here's what came back:

| On the page | PDFShift | DocRaptor |
|---|---|---|
| Three-column CSS grid | **3 columns, 2 rows** | Stacked in one column |
| Flexbox row | **Side by side, gaps kept** | Side by side, gaps not visible |
| Color from a CSS variable | **Applied** | Applied |
| The script, default settings | **Ran** | Didn't run (`javascript` is off by default) |
| The script, with JavaScript turned on | **Not needed** | `javascript: true`: no PDF, error 422, "SyntaxError: Unexpected token '>'". Prince's own JavaScript engine: the script didn't run |
| Print stylesheet | **Applied with `use_print: true`** | Applied |
| `@page` footer with `counter(page)` | **Printed "Page 1 of 1"** | Printed "Page 1 of 1" |

<figure>
<svg viewBox="0 0 360 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dr-test-title dr-test-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="dr-test-title">Page 1 of the same test page from PDFShift and from DocRaptor</title>
<desc id="dr-test-desc">Two pages side by side. PDFShift: a heading, a grid of three columns and two rows, a row of three separate flex boxes, a colored line, the line the script wrote, and the print stylesheet line. DocRaptor: a heading, the six grid cells stacked in one column, the flex row as one bar, the colored line, an empty space where the script's line should be, and the print stylesheet line.</desc>
<text x="88" y="16" style="text-anchor:middle;font-size:14px;font-weight:600" fill="#0A0C3D">PDFShift</text>
<text x="272" y="16" style="text-anchor:middle;font-size:14px;font-weight:600" fill="#0A0C3D">DocRaptor</text>
<rect x="7" y="27" width="162" height="210" rx="4" fill="#FFFFFF" stroke="#6C47FF" style="stroke-width:2"/>
<rect x="18" y="42" width="70" height="8" rx="2" fill="#6C47FF"/>
<rect x="18" y="58" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="66" y="58" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="114" y="58" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="18" y="80" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="66" y="80" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="114" y="80" width="44" height="18" rx="2" fill="#DBE4F2"/>
<rect x="18" y="106" width="40" height="12" rx="2" fill="#FF9D28" style="fill-opacity:0.45"/>
<rect x="68" y="106" width="40" height="12" rx="2" fill="#FF9D28" style="fill-opacity:0.45"/>
<rect x="118" y="106" width="40" height="12" rx="2" fill="#FF9D28" style="fill-opacity:0.45"/>
<rect x="18" y="128" width="60" height="5" rx="2" fill="#6C47FF"/>
<rect x="18" y="140" width="84" height="5" rx="2" fill="#0A0C3D"/>
<rect x="18" y="152" width="74" height="5" rx="2" fill="#4C556D"/>
<rect x="191" y="27" width="162" height="210" rx="4" fill="#FFFFFF" stroke="#DBE4F2" style="stroke-width:2"/>
<rect x="202" y="42" width="70" height="8" rx="2" fill="#6C47FF"/>
<rect x="202" y="58" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="71" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="84" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="97" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="110" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="123" width="140" height="10" rx="2" fill="#DBE4F2"/>
<rect x="202" y="141" width="140" height="12" rx="2" fill="#FF9D28" style="fill-opacity:0.45"/>
<rect x="202" y="163" width="60" height="5" rx="2" fill="#6C47FF"/>
<rect x="202" y="175" width="84" height="5" rx="2" fill="none" stroke="#4C556D" style="stroke-dasharray:3 2"/>
<rect x="202" y="187" width="74" height="5" rx="2" fill="#4C556D"/>
<text x="88" y="260" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Grid 3 by 2,</text>
<text x="88" y="278" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">script ran</text>
<text x="272" y="260" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Grid stacked,</text>
<text x="272" y="278" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">script didn't run</text>
</svg>
<figcaption>Page 1 of the test page, drawn from the two PDFs made on November 11, 2026. Test watermarks left out.</figcaption>
</figure>

Everything DocRaptor got right came out the same on PDFShift, the `@page` footer included.

## What PDFShift and DocRaptor cost at 500, 5,000 and 40,000 documents

| Documents a month | PDFShift | DocRaptor |
|---|---|---|
| Free plan | **50 credits a month, no card** | 5 documents a month, no overage |
| 500 | **$9 for 500** | Premium, $75 for 1,250 |
| 5,000 | **$39 for 5,000** | Max, $149 for 5,000 |
| 40,000 | **$149 for 50,000** | Silver, $1,000 for 40,000 |

Monthly prices on November 11, 2026, for the smallest plan that covers the volume without overage. One PDFShift credit covers a document up to 5 MB.

<figure>
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dr-price-title dr-price-desc" style="max-width:360px;display:block;margin:0 auto">
<title id="dr-price-title">Monthly price of PDFShift and DocRaptor at three volumes</title>
<desc id="dr-price-desc">Bars start at zero dollars. 500 documents a month: PDFShift $9, DocRaptor $75. 5,000 a month: PDFShift $39, DocRaptor $149. 40,000 a month: PDFShift $149, DocRaptor $1,000.</desc>
<line x1="0.5" y1="22" x2="0.5" y2="214" stroke="#DBE4F2" style="stroke-width:1"/>
<text x="0" y="18" style="font-size:13px;font-weight:600" fill="#0A0C3D">500 documents a month</text>
<rect x="1" y="26" width="2.1" height="14" rx="2" fill="#6C47FF"/>
<text x="9.1" y="37" style="font-size:13px" fill="#0A0C3D">PDFShift $9</text>
<rect x="1" y="46" width="17.2" height="14" rx="2" fill="#4C556D"/>
<text x="24.2" y="57" style="font-size:13px" fill="#0A0C3D">DocRaptor $75</text>
<text x="0" y="90" style="font-size:13px;font-weight:600" fill="#0A0C3D">5,000 documents a month</text>
<rect x="1" y="98" width="9.0" height="14" rx="2" fill="#6C47FF"/>
<text x="16.0" y="109" style="font-size:13px" fill="#0A0C3D">PDFShift $39</text>
<rect x="1" y="118" width="34.3" height="14" rx="2" fill="#4C556D"/>
<text x="41.3" y="129" style="font-size:13px" fill="#0A0C3D">DocRaptor $149</text>
<text x="0" y="162" style="font-size:13px;font-weight:600" fill="#0A0C3D">40,000 documents a month</text>
<rect x="1" y="170" width="34.3" height="14" rx="2" fill="#6C47FF"/>
<text x="41.3" y="181" style="font-size:13px" fill="#0A0C3D">PDFShift $149</text>
<rect x="1" y="190" width="230.0" height="14" rx="2" fill="#4C556D"/>
<text x="237.0" y="201" style="font-size:13px" fill="#0A0C3D">DocRaptor $1,000</text>
</svg>
<figcaption>Monthly price at each volume.</figcaption>
</figure>

## What changes in your DocRaptor request

| PDFShift | Replaces this in DocRaptor |
|---|---|
| `POST https://api.pdfshift.io/v3/convert/pdf`, API key in the `X-API-Key` header | `POST https://api.docraptor.com/docs`, API key as the basic-auth user name |
| `source`, which takes HTML or a URL | `document_content` or `document_url` |
| `sandbox: true` | `test: true` |
| Nothing to set: JavaScript runs. `disable_javascript: true` turns it off | `javascript: true`, off by default |
| `wait_for`: the name of a global function that returns true when the page is ready, or `delay` for a fixed wait of up to 10 seconds | `docraptorJavaScriptFinished()` |
| **`use_print: true`**. Without it, PDFShift uses your normal screen CSS | `prince_options.media`, print by default |
| `format` (A4 by default) and `margin`. `@page` margin boxes still print | `@page` size and margins |
| `webhook`: PDFShift posts the result to your URL, and posts an error if the conversion fails | `async: true` with `callback_url` |
| `filename` keeps the PDF for 2 days and returns its URL, or `s3_destination` saves it to your own bucket | `hosted: true` |
| PDF, or PNG, JPEG and WEBP images, each from its own endpoint | `type`: `"pdf"`, `"xls"` or `"xlsx"` |

There's no importer, and you don't need one: change the endpoint and these fields, and your HTML stays as it is. [Create a free account](/register/) and run your own templates through it, starting with any that use `prince-` CSS properties, because those only work in Prince. Open one in our [HTML viewer](/tools/html-viewer/) first to see it at A4 width with its print CSS. If an AI agent makes your documents, connect it to our [MCP server](/agents/mcp/) and it makes the PDF with one tool call.

## Other DocRaptor alternatives, by kind of product

**Hosted APIs on a browser engine**, like PDFShift: Doppio runs managed Chromium, CustomJS renders with Chromium and works with Make and n8n, Api2Pdf offers Headless Chrome or wkhtmltopdf, PDFgen adds AI-built templates, and AgentGen is built for AI agents. Browserless hosts browsers for your Puppeteer or Playwright code and also has a `/pdf` endpoint.

**Template editors**: CraftMyPDF, APITemplate, [PDFMonkey](/alternatives/pdfmonkey/) and PDF Generator API. You design the document in their editor and send it data, so moving there means building your templates again.

**An engine you run yourself**: a Prince site license (from around $2,000 a year for startups, with upgrades and support), Gotenberg (Chromium and LibreOffice in a Docker container) or WeasyPrint (a Python library with its own layout engine). For Puppeteer and Playwright, see our [Puppeteer alternatives for PDF generation](/alternatives/puppeteer/).

## Frequently asked questions

### Is DocRaptor free?

DocRaptor's Free plan makes 5 documents a month, with no overage. Every DocRaptor account also gets unlimited test documents, which carry a watermark and don't count against the plan. PDFShift's free plan gives you 50 credits a month, and you don't need a card to sign up.

### Does PDFShift have test documents like DocRaptor?

Yes. Send `sandbox: true` and the document uses no credits. It carries a watermark, and you can make up to 10 a minute.

### Is DocRaptor HIPAA compliant?

DocRaptor offers HIPAA compliance on its paid plans once you sign its Business Associate Agreement and change a setting on your account. PDFShift handles protected health information when you send `is_hipaa: true` and sign our [BAA](/legal/hipaa/). With `is_hipaa`, a PDF you ask us to save goes to your own S3 bucket, not ours.
