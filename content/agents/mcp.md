---
title: "PDFShift MCP Server: Generate PDFs from HTML or a URL"
description: "Claude, Cursor or any MCP client can turn HTML or a URL into a PDF with one tool call. PDFShift's MCP server is hosted and listed in the official MCP Registry."
---

# PDFShift MCP Server

PDFShift's MCP server lets Claude, Cursor or any Model Context Protocol client turn HTML or a URL into a PDF with one tool call. We host it at https://api.pdfshift.io/mcp, so there's no browser to install.

## Connect the PDF MCP server to Claude and other clients

All clients need the same three things: the endpoint URL, the HTTP transport, and your API key sent as a header.

```
Endpoint: https://api.pdfshift.io/mcp
Transport: Streamable HTTP
Auth header: X-API-Key: YOUR_PDFSHIFT_API_KEY
```

Discovery (listing tools) works without a key; running a tool requires one.

### Listed in the official MCP Registry

Search the [registry](https://registry.modelcontextprotocol.io/?q=pdfshift) for pdfshift and you'll find us as `io.github.cnicodeme/pdfshift`, pointing to the same endpoint.

### Claude Code

Add the server in one command, then restart your session:

```bash
claude mcp add --transport http pdfshift https://api.pdfshift.io/mcp \
  --header "X-API-Key: YOUR_PDFSHIFT_API_KEY"
```

### Cursor & other HTTP-native clients

Add PDFShift to your MCP configuration (for Cursor, `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "pdfshift": {
      "type": "http",
      "url": "https://api.pdfshift.io/mcp",
      "headers": {
        "X-API-Key": "YOUR_PDFSHIFT_API_KEY"
      }
    }
  }
}
```

### Claude Desktop & stdio-only clients

For clients that only speak stdio, bridge to the remote server with `mcp-remote`:

```json
{
  "mcpServers": {
    "pdfshift": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://api.pdfshift.io/mcp",
        "--header",
        "X-API-Key:YOUR_PDFSHIFT_API_KEY"
      ]
    }
  }
}
```

Restart the client afterwards so it picks up the new server.

## Tools to convert HTML or a URL to PDF, manage templates and check credits

The server exposes 11 tools. Your agent picks the right one automatically; you just describe what you want.

- **convert**: Convert an HTML document or a URL to PDF, PNG, JPEG, or WEBP. Returns a temporary download URL.
- **list_templates**: List all saved HTML templates for the account.
- **get_template**: Get the raw HTML content of a template by its slug.
- **create_template**: Create a new reusable HTML template.
- **update_template**: Update the name and/or HTML content of an existing template.
- **delete_template**: Delete a template by its slug.
- **generate_from_template**: Render a saved template to HTML, PDF, PNG, JPEG, or WEBP with template variables.
- **credits_usage**: Get current credit usage for the account (remaining, total, used).
- **pricing**: List available PDFShift plans and their pricing.
- **list_logs**: List recent conversion logs, with optional status and key filters.
- **get_log**: Get a single conversion log by its request id.

The `convert` and `generate_from_template` tools accept any documented PDFShift option (margins, headers & footers, watermarks, protection, cookies, and more) as extra parameters.

## Example prompts for PDF generation

Once connected, just ask your agent in plain language. For example:

```
"Convert https://example.com to a PDF in landscape."

"Turn this HTML into a PNG: <h1>Hello</h1>"

"Create a template called invoice, then render it to
 PDF with customer 'Acme Inc.' and total '$149.00'."

"How many PDFShift credits do I have left?"

"Show my last 10 failed conversions."
```

Conversions return a temporary download URL, valid for about 2 days. Add `sandbox` while experimenting to generate free, watermarked documents that don't consume credits.

## Which MCP servers can generate a PDF from HTML or a URL?

On November 26, 2026, a search for "pdf" in the [official MCP Registry](https://registry.modelcontextprotocol.io/?q=pdf) returned 259 servers. Most of them read, split, fill, sign or OCR PDFs you already have. 34 listings say they turn HTML or a web page into a new PDF, and 26 of those are hosted. PDFShift's is one of the 26.

Before you connect one, check four things:

| Check | Why it matters | PDFShift |
|---|---|---|
| Hosted or local | A local server runs its browser or renderer on your machine. | Hosted at api.pdfshift.io/mcp. |
| HTML and URLs | Some servers take only templates, Markdown or a URL. | `convert` takes an HTML document or a URL. |
| What comes back | A file saved on the server only helps an agent running on that machine. | A download link, valid for about 2 days. |
| Tools before a key | Your agent can see what a server does before you hand it a key. | The 11 tools list without a key; running one needs it. |

## A hosted PDF server vs Puppeteer or Playwright MCP

An agent that needs a PDF doesn't need a browser. We run Chromium on our servers, and your agent hands `convert` the HTML or URL and gets a download link back.

With a browser MCP server, the browser runs wherever that server runs. Playwright's MCP server saves a page as a PDF only when you start it with `--caps=pdf`, and its `browser_pdf_save` tool writes the file to the workspace or output folder on that machine. The reference Puppeteer MCP server is archived, and it has screenshot tools but no PDF tool.

## Related Resources

- [Model Context Protocol](https://modelcontextprotocol.io): Learn how MCP works and which clients support remote servers.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
