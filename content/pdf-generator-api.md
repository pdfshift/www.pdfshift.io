---
title: "PDF Generator API: HTML to PDF, With Prices Compared"
description: "PDFShift turns your HTML or a URL into a PDF with one POST. See the request, the response, the limits, and what 500 to 500,000 PDFs a month cost."
date: "2026-11-09"
dateModified: "2026-11-09"
author: "Cyril Nicodème"
faq:
  - question: "Is there a free PDF generator API?"
    answer: "Yes. PDFShift's free plan gives you 50 credits a month with no credit card, for files up to 15 MB and conversions up to 30 seconds. For testing, add \"sandbox\": true to a request: the PDF gets a watermark and uses no credits, up to 10 documents a minute."
  - question: "How do I automate PDF generation without writing a backend?"
    answer: "Use a no-code tool that can call PDFShift, such as n8n, Make or Zapier, or give an AI agent our hosted MCP server. Each one calls the same API as the code on this page."
  - question: "Which browser engine renders my HTML?"
    answer: "Chromium. New accounts get the latest version PDFShift offers, and the X-Processor-Version header lets you pin one of the accepted versions, 116 or 142."
  - question: "Can the same API make images instead of PDFs?"
    answer: "Yes. Separate endpoints return PNG, JPEG or WebP from the same HTML or URL."
---

Send PDFShift your HTML or a URL in one POST request, and the PDF comes back in the response. Your templates stay in your own code, the Chromium that renders them runs on our servers, and you can see what it costs before you sign up: [free for 50 credits a month](/register/), then from $9 for 500 to $799 for 500,000.

## Generate an invoice PDF from HTML with one API call

Your app already renders the invoice as HTML. Send that HTML as `source`, with your API key in the `X-API-Key` header:

```bash
curl https://api.pdfshift.io/v3/convert/pdf \
  -H 'X-API-Key: sk_your_api_key' \
  -H 'Content-Type: application/json' \
  -d '{"source": "<h1>Invoice #1042</h1><p>Total: $240.00</p>"}' \
  -o invoice-1042.pdf
```

The response body is the PDF itself, so `-o` writes it straight to a file. Got a URL instead? Put it in `source` and we load the page and convert it, no extra flag.

The same call from Node.js 18 or later, and from Python with `requests`:

```javascript
const res = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.PDFSHIFT_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ source: invoiceHtml })
})
const pdf = Buffer.from(await res.arrayBuffer())
```

```python
import os, requests

res = requests.post(
    "https://api.pdfshift.io/v3/convert/pdf",
    headers={"X-API-Key": os.environ["PDFSHIFT_API_KEY"]},
    json={"source": invoice_html},
)
pdf = res.content
```

Read the body as bytes, not JSON. If you'd rather have a link, add `"filename": "invoice-1042"` and the response turns into JSON with a `url` to the PDF, plus `filesize`, `duration` and `pdf_pages`. Add `"encode": true` and the PDF comes back Base64-encoded. Every parameter is in the [convert reference](https://docs.pdfshift.io/api-reference/convert-to-pdf) (API v3).

