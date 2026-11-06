---
title: "Best PDF generation APIs an AI agent can call"
description: "Nine PDF generation APIs checked from an AI agent's side: hosted MCP server, registry listing, llms.txt, one-call output, free plan and price."
date: "2026-11-06"
dateModified: "2026-11-06"
author: "Cyril Nicodème"
---

If your AI agent has to turn HTML or a URL into a PDF, give it PDFShift. We host an MCP server it can call with one API key, there's an OpenAPI spec for agents that don't speak MCP, and the PDF, or a link to it, comes back in the same response.

Of the nine PDF APIs below, only two host an MCP server listed in the official registry: ours and Nutrient's. Nutrient's needs a person to sign in before an agent can use it.

## What does an AI agent need from a PDF API?

A person can sign up, read the docs and click around a dashboard. An agent can't, so a good PDF API for agents comes down to five things:

1. **A hosted MCP server.** The Model Context Protocol is how Claude, ChatGPT and Cursor call outside tools. A server the vendor hosts means nothing to install and no browser to run next to the agent.
2. **A listing in the official MCP Registry.** It's the public catalog MCP clients and directories read to find servers, and only the vendor can list a server under its own name.
3. **A machine-readable spec.** An OpenAPI spec turns into tool definitions for agents that don't use MCP, and an `llms.txt` file tells a model where the docs are.
4. **One API key.** A key in a header is something an agent can carry. A browser sign-in or a token you have to mint first needs a person once.
5. **Done in one call.** The agent sends the HTML and gets the PDF, or a link to it, in the same response. A job ID it has to poll is one more loop where an agent can stall or give up.

Then the limits an agent runs into halfway through a task: how long one conversion may take, how big the file may be, and how long a download link lives.

## Which PDF APIs can an AI agent call?

| Tool | Hosted MCP server | Done in one call | Free plan | Cheapest paid plan |
| --- | --- | --- | --- | --- |
| PDFShift | Yes | Yes | 50 credits a month | $9 for 500 credits |
| Nutrient DWS API | Yes, account sign-in | Yes | 50 credits a month, watermarked | $75 for 1,000 credits |
| Api2Pdf | Yes | Yes, a file URL | First month's credit | $1 plus usage |
| PDF Generator API | Yes, access token | Yes, or async | 14-day trial | €80 a year, Creator plan |
| PDFMonkey | No, a local npm server | No, the job is polled | 20 documents a month | €5 for 300 documents |
| APITemplate.io | No | Yes, a download URL | 50 PDFs a month | $24 for 3,000 PDFs |
| DocRaptor | No | Yes, up to 60 seconds | Watermarked test documents | $15 for 125 documents |
| Adobe PDF Services | No | No, upload then job | 500 transactions a month | Through Adobe's sales team |
| Gotenberg | No, self-hosted | Yes | Open source | You run the servers |

"Hosted MCP server" means one the vendor runs and documents. Third-party wrappers exist for some of these APIs, and we left them out. Prices are billed monthly unless noted, as of November 5 and 6, 2026.

