---
title: "PDFShift + Make Integration"
description: "Generate PDFs automatically from your Make scenarios with PDFShift — convert raw HTML or a URL to PDF and route it anywhere Make connects."
---

# PDFShift + Make

Generate PDFs automatically from your Make scenarios with PDFShift. Convert raw HTML or an existing URL into a document, then route it anywhere Make connects.

## Step-by-Step Setup Guide

PDFShift lets you generate PDF documents automatically from your Make scenarios, using Make's **HTTP** module to call the PDFShift API.

### 1. Get your PDFShift API key

Create a PDFShift account and retrieve your API key from the [dashboard](https://app.pdfshift.io/). You'll store the key securely in Make rather than adding it directly to your scenario.

### 2. Add the HTTP module

Create or open a scenario in Make, add a new module, and select **HTTP → Make a request**. Make's HTTP module can connect to APIs that don't yet have their own native Make integration.

### 3. Add your PDFShift API key

For **Authentication type**, select `API key`, then create a new credential with:

```
Name: PDFShift

Key: YOUR_PDFSHIFT_API_KEY

API key placement: Header

API key parameter name: X-API-Key
```

Make securely stores the API key in its keychain, so you don't need to manually add `X-API-Key` to the Headers section.

### 4. Configure the PDFShift request

Configure the HTTP request as follows:

```
URL: https://api.pdfshift.io/v3/convert/pdf

Method: POST
Body content type: application/json
```

For the body input method, using a **data structure** is recommended because Make automatically escapes values such as HTML correctly. Add a field named `source` and map your HTML or URL into it. The resulting request is equivalent to:

```json
{
    "source": "<html><body><h1>Hello from Make!</h1></body></html>"
}
```

PDFShift will convert the HTML into a PDF.

### 5. Return a PDF URL

For many Make workflows, working with a URL is convenient. Add another string field named `filename` to your request:

```json
{
    "source": "<html><body><h1>Hello from Make!</h1></body></html>",
    "filename": "document.pdf"
}
```

When `filename` is provided, PDFShift stores the generated file temporarily and returns JSON instead of the PDF itself. The response contains information similar to:

```json
{
    "success": true,
    "url": "https://...",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}
```

The generated file is stored by PDFShift for two days and then automatically deleted.

### 6. Parse the response

Set **Parse response** to `Yes` and run the module once. Make will detect the PDFShift response fields, including:

```
url
filesize
duration
pdf_pages
```

You can then map the `url` value into any following module. For example:

```
Order created
      ↓
Generate HTML
      ↓
PDFShift
      ↓
PDF URL
      ↓
Send email
```

### 7. Download the PDF as a Make file

If another module requires an actual file rather than a URL, add **HTTP → Download a file** and map the `url` returned by PDFShift into the URL field. Your scenario then becomes:

```
Generate HTML
      ↓
PDFShift
      ↓
PDF URL
      ↓
HTTP: Download a file
      ↓
PDF file
      ↓
Google Drive / Email / Dropbox / S3 / etc.
```

This is useful when you want to attach the generated PDF to an email or save it permanently.

## Generate personalized PDFs

The `source` parameter can contain HTML built from data in previous Make modules. Instead of hard-coding values:

```html
<!doctype html>
<html>
<body>
    <h1>Invoice #1234</h1>

    <p>Customer: Acme Inc.</p>
    <p>Total: €149.00</p>
</body>
</html>
```

Map values from previous modules into the HTML:

```html
<h1>Invoice #{{Invoice Number}}</h1>

<p>Customer: {{Customer Name}}</p>
<p>Total: {{Total}}</p>
```

Make replaces these values on every scenario execution before sending the HTML to PDFShift, giving you completely personalized PDFs.

### Generate a PDF from a website

You don't have to generate HTML yourself. If a previous module provides a URL, map it directly into `source`:

```json
{
    "source": "https://example.com/invoices/1234",
    "filename": "invoice-1234.pdf"
}
```

PDFShift will load the webpage and convert it to PDF. For private pages, you can also use PDFShift's authentication, cookies, or custom HTTP headers options.

## Customize & Automate

You can add any supported PDFShift option to the JSON request. For example:

```json
{
    "source": "<html>...</html>",
    "filename": "invoice.pdf",
    "landscape": false,
    "use_print": true,
    "margin": "20px"
}
```

PDFShift also supports options including:

- Page size and margins
- Headers and footers
- Custom CSS
- Custom JavaScript
- Delayed rendering
- Cookies and HTTP authentication
- PDF protection
- Sandbox mode and webhooks

All of these values can be mapped dynamically from previous Make modules.

### Example: automatically generate invoices

A typical Make scenario could look like:

```
Stripe
Watch Payments
      ↓
Create HTML invoice
      ↓
HTTP
PDFShift conversion
      ↓
HTTP
Download PDF
      ↓
Google Drive
Upload PDF
      ↓
Gmail
Send invoice
```

Every new payment can automatically generate and send its own personalized PDF invoice.

### Example: generate reports from Airtable

Another workflow could be:

```
Airtable
Watch Records
      ↓
Generate HTML report
      ↓
PDFShift
Generate PDF
      ↓
Download PDF
      ↓
Upload to storage
      ↓
Update Airtable record
with PDF URL
```

The same principle works with Notion, Google Sheets, CRMs, databases, webhooks, or any other Make integration.

### PDF URLs are temporary

When you use the `filename` parameter, the generated document is stored by PDFShift and its URL remains available for two days. To keep it permanently, add a module to download and save it to your own storage. If you don't want PDFShift to store the document at all, omit `filename` and PDFShift returns the PDF directly.

## Related Resources

- [Make HTTP Module](https://apps.make.com/http) - Learn how Make's HTTP module connects to any API without a native integration.
- [PDFShift API Doc](https://docs.pdfshift.io) - Complete API reference with every parameter, option, and example.