::guide-figure{caption="What one POST to /v3/convert/pdf sends back, by the parameter you add. PDFShift API v3."}
<svg viewBox="0 0 400 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pga-resp-title pga-resp-desc" style="max-width:400px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pga-resp-title">One request, four ways to get the result</title>
<desc id="pga-resp-desc">With no parameter added, the response body is the PDF. With filename, JSON with a URL to the PDF, kept for 2 days. With encode true, the PDF as Base64 text. With webhook, a 202 at once and the result posted to your webhook later.</desc>
<g style="font-size:13px" fill="#4C556D"><text x="0" y="16">You add</text><text x="148" y="16">You get back</text></g>
<rect x="1" y="28" width="130" height="44" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px;font-weight:600" x="12" y="55" fill="#0A0C3D">No parameter</text>
<path d="M134 50 h10 m-5 -5 l5 5 l-5 5" stroke="#4C556D" fill="none"/>
<rect x="148" y="28" width="251" height="44" rx="8" fill="#FFFFFF" stroke="#6C47FF"/>
<text style="font-size:13px" x="160" y="55" fill="#0A0C3D">The PDF, as the response body</text>
<rect x="1" y="84" width="130" height="44" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px;font-weight:600" x="12" y="111" fill="#0A0C3D">&quot;filename&quot;</text>
<path d="M134 106 h10 m-5 -5 l5 5 l-5 5" stroke="#4C556D" fill="none"/>
<rect x="148" y="84" width="251" height="44" rx="8" fill="#FFFFFF" stroke="#6C47FF"/>
<text style="font-size:13px" x="160" y="111" fill="#0A0C3D">JSON with a url, kept 2 days</text>
<rect x="1" y="140" width="130" height="44" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px;font-weight:600" x="12" y="167" fill="#0A0C3D">&quot;encode&quot;: true</text>
<path d="M134 162 h10 m-5 -5 l5 5 l-5 5" stroke="#4C556D" fill="none"/>
<rect x="148" y="140" width="251" height="44" rx="8" fill="#FFFFFF" stroke="#6C47FF"/>
<text style="font-size:13px" x="160" y="167" fill="#0A0C3D">The PDF as Base64 text</text>
<rect x="1" y="196" width="130" height="44" rx="8" fill="#FFFFFF" stroke="#DBE4F2"/>
<text style="font-size:13px;font-weight:600" x="12" y="223" fill="#0A0C3D">&quot;webhook&quot;</text>
<path d="M134 218 h10 m-5 -5 l5 5 l-5 5" stroke="#4C556D" fill="none"/>
<rect x="148" y="196" width="251" height="44" rx="8" fill="#FFFFFF" stroke="#6C47FF"/>
<text style="font-size:13px" x="160" y="223" fill="#0A0C3D">202 now, the result POSTed later</text>
</svg>
::

### Templates in a visual editor, or your own HTML?

We render the HTML and CSS you already have, with a current Chromium. Most of the other PDF generator APIs you'll find in a search work the opposite way: you rebuild the template in their visual editor, then fill it with JSON. If your developers own the layout, that's a second copy of every template, in another company's editor, to keep in sync. Rather keep templates with us? Store them as HTML through the API and send only the data each time.

## PDF generation API comparison: what 500 to 500,000 PDFs a month cost

We count 1 credit per 5 MB of output, so an invoice or a report of a few pages costs 1 credit. Here's the smallest published plan that covers each volume of one-page PDFs, and what it costs a month:

| API | Billed by | 500 a month | 5,000 | 50,000 | 500,000 |
| --- | --- | --- | --- | --- | --- |
| **PDFShift** | **credit (1 per 5 MB)** | **$9** | **$39** | **$149** | **$799** |
| PDF Generator API | credit (1 per 1 to 5 pages) | €43, billed yearly | €73, billed yearly | €296, billed yearly | not published |
| CraftMyPDF | PDF | $29 | $99 | $499 | contact sales |
| APITemplate.io | PDF | $24 | $89 | not published | not published |
| PDFMonkey | document | €6.60 | €29 | €300 | €2,500 |
| Nutrient DWS API | credit (0.5 per HTML to PDF) | $75 | $275 | contact sales | contact sales |
| Adobe PDF Services | document transaction | free tier, 500 a month | contact sales | contact sales | contact sales |
| DocRaptor | document | $75 | $149 | contact sales | contact sales |
| Api2Pdf | MB and compute second | about $1.25 | about $3.46 | about $26 | about $247 |

Prices as of November 9, 2026, billed monthly unless the row says otherwise. PDFMonkey's figures include its published per-document overage. Api2Pdf charges $1 a month plus bandwidth and compute time, so its figures use the 0.1 MB, 2-second PDF from its own pricing example. A heavier page costs more.

The more PDFs you make, the fewer of these APIs will tell you the price:

