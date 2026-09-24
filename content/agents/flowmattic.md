---
title: "PDFShift + FlowMattic Integration"
description: "Generate PDFs from HTML or webpages inside your FlowMattic workflows with PDFShift — use the API Module or build a reusable Custom App."
---

# PDFShift + FlowMattic

Generate PDFs from HTML or webpages directly inside your FlowMattic workflows with PDFShift. Connect it in minutes with the API Module, or build a reusable Custom App.

## Option 1: Use the API Module

This is the quickest way to get started. FlowMattic's API module can send POST requests to any external REST API, including PDFShift.

### 1. Get your PDFShift API key

Create a PDFShift account and copy your API key from the [dashboard](https://app.pdfshift.io/). PDFShift authenticates requests using the HTTP header:

```
X-API-Key: YOUR_API_KEY
```

[Register for Free](/register)

### 2. Add an API action to FlowMattic

Open your FlowMattic workflow, add a new action, and select:

```
API → POST
```

Set the endpoint to:

```
https://api.pdfshift.io/v3/convert/pdf
```

### 3. Configure the headers

Add:

```
X-API-Key: YOUR_PDFSHIFT_API_KEY
Content-Type: application/json
```

Your PDFShift API key should be treated as a secret and never exposed to visitors on your WordPress site.

### 4. Configure the request body

PDFShift requires a `source`, which can contain either HTML or a URL. For example:

```json
{
    "source": "<html><body><h1>Hello from FlowMattic!</h1></body></html>",
    "filename": "flowmattic-document"
}
```

Using `filename` tells PDFShift to temporarily store the generated document and return a JSON response containing its URL instead of the raw PDF binary, which makes the response particularly easy to use in FlowMattic.

### 5. Use dynamic FlowMattic data

The HTML doesn't need to be static. Map values from previous workflow steps into your HTML. For example, a WooCommerce workflow could generate:

```html
<!doctype html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
        }
    </style>
</head>

<body>
    <h1>Order #1234</h1>

    <p>Customer: Jane Doe</p>
    <p>Total: $149.00</p>
</body>
</html>
```

The order number, customer name, total, products, address, and other information can all come from previous FlowMattic steps. Your workflow might look like:

```
WooCommerce: New Order
    ↓
Prepare HTML
    ↓
PDFShift Generate PDF
    ↓
PDF URL
    ↓
Email / Google Drive / WordPress / CRM
```

### 6. Get the generated PDF URL

When `filename` is supplied, PDFShift returns JSON containing information about the conversion, including a URL for the generated document. Map the returned `url` field into subsequent FlowMattic actions:

```
PDFShift
    ↓
Generated PDF URL
    ↓
Send Email (or save to Google Drive)
```

PDFShift keeps files generated using `filename` for two days before automatically deleting them. If the document must remain available permanently, copy it to your own storage.

### Generate a PDF from a webpage

PDFShift can also convert an existing webpage. Instead of passing HTML, simply pass its URL:

```json
{
    "source": "https://example.com/report/1234",
    "filename": "customer-report"
}
```

PDFShift will load the page and convert it to PDF. This is useful for workflows involving WordPress posts, WooCommerce pages, reports, dashboards, or other dynamically generated webpages.

### Customize the PDF

You can add PDFShift options directly to the JSON payload. For example:

```json
{
    "source": "<html>...</html>",
    "filename": "customer-report",
    "landscape": true,
    "use_print": true,
    "delay": 1000
}
```

PDFShift also supports options such as page formats, margins, headers and footers, custom CSS, JavaScript, watermarks, cookies, HTTP headers, authentication, delayed rendering, webhooks, and sandbox conversions. These values can also be populated dynamically from previous FlowMattic workflow steps.

## Option 2: Create a Custom App

If you use PDFShift frequently, a FlowMattic Custom App gives you a cleaner integration. Instead of configuring an API request each time, PDFShift appears as its own app inside the workflow builder. Custom Apps support REST APIs and API-key authentication.

Create an app named `PDFShift` and configure authentication as:

```
Type: API Key

Header: X-API-Key
```

Then create a `Generate PDF` action using:

```
POST https://api.pdfshift.io/v3/convert/pdf
```

The action can expose fields such as:

- Source
- Filename
- Landscape
- Use print CSS
- Delay
- Page format
- Margin
- Header
- Footer
- Sandbox

The workflow editor can then display:

```
PDFShift → Generate PDF
```

rather than requiring users to manually configure an HTTP request.

### Import PDFShift's OpenAPI specification

FlowMattic can also generate Custom Apps from OpenAPI specifications. PDFShift provides one, so you can import it instead of defining every endpoint manually:

```
https://api.pdfshift.io/openapi.json
```

This can give you actions such as:

```
PDFShift
├── Generate PDF
├── Generate PNG
├── Generate JPEG
└── List Recent Conversions
```

After importing the specification, review the generated actions and keep only the endpoints and parameters you want to expose. For most users, starting with just **Generate PDF** is sufficient.

## Example Workflows

### Generate a WooCommerce invoice

A simple FlowMattic workflow could be:

```
WooCommerce: Order Created
      ↓
Build invoice HTML
      ↓
PDFShift: Generate PDF
      ↓
Email: Send invoice to customer
```

The invoice HTML can include dynamic WooCommerce values such as:

- Order number
- Customer
- Billing address
- Products
- Quantity
- Price
- Taxes
- Total

Every WooCommerce order can therefore generate its own PDF automatically.

### Turn form submissions into PDFs

You can also use PDFShift with Gravity Forms, Fluent Forms, Elementor Forms, Contact Form 7, or other form integrations. For example:

```
Gravity Forms
Form Submitted
      ↓
Create HTML report
      ↓
PDFShift Generate PDF
      ↓
Google Drive
Save document
      ↓
Email: Send PDF link
```

Each form submission produces its own personalized PDF.

### PDF URLs are temporary

When using the `filename` parameter, PDFShift temporarily stores the generated document and returns a URL that is automatically deleted after two days. For permanent storage, save the document to WordPress, Google Drive, Amazon S3, or another service as part of your FlowMattic workflow. If you don't want PDFShift to store the document at all, omit `filename` and PDFShift returns the PDF directly.

## Related Resources

- [FlowMattic](https://support.flowmattic.com/) — Learn how FlowMattic connects your WordPress workflows to external APIs.
- [PDFShift API Doc](https://docs.pdfshift.io) — Complete API reference with every parameter, option, and example.
