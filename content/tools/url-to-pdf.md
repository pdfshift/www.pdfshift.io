---
title: "Convert a webpage to PDF"
seoTitle: "Convert a Webpage to PDF: Free URL to PDF Tool | PDFShift"
description: "Paste a web address and get it back as a PDF, made by PDFShift's Chromium. Pick the page size and the print stylesheet, then copy the same request as an API call."
lead: "Paste a web address and get it back as a PDF."
date: "2026-11-22"
dateModified: "2026-11-22"
author: "Cyril Nicodème"
faq:
  - question: "How do I get a PDF of an entire webpage?"
    answer: "Convert it here. PDFShift prints the whole page, top to bottom, across as many PDF pages as it takes: 22 for Wikipedia's article on PDF. If images further down come out blank, tick Load lazy images."
  - question: "How do I turn a URL link into a PDF from my code?"
    answer: "Send the address as the source of one POST to api.pdfshift.io/v3/convert/pdf, with your API key in the X-API-Key header, and the PDF comes back in the response. Our guides show the call in Python, Node, PHP and other languages."
  - question: "Can I convert a page that needs a login?"
    answer: "Yes, from your own code. The API can send cookies, HTTP headers or a basic auth username and password with the request that loads the page, and our guide on loading pages behind a login shows how. The converter here sends none of them."
---

Type the address, pick the page size and convert. Our Chromium opens the page and sends the PDF back. If the site's menus and buttons come along, tick Print stylesheet and convert again: most sites hide them on paper. Once it looks right, the API call tab has the same request, ready for your code.

## When the PDF has to come from a server

Ctrl+P and Save as PDF handle the page in front of you. They don't handle the invoice your app sends at 3 a.m., the report a customer downloads, or a hundred URLs nobody wants to print by hand. Those need a browser on a server, and that's what you're using here: you send an address, our Chromium prints it, you get a file back. People don't buy PDFs. They buy not having to run Chromium.

## Why the PDF doesn't look like the page

PDFShift loads the address from our servers as a first-time visitor, then prints it.

- **Menus and buttons in the PDF.** That's the screen version, which PDFShift prints by default. `use_print` (Print stylesheet above) switches to the styles the site wrote for paper. If you write those styles yourself, the [HTML viewer](/tools/html-viewer/) shows what they change before you convert.
- **Images missing further down.** Many pages only load an image when you scroll near it. `lazy_load_images` scrolls to the bottom first, so they're all there when it prints.
- **Content that loads late.** PDFShift waits until no request has gone out for 500 ms before printing. A chart that draws after that can still be missed. In the API, `delay` makes PDFShift wait up to 10 seconds longer.
- **A cookie banner or a login screen.** The page loads with no cookies and no session, so you get what a signed-out stranger gets.
- **The wrong page size.** A4 is the default. Letter and Legal are one click above, and the API takes other sizes too.

## A real example: Wikipedia's PDF article

