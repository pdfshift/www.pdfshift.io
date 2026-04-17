---
title: "Convert HTML to PDF from raw HTML in N8N"
description: "Learn how to convert raw HTML strings to PDF using N8N workflows. This guide shows you how to generate PDFs from dynamic HTML content using the PDFShift API."
language: 'N8n'
library: 'N8n'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to convert raw HTML strings to PDFs using PDFShift's API in your N8N workflows. This is particularly useful when you need to generate PDFs from dynamic content.

## Setting up the HTTP Request Node

1. Add an **HTTP Request** node to your N8N workflow
2. Configure it with the following settings:

### Authentication
- **Method**: POST
- **URL**: `https://api.pdfshift.io/v3/convert/pdf`
- **Authentication**: Basic Auth
  - Username: `api`
  - Password: Your PDFShift API key (get one at https://pdfshift.io)

### Request Body
Set the body content type to **JSON** and add your HTML string:

```json
{
  "source": "<html><body><h1>Hello World</h1><p>This is a dynamically generated PDF!</p></body></html>",
  "filename": "generated-document.pdf"
}
```

### Response Format
- Set **Response Format** to **File** to receive the PDF as binary data

## Using Dynamic HTML Content

You can use N8N's template system to insert dynamic data from previous nodes:

```json
{
  "source": "<html><body><h1>Invoice for {{ $json.customer_name }}</h1><p>Total: ${{ $json.total }}</p></body></html>",
  "filename": "invoice-{{ $json.invoice_id }}.pdf"
}
```

## Advanced HTML Features

PDFShift supports full CSS and modern HTML features:

```json
{
  "source": "<html><head><style>body { font-family: Arial; } .header { background: #4A90E2; color: white; padding: 20px; }</style></head><body><div class='header'><h1>Professional Report</h1></div><p>Report content here...</p></body></html>"
}
```

## Example Use Cases

1. **Invoice Generation**: Create invoices from order data
2. **Reports**: Generate reports from database queries
3. **Certificates**: Create personalized certificates
4. **Receipts**: Generate purchase receipts automatically

## Tips for HTML Templates

- Use inline CSS or `<style>` tags for styling
- Keep HTML structure clean and valid
- Test your HTML template in a browser first
- Use N8N's expression editor for dynamic values

With this setup, you can generate custom PDFs from any HTML content in your N8N workflows!
