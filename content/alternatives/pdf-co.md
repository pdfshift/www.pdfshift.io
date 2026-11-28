---
title: "PDF.co Alternative for HTML to PDF: Billed Per File"
description: "PDF.co bills HTML to PDF at 9 credits a page. 2,500 three-page invoices a month need its $49.99 plan; on PDFShift they fit the $24 plan."
date: "2026-11-28"
dateModified: "2026-11-28"
author: "Cyril Nicodème"
faq:
  - question: "What does PDF.co's own comparison say about PDFShift?"
    answer: "Its PDF.co vs PDFShift page calls PDFShift \"the stronger specialist for Chromium-based HTML-to-PDF, dynamic JavaScript, authenticated pages, CSS and JavaScript injection, stored HTML templates, image generation, cloud-storage delivery, and parallel conversion.\" It calls PDF.co the generalist, for OCR, data extraction, editing and other document jobs."
  - question: "Can I turn off JavaScript in PDF.co's HTML to PDF?"
    answer: "No. PDF.co's docs for the endpoint say there's no option to disable JavaScript on the raw HTML you send. On PDFShift, send disable_javascript: true and the page renders without running its scripts."
---

PDFShift bills a PDF as one credit up to 5 MB, whether it has one page or forty. PDF.co bills HTML to PDF by the page, 9 credits each. So count your pages before you compare plans: 2,500 three-page invoices a month fit our $24 plan, and on PDF.co they need the $49.99 Business 1 plan.

## One invoice: 1 credit on PDFShift, 27 on PDF.co

Our test invoice has 75 rows on A4, a header with the date and title, and a "Page N of M" footer. It comes out at 3 pages. We sent it to PDF.co's `/v1/pdf/convert/from/html` three times on November 28, 2026, and each response said `"credits": 27`. Then we repeated the rows four times to make a 9-page invoice, and PDF.co charged 81 credits on each of three calls.

On PDFShift, both cost 1 credit, and the 9-page PDF was only 185 KB. Both APIs render with Chromium, and the PDFs matched: 3 pages, rows 1 to 33 on page 1, "Page 1 of 3" at the bottom. Same pages, different bill.

<figure>
<div style="display:flex;flex-direction:column;gap:16px;margin:8px 0">
<div style="border:2px solid #6C47FF;background:#FFFFFF;border-radius:12px;padding:16px 18px">
<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px 16px;margin-bottom:10px"><span style="font-weight:700">PDFShift</span><span>1 file = <strong>1 credit</strong>, about $0.0096 on the $24 plan</span></div>
<img src="/images/alternatives/pdf-co-test-pdfshift-3-pages.png" width="1132" height="514" alt="The 3 pages of the test invoice made by PDFShift, side by side. Page 1 holds rows 1 to 33 with a small Created via PDFShift box at the top right, page 2 continues the table, page 3 holds the last rows and the total." loading="lazy" style="display:block;width:100%;height:auto;border-radius:8px">
</div>
<div style="border:1px solid #DBE4F2;background:#FFFFFF;border-radius:12px;padding:16px 18px">
<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px 16px;margin-bottom:10px"><span style="font-weight:700">PDF.co</span><span>3 pages × 9 = <strong>27 credits</strong>, about $0.018 on Personal ($24.99)</span></div>
<img src="/images/alternatives/pdf-co-test-pdfco-3-pages.png" width="1132" height="514" alt="The 3 pages of the same invoice made by PDF.co, side by side, with the same table rows on each page as the PDFShift version." loading="lazy" style="display:block;width:100%;height:auto;border-radius:8px">
</div>
</div>
<figcaption>The same 3-page invoice from each API. Cost per invoice is the plan's monthly price over the invoices its credits cover: 2,500 on our $24 plan, 1,370 on PDF.co's Personal plan (37,000 credits). The Created via PDFShift box marks a test call made without an API key. Our test, November 28, 2026.</figcaption>
</figure>

## The same volume on each price list

Monthly prices on November 28, 2026. Each PDF.co cell is the smallest plan with enough credits for that many documents.

| Documents a month | PDFShift, any length up to 5 MB | PDF.co, 1 page each | PDF.co, 3 pages each | PDF.co, 9 pages each |
|---|---|---|---|---|
| 500 | **$9** (500 credits) | $9.99 Basic (4,500 of 16,500 credits) | $9.99 Basic (13,500) | $49.99 Business 1 (40,500 of 80,500) |
| 1,000 | **$24** (2,500 credits) | $9.99 Basic (9,000) | $24.99 Personal (27,000 of 37,000) | $99.99 Business 2 (81,000 of 159,850) |
| 2,500 | **$24** (2,500 credits) | $24.99 Personal (22,500) | $49.99 Business 1 (67,500) | $299.99 Business 3 (202,500 of 483,000) |
| 5,000 | **$39** (5,000 credits) | $49.99 Business 1 (45,000) | $99.99 Business 2 (135,000) | $299.99 Business 3 (405,000) |
| 25,000 | **$99** (25,000 credits) | $299.99 Business 3 (225,000) | Custom (675,000 credits) | Custom (2,025,000 credits) |