We converted [Wikipedia's article on PDF](https://en.wikipedia.org/wiki/PDF) twice on November 22, 2026, once with the defaults and once with Print stylesheet. By default, page 1 opens with the site's menus: Donate, Create account, Log in, 96 languages, Talk, Read, Edit, View history. With `use_print`, page 1 opens on the article itself, and the whole PDF drops from 22 pages and 1.14 MB to 21 pages and 0.92 MB.

::::guide-figure{caption="Page 1 of the same Wikipedia article, converted by PDFShift without and with use_print. The badge top right is the watermark on conversions without an API key."}
:::guide-page-pair{:names='["Defaults", "Print stylesheet (use_print)"]'}
![The Wikipedia PDF article converted with PDFShift's defaults. On page 1, the site's menu bar with Donate, Create account and Log in runs across the top, followed by the Article and Talk tabs, 96 languages and Read, Edit, View history, before the article text and the infobox.](/images/tools/url-to-pdf/wikipedia-pdf-default.webp){width="596" height="843"}

![The same article converted with use_print. Page 1 starts with the Wikipedia logo and the article title, then the lead paragraph and the infobox, with no menus or tabs.](/images/tools/url-to-pdf/wikipedia-pdf-use-print.webp){width="596" height="843"}
:::
::::

Load lazy images changed nothing on this one: same 22 pages as the defaults.

## How the converter works

Your browser sends the address and your settings straight to the PDFShift API, the same endpoint your code would call, just without a key. Our Chromium loads the page, prints it at your page size and returns the PDF in the response. We don't keep a copy.

::guide-figure{caption="Each setting in the converter is one API parameter. A4 is the default, so it isn't sent."}
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="u2p-req-title u2p-req-desc" style="max-width:560px;min-width:420px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="u2p-req-title">The converter's settings become the request body</title>
<desc id="u2p-req-desc">On the left, the converter with the address https://en.wikipedia.org/wiki/PDF, page size A4 and Print stylesheet ticked. An arrow points to the request body on the right: source set to the address and use_print set to true. Below it, the result: a PDF of 21 pages, 0.92 MB.</desc>
<rect x="10" y="10" width="240" height="220" rx="10" fill="#FFFFFF" stroke="#C6B2FF"/>
<g fill="#0A0C3D" style="font-size:13px">
<text x="26" y="36" style="font-weight:700">Web address</text>
<rect x="26" y="46" width="208" height="28" rx="6" fill="#F3EFFF" stroke="#DBE4F2"/>
<text x="36" y="65" style="font-size:12px">en.wikipedia.org/wiki/PDF</text>
<text x="26" y="98" style="font-weight:700">Page size</text>
<rect x="26" y="106" width="40" height="24" rx="5" fill="#6C47FF"/>
<text x="46" y="122" fill="#FFFFFF" style="font-size:12px;text-anchor:middle">A4</text>
<text x="88" y="122" style="font-size:12px;text-anchor:middle">Letter</text>
<text x="134" y="122" style="font-size:12px;text-anchor:middle">Legal</text>
<rect x="26" y="146" width="14" height="14" rx="3" fill="#6C47FF"/>
<polyline points="29,153 32,157 37,149" fill="none" stroke="#FFFFFF" style="stroke-width:2"/>
<text x="48" y="158">Print stylesheet</text>
<rect x="26" y="172" width="14" height="14" rx="3" fill="#FFFFFF" stroke="#4C556D"/>
<text x="48" y="184">Landscape</text>
<rect x="26" y="198" width="14" height="14" rx="3" fill="#FFFFFF" stroke="#4C556D"/>
<text x="48" y="210">Load lazy images</text>
</g>
<line x1="256" y1="110" x2="296" y2="110" stroke="#4C556D" style="stroke-width:2"/>
<polygon points="296,104 306,110 296,116" fill="#4C556D"/>
<rect x="310" y="10" width="240" height="220" rx="10" fill="#0A0C3D"/>
<g fill="#FFFFFF" style="font-size:12px;font-family:Source Code Pro, monospace">
<text x="326" y="36" style="font-size:13px;font-weight:700;font-family:DM Sans, sans-serif">Request body</text>
<text x="326" y="64">{</text>
<text x="340" y="84">"source":</text>
<text x="354" y="102" fill="#b2ffc3">"https://en.wikipedia</text>
<text x="354" y="120" fill="#b2ffc3">.org/wiki/PDF",</text>
<text x="340" y="140">"use_print": true</text>
<text x="326" y="160">}</text>
<text x="326" y="208" style="font-size:13px;font-family:DM Sans, sans-serif">PDF: 21 pages, 0.92 MB</text>
</g>
</svg>
::

Without a key, PDFShift treats the request as a free account: the PDF carries the "Created via PDFShift" badge, files over 2 MB can't be made, conversions time out after 30 seconds, and you get up to 10 conversions a day. Addresses on your own network, like localhost, are refused.

## The same PDF from your code

Here's what the API call tab gives you for the Wikipedia example with Print stylesheet ticked:

```bash
curl https://api.pdfshift.io/v3/convert/pdf \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"source":"https://en.wikipedia.org/wiki/PDF","use_print":true}' \
  -o page.pdf
```

Swap in your key and that's your integration. Every parameter is in the [API reference](https://docs.pdfshift.io/api-reference/convert-to-pdf). The free plan gives you 50 credits a month with no credit card: [create an account](/register/) to get your key.

## Frequently asked questions

### How do I get a PDF of an entire webpage?

Convert it here. PDFShift prints the whole page, top to bottom, across as many PDF pages as it takes: 22 for Wikipedia's article on PDF. If images further down come out blank, tick Load lazy images.

### How do I turn a URL link into a PDF from my code?

Send the address as the `source` of one POST to `api.pdfshift.io/v3/convert/pdf`, with your API key in the `X-API-Key` header, and the PDF comes back in the response. Our guides show [the call in Python](/guides/python/requests/convert-html-to-pdf-from-a-url/), Node, PHP and other languages.

### Can I convert a page that needs a login?

Yes, from your own code. The API can send cookies, HTTP headers or a basic auth username and password with the request that loads the page, and our guide on [loading pages behind a login](/guides/curl/accessing-secured-pages/) shows how. The converter here sends none of them.
