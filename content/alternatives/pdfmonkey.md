---
title: "PDFMonkey alternative: move Liquid templates to one API call"
description: "A PDFMonkey alternative for code templates: a Liquid invoice ported to one API call in Node, the filter that breaks silently, and PDFShift vs PDFMonkey."
date: "2026-11-11"
dateModified: "2026-11-11"
author: "Cyril Nicodème"
faq:
  - question: "Can I use PDFShift from Zapier, Make or n8n?"
    answer: "Yes. n8n has a verified PDFShift community node. In Make, you call our API with its HTTP module, and in Zapier, with webhooks. Each one sends the same POST as the script on this page."
  - question: "How do I preview a template without PDFMonkey's editor?"
    answer: "Run the script with your sample payload, and write the HTML to a file instead of sending it. Paste that HTML into our free HTML viewer to check it before you spend a credit."
  - question: "What happens to my PDFMonkey Builder templates?"
    answer: "Builder templates are built on Vue, not Liquid, so the port on this page doesn't apply to them. To send one to PDFShift, you'd write it again as HTML and CSS."
  - question: "Does PDFShift render with Chrome, like PDFMonkey?"
    answer: "Yes. PDFShift renders with Chromium. PDFMonkey renders in a Chrome-based browser, and its current engine, v5, is based on Chrome 133. In our test, the PDFMonkey invoice's table borders and Helvetica font came out as written."
---

A PDFMonkey code template is HTML and SCSS with Liquid on top, and Liquid itself isn't PDFMonkey's. So moving to a PDFMonkey alternative that takes HTML is a smaller job than it looks: render the Liquid in your own code and send the result. What breaks on the way is the dozen filters PDFMonkey added to Liquid. We moved the invoice from PDFMonkey's own Liquid docs with one script and one registered filter, and PDFShift sent the PDF back in the response to one POST.

<figure>
<svg viewBox="0 0 360 206" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pm-flow-title pm-flow-desc" style="max-width:360px;display:block;margin:0 auto;font-family:DM Sans,sans-serif" font-family="DM Sans, sans-serif">
<title id="pm-flow-title">The steps to one PDF on PDFMonkey and on PDFShift</title>
<desc id="pm-flow-desc">Two rows of steps. PDFMonkey, four steps: create a document from a template id and a payload, the document waits with the status pending, your app polls or waits for a webhook, then it downloads the file from a link that's valid for 1 hour. PDFShift, two steps: POST the HTML, and the PDF comes back in the response.</desc>
<text x="1" y="16" style="font-size:13px;font-weight:600" fill="#0A0C3D">PDFMonkey</text>
<rect x="1" y="26" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#DBE4F2" style="stroke-width:2"/>
<rect x="95" y="26" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#DBE4F2" style="stroke-width:2"/>
<rect x="189" y="26" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#DBE4F2" style="stroke-width:2"/>
<rect x="283" y="26" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#DBE4F2" style="stroke-width:2"/>
<text x="39" y="54" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Create</text>
<text x="39" y="70" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">document</text>
<text x="133" y="54" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Status:</text>
<text x="133" y="70" style="text-anchor:middle;font-size:13px" fill="#4C556D">pending</text>
<text x="227" y="54" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Poll or</text>
<text x="227" y="70" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">webhook</text>
<text x="321" y="46" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">Download</text>
<text x="321" y="62" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">link</text>
<text x="321" y="78" style="text-anchor:middle;font-size:13px" fill="#4C556D">(1 hour)</text>
<line x1="80" y1="58" x2="88" y2="58" stroke="#4C556D" style="stroke-width:1.5"/>
<polygon points="87,54 93,58 87,62" fill="#4C556D"/>
<line x1="174" y1="58" x2="182" y2="58" stroke="#4C556D" style="stroke-width:1.5"/>
<polygon points="181,54 187,58 181,62" fill="#4C556D"/>
<line x1="268" y1="58" x2="276" y2="58" stroke="#4C556D" style="stroke-width:1.5"/>
<polygon points="275,54 281,58 275,62" fill="#4C556D"/>
<text x="1" y="122" style="font-size:13px;font-weight:600" fill="#0A0C3D">PDFShift</text>
<rect x="1" y="132" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#6C47FF" style="stroke-width:2"/>
<rect x="95" y="132" width="76" height="64" rx="6" fill="#FFFFFF" stroke="#6C47FF" style="stroke-width:2"/>
<text x="39" y="160" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">POST</text>
<text x="39" y="176" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">the HTML</text>
<text x="133" y="160" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">PDF in the</text>
<text x="133" y="176" style="text-anchor:middle;font-size:13px" fill="#0A0C3D">response</text>
<line x1="80" y1="164" x2="88" y2="164" stroke="#4C556D" style="stroke-width:1.5"/>
<polygon points="87,160 93,164 87,168" fill="#4C556D"/>
</svg>
<figcaption>PDFMonkey's document flow as its API docs describe it, above one PDFShift request.</figcaption>
</figure>