Above 500,000 credits a month, PDF.co's pricing page asks you to get in touch. Pay yearly and PDFShift costs 10 times the monthly price, so two months are free; PDF.co's annual plans are about 10% off.

## Field by field: PDF.co to PDFShift

PDF.co has one endpoint for raw HTML and another for URLs. PDFShift takes either in `source`. The rest maps like this:

| PDFShift | PDF.co HTML to PDF |
|---|---|
| `X-API-Key` header | `x-api-key` header |
| `source`: HTML or a URL | `html`, or `url` on `/v1/pdf/convert/from/url` |
| `format: "A4"` | `paperSize: "A4"` |
| `landscape: true` | `orientation: "Landscape"` |
| `margin` with `top`, `right`, `bottom`, `left` | `margins: "100px 30px 80px 30px"` |
| Backgrounds on by default, `disable_backgrounds: true` to drop them | `printBackground: true` by default |
| `use_print: true` | `mediaType: "print"` by default |
| `header` and `footer`, each a `source` and a `height`, with `{{page}}` and `{{total}}` | `header` and `footer` HTML with `pageNumber` and `totalPages` classes |
| Waits for the network to go quiet by default; `delay` up to 10 s, or `wait_for` a function in your page | `DoNotWaitFullLoad: false` by default |
| `webhook` | `async: true` with a `callback` URL |

Two rows change your output without throwing an error. PDF.co uses your print stylesheet by default, while PDFShift uses the screen stylesheet unless you send `use_print: true`. And where PDF.co uses the `pageNumber` and `totalPages` classes, you write `{{page}}` and `{{total}}`. Each header and footer block takes a `height`, so set the page's top and bottom margins to 0. Here's the request we sent for the test, trimmed to the header and footer:

```bash
# PDFShift convert API: https://docs.pdfshift.io/api-reference/convert-to-pdf
curl https://api.pdfshift.io/v3/convert/pdf \
  -H "X-API-Key: $PDFSHIFT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "<html>...your invoice...</html>",
    "format": "A4",
    "use_print": true,
    "margin": {"top": "0px", "bottom": "0px", "left": "30px", "right": "30px"},
    "header": {"source": "<div style=\"font-size:10px;text-align:center\">Company Name | {{date}} | {{title}}</div>", "height": "100px"},
    "footer": {"source": "<div style=\"font-size:10px;text-align:center\">Page {{page}} of {{total}}</div>", "height": "80px"}
  }' \
  -o invoice.pdf
```

[Create a free account](/register/) and run one of your own invoices through it before you move anything: the free plan gives you 50 credits a month, with no card. We've turned HTML into PDFs since 2018, and our users give us [4.8 stars from 63 reviews](https://www.capterra.com/p/184246/PDFShift/reviews/) on Capterra.

## What comes back

PDFShift answers with the PDF itself, and we don't keep a copy. Want a link instead? Send `filename` and the file stays on S3 in Paris for 2 days, or send `s3_destination` and it goes straight to your own bucket. We're a French company, and every conversion runs on our servers at OVH in Gravelines and Strasbourg, France. On paid plans a conversion gets 100 seconds by default, and up to 15 minutes on request.

PDF.co answers with JSON: the page count, the credits used and a link to the PDF in its temporary storage, so your code makes a second request to download it. In our test, that link pointed to an Amazon S3 bucket in us-west-2, in Oregon. It lasts 60 minutes on Basic, Personal and Business 1, and 1,440 minutes on Business 2 and 3. A sync request that runs past 30 seconds fails, and async jobs get up to 3 minutes.

## Other PDF.co alternatives for HTML to PDF

Other hosted HTML to PDF APIs include cloudlayer, PDFCrowd, Api2Pdf and [DocRaptor](/alternatives/docraptor/), which runs the Prince engine. Template builders include [PDFMonkey](/alternatives/pdfmonkey/), pdf noodle, APITemplate and CraftMyPDF. With [Gotenberg](/alternatives/gotenberg/) or [Puppeteer](/alternatives/puppeteer/) you run Chromium yourself, and the upgrades are yours too. [Cloudflare Browser Run](/alternatives/cloudflare/) and [Browserless](/alternatives/browserless/) are hosted browser platforms.

CloudConvert, PDF SDKs like Apryse and Foxit, OCR services like Amazon Textract and Google Document AI, and editors like iLovePDF and Smallpdf do other jobs than turning your HTML into a PDF.

## Frequently asked questions

### What does PDF.co's own comparison say about PDFShift?

Its PDF.co vs PDFShift page calls PDFShift "the stronger specialist for Chromium-based HTML-to-PDF, dynamic JavaScript, authenticated pages, CSS and JavaScript injection, stored HTML templates, image generation, cloud-storage delivery, and parallel conversion." It calls PDF.co the generalist, for OCR, data extraction, editing and other document jobs.

### Can I turn off JavaScript in PDF.co's HTML to PDF?

No. PDF.co's docs for the endpoint say there's no option to disable JavaScript on the raw HTML you send. On PDFShift, send `disable_javascript: true` and the page renders without running its scripts.