::guide-figure{caption="How many of the 9 APIs in the table publish a monthly price at each volume of one-page PDFs, as of November 9, 2026."}
<svg viewBox="0 0 400 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pga-pub-title pga-pub-desc" style="max-width:400px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="pga-pub-title">At 500,000 PDFs a month, 3 of 9 APIs publish a price</title>
<desc id="pga-pub-desc">Bar chart of how many of the 9 APIs publish a monthly price that covers each volume. 500 PDFs a month: 9. 5,000: 8. 50,000: 5. 500,000: 3, PDFShift, PDFMonkey and Api2Pdf.</desc>
<g style="font-size:13px" fill="#4C556D">
<line x1="40" y1="220.0" x2="396" y2="220.0" stroke="#DBE4F2"/>
<text x="30" y="224.0" text-anchor="end">0</text>
<line x1="40" y1="163.3" x2="396" y2="163.3" stroke="#DBE4F2"/>
<text x="30" y="167.3" text-anchor="end">3</text>
<line x1="40" y1="106.7" x2="396" y2="106.7" stroke="#DBE4F2"/>
<text x="30" y="110.7" text-anchor="end">6</text>
<line x1="40" y1="50.0" x2="396" y2="50.0" stroke="#DBE4F2"/>
<text x="30" y="54.0" text-anchor="end">9</text>
<text x="84" y="240" text-anchor="middle">500</text>
<text x="172" y="240" text-anchor="middle">5,000</text>
<text x="260" y="240" text-anchor="middle">50,000</text>
<text x="348" y="240" text-anchor="middle">500,000</text>
<text x="216" y="260" text-anchor="middle">One-page PDFs a month</text>
</g>
<rect x="56" y="50.0" width="56" height="170.0" rx="4" fill="#6C47FF"/>
<rect x="144" y="68.9" width="56" height="151.1" rx="4" fill="#6C47FF"/>
<rect x="232" y="125.6" width="56" height="94.4" rx="4" fill="#6C47FF"/>
<rect x="320" y="163.3" width="56" height="56.7" rx="4" fill="#6C47FF"/>
<g style="font-size:14px;font-weight:600" fill="#0A0C3D">
<text x="84" y="42.0" text-anchor="middle">9 of 9</text>
<text x="172" y="60.9" text-anchor="middle">8 of 9</text>
<text x="260" y="117.6" text-anchor="middle">5 of 9</text>
<text x="348" y="155.3" text-anchor="middle">3 of 9</text>
</g>
</svg>
::

You shouldn't need a sales call to know what your next invoice run costs. Every PDFShift plan, up to 1,000,000 credits for $999 a month, is on the [pricing page](/pricing/).

## Webhooks, async and batch PDF generation

By default, your request waits until the PDF is ready. For long documents or big runs, add a `webhook` URL: the API answers at once with `202` and a queued status, then POSTs the result to your webhook with a link to the file. To skip our storage, set `s3_destination` and the PDF goes straight to your own S3 bucket.

A batch job is just more of the same calls: one request per document, in parallel, up to 250 a minute, with a webhook to collect the results. One conversion can run for up to 15 minutes on a paid plan.

## HIPAA, BAA and GDPR: PDFs generated in the EU

PDFShift is a French company, and conversions run on our servers in France. We don't keep your documents by default. A PDF is stored only when you ask for a link (`filename` or `webhook`), on AWS S3 in Paris, and it's deleted after 2 days. For GDPR, our [data processing agreement](/legal/dpa/) is public.

For health data, set `is_hipaa: true` on the request and sign our [BAA](/legal/hipaa/). With it on, `filename` and `webhook` need your own `s3_destination`, so the file never sits in our storage.

## Frequently asked questions

### Is there a free PDF generator API?

Yes. PDFShift's free plan gives you 50 credits a month with no credit card, for files up to 15 MB and conversions up to 30 seconds. For testing, add `"sandbox": true` to a request: the PDF gets a watermark and uses no credits, up to 10 documents a minute.

### How do I automate PDF generation without writing a backend?

Use a no-code tool that can call PDFShift, such as [n8n](/agents/n8n/), Make or Zapier, or give an AI agent our [hosted MCP server](/agents/mcp/). Each one calls the same API as the code on this page.

### Which browser engine renders my HTML?

Chromium. New accounts get the latest version PDFShift offers, and the `X-Processor-Version` header lets you pin one of the accepted versions, 116 or 142.

### Can the same API make images instead of PDFs?

Yes. Separate endpoints return PNG, JPEG or WebP from the same HTML or URL.