Even PDFMonkey's sync endpoint, `POST /api/v1/documents/sync`, answers with the document and its `download_url`, so the file is still a second download. It waits up to 6 minutes, and for production its docs point you to async generation with webhooks.

## Move a PDFMonkey template into your own code

We took the invoice from "A taste of Liquid" in PDFMonkey's Liquid docs: a loop over line items, `times`, `date`, an `if`, and `with_delimiter` on the price column. We saved it as `template.liquid`, put three line items in `payload.json` (the JSON you'd send PDFMonkey as `payload`), ran `npm i liquidjs`, and then this:

```javascript
import { Liquid } from 'liquidjs';
import fs from 'node:fs';

const engine = new Liquid();
const template = fs.readFileSync('template.liquid', 'utf8');
const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));
const html = await engine.parseAndRender(template, payload);

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.PDFSHIFT_API_KEY,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source: html }),
});

if (!response.ok) {
    throw new Error(`PDFShift returned ${response.status}: ${await response.text()}`);
}

fs.writeFileSync('invoice.pdf', Buffer.from(await response.arrayBuffer()));
```

The PDF came back in 1.6 s: one A4 page with the invoice number, the date, the client's name and the three line items. We ran it without an API key (delete the `X-API-Key` line), so the page carries a "Created via PDFShift" watermark.

The price column was wrong, though, and nothing said so.

### PDFMonkey's own filters

PDFMonkey's docs say its added filters "[are exclusive to PDFMonkey and are not available in standard Liquid implementations](https://docs.pdfmonkey.io/references/liquid/filters/built-in)". liquidjs doesn't stop on a filter it doesn't know. It printed the raw number: 1482 where the invoice needs 1,482.00, and 57.8 for 57.80. On an invoice, that's a wrong money column with no error in your logs. One registered filter, added after `new Liquid()`, fixed it:

```javascript
engine.registerFilter('with_delimiter', (v) => Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
```

It prints 1,482.00, 57.80 and 50.00. It ignores the `precision:` argument and always gives two decimals with a comma for thousands, which is what this invoice uses. PDFMonkey's docs name eleven more: `push`, `slice_by`, `sum`, `to_sentence`, `where_exp`, `in_time_zone`, `ensure_protocol`, `format`, `entities`, `json` and `parse_json`. This invoice only needed `with_delimiter`. Search your templates for each name, check what it renders, and register what's missing.

<figure>
<svg viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pm-filter-title pm-filter-desc" style="max-width:360px;display:block;margin:0 auto;font-family:DM Sans,sans-serif" font-family="DM Sans, sans-serif">
<title id="pm-filter-title">The invoice price column without and with the with_delimiter filter</title>
<desc id="pm-filter-desc">Two boxes. Without the filter, liquidjs printed Spider silk 1482, Spandex fabric 57.8, Web fluid 50. With the filter registered, it printed 1,482.00, 57.80 and 50.00.</desc>
<text x="1" y="16" style="font-size:13px;font-weight:600" fill="#0A0C3D">Without the filter</text>
<text x="187" y="16" style="font-size:13px;font-weight:600" fill="#0A0C3D">With the filter</text>
<rect x="1" y="26" width="172" height="110" rx="6" fill="#FFFFFF" stroke="#FF9D28" style="stroke-width:2"/>
<rect x="187" y="26" width="172" height="110" rx="6" fill="#FFFFFF" stroke="#6C47FF" style="stroke-width:2"/>
<text x="13" y="60" style="font-size:13px" fill="#0A0C3D">Spider silk</text>
<text x="161" y="60" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">1482</text>
<text x="199" y="60" style="font-size:13px" fill="#0A0C3D">Spider silk</text>
<text x="347" y="60" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">1,482.00</text>
<text x="13" y="88" style="font-size:13px" fill="#0A0C3D">Spandex fabric</text>
<text x="161" y="88" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">57.8</text>
<text x="199" y="88" style="font-size:13px" fill="#0A0C3D">Spandex fabric</text>
<text x="347" y="88" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">57.80</text>
<text x="13" y="116" style="font-size:13px" fill="#0A0C3D">Web fluid</text>
<text x="161" y="116" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">50</text>
<text x="199" y="116" style="font-size:13px" fill="#0A0C3D">Web fluid</text>
<text x="347" y="116" style="text-anchor:end;font-size:13px;font-weight:600" fill="#0A0C3D">50.00</text>
</svg>
<figcaption>The price column of PDFMonkey's sample invoice, rendered with liquidjs on November 11, 2026, before and after registering <code>with_delimiter</code>.</figcaption>
</figure>