::guide-figure{caption="What each tool gives an AI agent to call. Our check, November 6, 2026."}
<svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="agents-matrix-title agents-matrix-desc" style="max-width:560px;min-width:460px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="agents-matrix-title">Four checks an AI agent cares about, tool by tool</title>
<desc id="agents-matrix-desc">Grid of 9 tools against 4 checks: hosted MCP server, listed in the official MCP Registry, llms.txt, done in one call. PDFShift passes 4. Nutrient passes 4, with a sign-in for its MCP server. Api2Pdf and PDF Generator API pass 3. PDFMonkey passes 2. APITemplate.io, DocRaptor and Gotenberg pass 1. Adobe PDF Services passes 0.</desc>
<g font-size="13" fill="#4C556D" font-weight="500">
<text x="235" y="40" text-anchor="middle">Hosted MCP</text>
<text x="330" y="40" text-anchor="middle">In registry</text>
<text x="425" y="40" text-anchor="middle">llms.txt</text>
<text x="515" y="40" text-anchor="middle">One call</text>
</g>
<g font-size="14" fill="#0A0C3D">
<text x="0" y="79" font-weight="500">PDFShift</text>
<text x="0" y="109">Nutrient DWS API</text>
<text x="0" y="139">Api2Pdf</text>
<text x="0" y="169">PDF Generator API</text>
<text x="0" y="199">PDFMonkey</text>
<text x="0" y="229">APITemplate.io</text>
<text x="0" y="259">DocRaptor</text>
<text x="0" y="289">Adobe PDF Services</text>
<text x="0" y="319">Gotenberg</text>
</g>
<rect x="0" y="58" width="560" height="30" rx="6" fill="rgba(108, 71, 255, 0.08)"/>
<g fill="#6C47FF">
<circle cx="235" cy="74" r="8"/><circle cx="330" cy="74" r="8"/><circle cx="425" cy="74" r="8"/><circle cx="515" cy="74" r="8"/>
<circle cx="235" cy="104" r="8"/><circle cx="330" cy="104" r="8"/><circle cx="425" cy="104" r="8"/><circle cx="515" cy="104" r="8"/>
<circle cx="235" cy="134" r="8"/><circle cx="425" cy="134" r="8"/><circle cx="515" cy="134" r="8"/>
<circle cx="235" cy="164" r="8"/><circle cx="425" cy="164" r="8"/><circle cx="515" cy="164" r="8"/>
<circle cx="330" cy="194" r="8"/><circle cx="425" cy="194" r="8"/>
<circle cx="515" cy="224" r="8"/>
<circle cx="515" cy="254" r="8"/>
<circle cx="515" cy="314" r="8"/>
</g>
<g fill="none" stroke="#4C556D">
<circle cx="330" cy="134" r="7"/>
<circle cx="330" cy="164" r="7"/>
<circle cx="235" cy="194" r="7"/><circle cx="515" cy="194" r="7"/>
<circle cx="235" cy="224" r="7"/><circle cx="330" cy="224" r="7"/><circle cx="425" cy="224" r="7"/>
<circle cx="235" cy="254" r="7"/><circle cx="330" cy="254" r="7"/><circle cx="425" cy="254" r="7"/>
<circle cx="235" cy="284" r="7"/><circle cx="330" cy="284" r="7"/><circle cx="425" cy="284" r="7"/><circle cx="515" cy="284" r="7"/>
<circle cx="235" cy="314" r="7"/><circle cx="330" cy="314" r="7"/><circle cx="425" cy="314" r="7"/>
</g>
</svg>
::

Five of the nine publish an `llms.txt`: PDFShift, Nutrient, Api2Pdf, PDF Generator API and PDFMonkey. Three are in the official MCP Registry under their own name: PDFShift and Nutrient with a hosted server, PDFMonkey with its local one.

## 1. PDFShift

**Best for:** agents, and the apps behind them, that need a PDF or a screenshot without running a browser.

People don't buy PDFs. They buy not having to run Chromium, and an agent running in someone's chat window has no machine to run it on anyway. So we host the browser and give the agent three ways in.

- **MCP server:** `https://api.pdfshift.io/mcp`, over Streamable HTTP. It's in the [official MCP Registry](https://registry.modelcontextprotocol.io/?q=pdfshift). An agent can connect and list the tools without a key, then run them with your API key in the `X-API-Key` header. The `convert` tool turns an HTML document or a URL into a PDF, PNG, JPEG or WEBP and returns a temporary download link in the same call. The other ten work with saved HTML templates, credits, pricing and logs.
- **OpenAPI spec:** `https://api.pdfshift.io/openapi.json`, OpenAPI 3.0.3. `POST /v3/convert/pdf` answers with the PDF itself. Add `webhook` when you'd rather be called back.
- **For no-code agents:** a verified n8n node, plus guides for [Lovable](/agents/lovable/), Make, Zapier and others on the [agents page](/agents/).

