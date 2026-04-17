---
title: "Receive a webhook event for async PDF conversion in N8N"
description: "Learn how to use webhooks for asynchronous PDF generation in N8N. This guide shows you how to handle large documents efficiently using PDFShift's webhook feature."
language: 'N8n'
library: 'N8n'
property: 'webhook'
output: 'webhook'
related: ['convert-html-to-pdf-from-a-url', 'convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to use PDFShift's webhook feature for asynchronous PDF generation in N8N. This is ideal for large documents or high-volume processing.

## Why Use Webhooks?

Webhooks are useful when:
- Converting large or complex documents (takes > 30 seconds)
- Processing multiple PDFs in parallel
- Avoiding timeout issues in your workflow
- Building scalable document generation systems

## Setting up the Webhook Receiver

First, create a webhook endpoint in N8N to receive the completion notification:

1. Add a **Webhook** node to a new workflow
2. Set **HTTP Method** to POST
3. Copy the **Production URL** - you'll use this as your webhook URL

## Configuring PDFShift with Webhook

In your main workflow, configure the HTTP Request node:

### Authentication
- **Method**: POST
- **URL**: `https://api.pdfshift.io/v3/convert/pdf`
- **Authentication**: Basic Auth
  - Username: `api`
  - Password: Your PDFShift API key

### Request Body with Webhook

```json
{
  "source": "https://www.example.com/large-document",
  "filename": "large-document.pdf",
  "webhook": "https://your-n8n-instance.com/webhook/your-webhook-id"
}
```

## How It Works

1. Your N8N workflow sends the conversion request to PDFShift
2. PDFShift returns immediately with a response (doesn't wait for conversion)
3. PDFShift processes the PDF in the background
4. When complete, PDFShift sends a POST request to your webhook URL
5. Your webhook workflow receives the PDF and processes it

## Webhook Payload

When the PDF is ready, your webhook will receive:

```json
{
  "success": true,
  "url": "https://pdfshift.s3.amazonaws.com/...",
  "filesize": 245678,
  "filename": "large-document.pdf",
  "duration": 12.5
}
```

## Processing the Webhook Response

In your webhook workflow:

1. **Webhook** node receives the notification
2. **HTTP Request** node downloads the PDF from the URL provided
3. **Further processing** - save to storage, send email, etc.

### Example: Download PDF from Webhook

Add an HTTP Request node after your webhook:

- **Method**: GET
- **URL**: `{{ $json.url }}`
- **Response Format**: File

## Advanced: Tracking Conversions

You can pass custom data through the webhook to track which conversion completed:

```json
{
  "source": "https://www.example.com",
  "webhook": "https://your-n8n-instance.com/webhook/your-webhook-id",
  "metadata": {
    "order_id": "12345",
    "customer_email": "customer@example.com"
  }
}
```

The metadata will be included in the webhook response, allowing you to:
- Match the PDF to the original request
- Send the PDF to the right customer
- Update database records
- Trigger follow-up actions

## Error Handling

If the conversion fails, the webhook will receive:

```json
{
  "success": false,
  "error": "Error message here",
  "metadata": { "order_id": "12345" }
}
```

Use N8N's **IF** node to check the `success` field and handle errors appropriately.

## Example Complete Workflow

**Main Workflow:**
1. Schedule Trigger (daily at 9 AM)
2. Database node (fetch reports to generate)
3. Loop through each report
4. HTTP Request to PDFShift with webhook URL

**Webhook Workflow:**
1. Webhook receives completion notification
2. IF node checks if successful
3. Download PDF from provided URL
4. Upload to Google Drive
5. Send email notification

With webhooks, you can build robust, scalable document generation systems in N8N!