### Liquid

liquidjs rendered the loop, the variables, `times`, `date` and the `if` with no change to the template. PDFMonkey's snippets and partials become plain files in your repo that your templates include.

### SCSS

A PDFMonkey template's styles can be SCSS. Variables and mixins aren't CSS, so compile it with Sass first and put the CSS in the template's `<style>` tag.

### Template settings

A PDFMonkey template keeps its paper size, margins, header and footer as settings. On PDFShift, they're fields in the request: `format` for the paper size, `margin`, and `header` and `footer` objects, each with its own `source`. Inside those, `{{page}}` prints the page number and `{{total}}` the page count.

[Get a free API key](/register/) and run one of your own templates through the script.

## PDFShift vs PDFMonkey

| | PDFShift | PDFMonkey |
|---|---|---|
| What you send | HTML or a URL, in `source` | A template id and a JSON `payload`. There's no raw HTML endpoint: your own HTML goes through a pass-through template |
| Where templates live | In your repo, next to the code that fills them | In your PDFMonkey account |
| Webhooks | Optional: `webhook` sends the result to your URL | Sent through Svix, for success, failure and a quota warning. They leave out your payload, so you pass what you need in `meta` |
| Stored documents | Not stored by default. With `filename` (which gives you a URL) or `webhook`, kept 2 days on S3 | 1 day on Free and Starter, 1 week on Pro, no limit on Pro+ and Premium. Share links on Pro+ and Premium |
| Free plan | 50 credits a month, no card | 20 documents a month, with no external images, fonts, CSS or JS. A 30-day trial gives 300 documents, no card |
| Entry plan | Starter, $9 a month for 500 credits | Starter, €5 a month for 300 documents |
| Next plans up | $24 for 2,500 credits, $39 for 5,000 | Pro, €15 for 3,000 documents; Pro+, €60 for 5,000 |
| Past the quota | Overage per extra credit, from $0.04 on Starter down to $0.001 on the 1,000,000-credit plan | A "quota exceeded" error until the quota resets, unless you turn on pay-as-you-go (€0.008 to €0.005 a document, not on Free) or buy Boost Packs (1,000 documents for €5) |
| Longest render | 30 s on the free plan; up to 15 minutes upon request on paid plans | 30 s on Free and Starter, 2 min on Pro, 3 min on Pro+, 5 min on Premium |
| Hosting | OVH in France (Gravelines and Strasbourg); stored PDFs on AWS S3 in Paris | Fly.io and AWS in Paris; database on Neon in Frankfurt |

Prices are monthly, each in its own currency, and PDFMonkey's exclude VAT. One PDFShift credit covers a document up to 5 MB. Every plan we sell is on our [pricing page](/pricing/).

## Where else PDFMonkey users go

The other PDFMonkey alternatives sort by why you're leaving:

- You want to send your own HTML, as this page does: PDFShift, [DocRaptor](/alternatives/docraptor/) (on the Prince engine), Doppio, Api2Pdf, PDFBolt and CustomJS.
- You want another template editor: APITemplate, CraftMyPDF, PDF Generator API, PDFNoodle, DocSpring, Documint, Anvil and PDFgen. For Word, Google Docs or spreadsheet templates, Carbone, Docmosis and ActiveMerge.
- You want to run the renderer yourself: Gotenberg, [Puppeteer or Playwright](/alternatives/puppeteer/), WeasyPrint, or wkhtmltopdf, whose repo has been archived and read-only since January 2023. Or use a browser someone else hosts: Browserless.

If you need to edit PDFs or pull data out of them rather than make them, that's a PDF toolkit: Nutrient, PDF.co, Foxit or Adobe.

## Frequently asked questions

### Can I use PDFShift from Zapier, Make or n8n?

Yes. n8n has a [verified PDFShift community node](/agents/n8n/). In Make, you call our API with its HTTP module, and in Zapier, with webhooks. Each one sends the same POST as the script on this page.

### How do I preview a template without PDFMonkey's editor?

Run the script with your sample payload, and write the HTML to a file instead of sending it. Paste that HTML into our [free HTML viewer](/tools/html-viewer/) to check it before you spend a credit.

### What happens to my PDFMonkey Builder templates?

Builder templates are built on Vue, not Liquid, so the port on this page doesn't apply to them. To send one to PDFShift, you'd write it again as HTML and CSS.

### Does PDFShift render with Chrome, like PDFMonkey?

Yes. PDFShift renders with Chromium. PDFMonkey renders in a Chrome-based browser, and its current engine, v5, is based on Chrome 133. In our test, the PDFMonkey invoice's table borders and Helvetica font came out as written.