We render with Chromium. On the free plan you get 50 credits a month with no credit card, files up to 15 MB and a 30-second timeout. Paid plans start at $9 a month for 500 credits, have no file size limit and allow up to 15 minutes per conversion. A credit covers 5 MB of output. The full list is on the [pricing page](/pricing/).

## 2. Nutrient DWS API

**Best for:** PDF generation plus OCR, redaction, signatures or format conversion from one vendor.

Nutrient hosts its MCP server at `https://mcp.nutrient.io/mcp`. You connect it with a Nutrient account sign-in rather than an API key, so a person does that once per client. The REST API takes an API key, and its HTML-to-PDF endpoint returns the PDF in the response.

Free output carries a "For Evaluation Purposes Only" watermark. An HTML-to-PDF call costs half a credit, so the [$75 Starter plan's 1,000 credits](https://www.nutrient.io/api/pricing/processor-api/) cover 2,000 of them.

## 3. Api2Pdf

**Best for:** pay-per-use workloads that also convert Office files.

Api2Pdf's MCP server has 11 tools, from `html_to_pdf` and `url_to_pdf` to merging and watermarking. It lives at `https://mcp.api2pdf.com/mcp` and, like ours, lists its tools without a key. It renders HTML with headless Chrome or wkhtmltopdf.

Every call returns JSON with a link to the file, and the file is deleted after 24 hours. Pricing is $1 a month, plus $0.001 per MB of bandwidth and $0.00019551 per second of compute.

## 4. PDF Generator API

**Best for:** documents built from saved templates and JSON data.

PDF Generator API's MCP server, `https://mcp.pdfgeneratorapi.com/mcp`, is mostly for managing templates and generating from them. It asks for an access token before it answers. The API also converts raw HTML and URLs, and it can answer at once or as a job you poll.

Creator, the cheapest plan, comes with 50 credits a month and 5 templates.

## 5. PDFMonkey

**Best for:** templates designed in a visual editor and filled with data.

PDFMonkey's MCP server is an npm package you run on your own machine (`npx -y pdfmonkey-mcp-server`) with your API key. It's listed in the registry as a package, not a hosted server. It can read your templates but can't create or edit them, so a person designs them first. Generation runs as a job: the MCP tool polls for up to three minutes, and the download link expires after an hour. There's an official n8n node, verified by n8n.

The free plan can't load outside images, fonts, CSS or JavaScript.

## 6. APITemplate.io

**Best for:** template-driven PDFs and images through Zapier, Make or n8n.

APITemplate.io takes JSON for a saved template, raw HTML or a URL, and returns a download URL, at once or by webhook. The free plan includes 3 templates, and [PDF Basic drops to $19 a month billed yearly](https://apitemplate.io/pricing/).

## 7. DocRaptor

**Best for:** print layouts: books, paged reports and CSS for paged media.

DocRaptor renders with Prince, not a browser. Anything past 60 seconds has to go async, up to 600 seconds, and is polled or sent to a callback URL.

## 8. Adobe PDF Services

**Best for:** companies already on Adobe that need its wider PDF toolkit.

Adobe's API creates PDFs from HTML, Office files and images. For static HTML, the input is a zip file with an `index.html` at the top and its images and CSS next to it. The flow is upload, submit a job, then fetch the result: three calls where PDFShift takes one.

::guide-figure{caption="Requests an agent makes for one PDF from static HTML. From each API's docs, November 6, 2026."}
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="agents-flow-title agents-flow-desc" style="max-width:560px;min-width:460px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="agents-flow-title">One request with PDFShift, three with Adobe PDF Services</title>
<desc id="agents-flow-desc">PDFShift: the agent sends one POST to /v3/convert/pdf with the HTML and gets the PDF back. Adobe PDF Services: the agent uploads a zip of the HTML, submits a job, then fetches the job result to get the PDF.</desc>
<g font-size="14" fill="#0A0C3D" font-weight="500">
<text x="0" y="22">PDFShift: 1 request</text>
<text x="0" y="122">Adobe PDF Services: 3 requests</text>
</g>
<g fill="rgba(108, 71, 255, 0.1)" stroke="#6C47FF">
<rect x="0" y="36" width="250" height="44" rx="8"/>
</g>
<g fill="#FFFFFF" stroke="#4C556D">
<rect x="0" y="136" width="140" height="44" rx="8"/>
<rect x="170" y="136" width="140" height="44" rx="8"/>
<rect x="340" y="136" width="140" height="44" rx="8"/>
</g>
<g fill="#0A0C3D" stroke="none">
<rect x="500" y="36" width="60" height="44" rx="8"/>
<rect x="500" y="136" width="60" height="44" rx="8"/>
</g>
<g font-size="13" fill="#0A0C3D" text-anchor="middle">
<text x="125" y="63">POST /v3/convert/pdf</text>
<text x="70" y="163">Upload a zip</text>
<text x="240" y="163">Submit a job</text>
<text x="410" y="163">Fetch the result</text>
</g>
<g font-size="13" fill="#FFFFFF" font-weight="500" text-anchor="middle">
<text x="530" y="63">PDF</text>
<text x="530" y="163">PDF</text>
</g>
<g stroke="#4C556D" fill="none">
<line x1="256" y1="58" x2="492" y2="58"/>
<line x1="144" y1="158" x2="164" y2="158"/>
<line x1="314" y1="158" x2="334" y2="158"/>
<line x1="484" y1="158" x2="494" y2="158"/>
</g>
<g fill="#4C556D">
<polygon points="494,58 486,54 486,62"/>
<polygon points="166,158 160,154 160,162"/>
<polygon points="336,158 330,154 330,162"/>
<polygon points="496,158 490,154 490,162"/>
</g>
</svg>
::

## 9. Gotenberg

**Best for:** teams that want to host the converter in their own network.

Gotenberg is an open-source Docker image: headless Chromium for HTML, URLs and Markdown, and LibreOffice for Office files. You post files as a form and get the PDF back. It costs nothing to license, and you run, scale and patch the container, its browser and its fonts yourself.

You can also hand an agent a browser of its own. Playwright's MCP server saves PDFs only when started with `--caps=pdf`, and writes the file on the machine it runs on. The reference Puppeteer MCP server is archived and has no PDF tool. If you go that way, our guide to [running Puppeteer's page.pdf() in production](/guides/puppeteer-pdf-in-production/) covers the memory and timeout traps.

## How did we pick these nine?

We started from the tools AI assistants name most often when asked which PDF API to give an agent: Nutrient, DocRaptor, PDFMonkey, APITemplate.io, Adobe PDF Services and PDF Generator API. We added Api2Pdf and Gotenberg because they come up in the same answers. Prince is covered under DocRaptor, which runs it. We left out CraftMyPDF and Orshot, which are template editors first.

On November 6, 2026, we looked for each vendor in the MCP Registry, sent each hosted MCP server an `initialize` request without a key, and requested each `llms.txt`. Everything else is from the vendor's own docs and pricing pages.

## Try it with your agent

In Claude Code it's one command, in the syntax from [Anthropic's Claude Code MCP docs](https://code.claude.com/docs/en/mcp):

```bash
claude mcp add --transport http pdfshift https://api.pdfshift.io/mcp \
  --header "X-API-Key: YOUR_PDFSHIFT_API_KEY"
```

Then ask it for a PDF of a page you're working on. The config for Cursor, Claude Desktop and other clients is on the [MCP setup page](/agents/mcp/). [Get a free API key](/register/) and see how your agent gets on.
