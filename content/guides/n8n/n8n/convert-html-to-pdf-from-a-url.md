---
title: "Convert an HTML document to PDF from a URL in N8N"
description: "Learn how to easily convert HTML documents to PDF from a URL using N8N workflows. This how-to guide offers clear instructions on how to implement this using the PDFShift API."
language: 'N8n'
library: 'N8n'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'receive-a-webhook-event']
default: true
---

In this guide, we'll show you how to convert HTML documents from URLs to PDFs using PDFShift's API in your N8N workflows.

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
Set the body content type to **JSON** and add:

```json
{
  "source": "https://www.example.com"
}
```

### Response Format
- Set **Response Format** to **File** to receive the PDF as binary data

## Handling the Output

The HTTP Request node will output the PDF as binary data. You can then:

1. **Save to file**: Use the "Write Binary File" node
2. **Upload to cloud**: Connect to Google Drive, Dropbox, or S3 nodes
3. **Send via email**: Use the Email node with the PDF as attachment
4. **Return via webhook**: Use the Respond to Webhook node

## Example Workflow

A complete workflow might look like:
1. **Webhook Trigger** - Receives a URL parameter
2. **HTTP Request** - Converts the URL to PDF using PDFShift
3. **Google Drive** - Uploads the PDF to a folder
4. **Email** - Sends notification with PDF attachment

With this setup, you can effortlessly convert HTML documents from URLs to PDF files in your N8N workflows. Happy automating!
