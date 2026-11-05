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

## A hosted PDF server vs Puppeteer or Playwright MCP

An agent that needs a PDF doesn't need a browser. We run Chromium on our servers, and your agent hands `convert` the HTML or URL and gets a download link back.

With a browser MCP server, the browser runs wherever that server runs. Playwright's MCP server saves a page as a PDF only when you start it with `--caps=pdf`, and its `browser_pdf_save` tool writes the file to the workspace or output folder on that machine. The reference Puppeteer MCP server is archived, and it has screenshot tools but no PDF tool.

## Related Resources

- [Model Context Protocol](https://modelcontextprotocol.io): Learn how MCP works and which clients support remote servers.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
