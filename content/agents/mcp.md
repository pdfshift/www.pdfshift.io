---
title: "PDFShift MCP Server - PDFs for AI Agents"
description: "Connect any Model Context Protocol client to the hosted PDFShift MCP server at https://api.pdfshift.io/mcp. Convert HTML or URLs to PDF, manage templates, and check credits from Claude, Cursor, and more."
---

# PDFShift MCP Server

The PDFShift MCP server exposes conversion, templates, credits, and logs to Claude, Cursor, and any Model Context Protocol client over a single hosted endpoint.

## Connecting your client

All clients need the same three things: the endpoint URL, the HTTP transport, and your API key sent as a header.

```
Endpoint: https://api.pdfshift.io/mcp
Transport: Streamable HTTP
Auth header: X-API-Key: YOUR_PDFSHIFT_API_KEY
```

You can send the key as `X-API-Key`. Discovery (listing tools) works without a key; running a tool requires one.

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

## Available tools

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

## Example prompts

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

## Related Resources

- [Model Context Protocol](https://modelcontextprotocol.io): Learn how MCP works and which clients support remote servers.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
