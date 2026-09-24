---
title: "PDFShift + Bubble Integration"
description: "Generate PDFs directly from your Bubble app with PDFShift. Turn dynamic Bubble data or an existing page into invoices, reports, and more through the API Connector."
---

# PDFShift + Bubble

Generate PDFs directly from your Bubble application with PDFShift. Turn dynamic Bubble data or an existing page into invoices, reports, certificates, and more, all through the API Connector.

## Step-by-Step Setup Guide

PDFShift lets you turn dynamic Bubble data into invoices, reports, certificates, contracts, or receipts. It can convert either raw HTML or an existing webpage URL, wired up through Bubble's **API Connector**.

### 1. Get your PDFShift API key

Create a PDFShift account and retrieve your API key from the [dashboard](https://app.pdfshift.io/). Your key should remain private and never be exposed in a page, workflow parameter, Option Set, or client-side JavaScript. Bubble's API Connector supports private API keys stored on Bubble's servers.

### 2. Open the API Connector

In your Bubble application, open the **API Connector** section, create a new API named `PDFShift`, and for authentication select:

```
Private key in header
```

Configure the key as:

```
Key name: X-API-Key
Key value: YOUR_PDFSHIFT_API_KEY
```

Bubble stores private API keys securely and sends the request through its servers.

### 3. Create the PDF conversion call

Add a new API call named `Generate PDF` and configure it with:

```
Use as: Action

Method: POST
URL: https://api.pdfshift.io/v3/convert/pdf
```

Add this header:

```
Content-Type: application/json
```

Then use the following JSON body:

```json
{
    "source": "<source>",
    "filename": "bubble-document"
}
```

Bubble recognizes values surrounded with `<` and `>` as dynamic parameters. Make sure the `source` parameter is **not** marked private, because you'll provide its value dynamically from your Bubble workflows.

### 4. Initialize the call

Give `source` a temporary value such as:

```html
<html>
    <body>
        <h1>Hello from Bubble!</h1>
    </body>
</html>
```

Then click **Initialize call**. This sends a test request to PDFShift and lets Bubble discover the structure of the response. Because we supplied `filename`, PDFShift returns JSON instead of the PDF binary:

```json
{
    "success": true,
    "url": "https://...",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}
```

The `url` points to the generated PDF. PDFShift keeps files generated this way for two days and then automatically deletes them.

### 5. Generate a PDF from a Bubble workflow

You can now use PDFShift from any Bubble workflow. For example, create a `Download invoice` button, then add a workflow action:

```
Plugins → PDFShift - Generate PDF
```

For the `source` parameter, provide the HTML you want PDFShift to convert. For example:

```html
<!doctype html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
        }

        h1 {
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <h1>Invoice #1234</h1>

    <p>Customer: Acme Inc.</p>
    <p>Total: €149.00</p>
</body>
</html>
```

In a real Bubble application, these values can come from dynamic Bubble data. Your HTML could contain the equivalent of:

```html
<h1>Invoice #Current Invoice's Number</h1>

<p>
    Customer: Current Invoice's Customer's Name
</p>

<p>
    Total: Current Invoice's Total
</p>
```

Bubble builds the final HTML before sending it to PDFShift.

### 6. Let the user download the PDF

The `Generate PDF` action returns a `url`. In the next workflow action, use:

```
Navigation → Open an external website
```

and use:

```
Result of step 1's url
```

The browser will open the generated PDF. You can also display the URL in your application, email it to the user, or store it in your database.

### 7. Save the PDF permanently in Bubble

PDFShift URLs generated using `filename` remain available for two days. To keep a PDF permanently, save it into Bubble's own file storage. When assigning the PDF URL to a field of type **file**, use Bubble's:

```
:saved to Bubble Storage
```

operator. For example:

```
Result of step 1's url :saved to Bubble Storage
```

Bubble will download the external file and store its own copy. Bubble supports saving files from external APIs this way, with a maximum file size of 50 MB for the `:saved to Bubble Storage` operator. Your workflow can therefore look like:

```
User clicks "Generate invoice"
          ↓
Bubble builds HTML
          ↓
PDFShift generates PDF
          ↓
PDFShift returns URL
          ↓
Bubble saves PDF to Bubble Storage
          ↓
Invoice's PDF field is updated
```

## Generate a PDF from a Bubble page

PDFShift can also generate PDFs from URLs. Instead of sending HTML, set `source` to the URL of the page:

```json
{
    "source": "https://myapp.com/report/1234",
    "filename": "bubble-report"
}
```

PDFShift will load the webpage and convert it to PDF. This is useful when the document already exists as a Bubble page. For pages that require authentication or aren't publicly accessible, sending the HTML directly is usually easier, though PDFShift also supports HTTP headers, cookies, and HTTP authentication when you need to convert protected URLs.

## Customize the generated PDF

You can add additional PDFShift options to your API Connector request. For example:

```json
{
    "source": "<source>",
    "filename": "bubble-document",
    "landscape": false,
    "use_print": true,
    "margin": "20px"
}
```

You can make any of these values dynamic by turning them into Bubble parameters:

```json
{
    "source": "<source>",
    "filename": "<filename>",
    "landscape": <landscape>
}
```

This lets you control PDFShift from your Bubble workflows. PDFShift also supports page formats, margins, headers and footers, custom CSS, custom JavaScript, delayed rendering, cookies, authentication, PDF protection, and webhooks.

## Turn it into a Bubble plugin

Once the API Connector version works, you can turn it into a reusable Bubble plugin. Bubble's Plugin Editor supports API connections directly, so the PDFShift plugin can expose actions such as:

```
Generate PDF
Generate PNG
Generate JPEG
Get recent conversions
```

Users would install **PDFShift** from the Bubble Marketplace, enter their PDFShift API key once, and then see actions such as:

```
Plugins → PDFShift - Generate PDF
```

in their Bubble workflows. Bubble's documentation also supports converting an existing API Connector setup into a plugin, making it practical to build and test the integration in a normal Bubble application first.

### PDF URLs are temporary

When you use the `filename` parameter, the generated document is stored by PDFShift and its URL remains available for two days. To keep it permanently, save it to Bubble Storage as shown above. If you don't want PDFShift to store the document at all, omit `filename` and PDFShift returns the PDF directly instead.

## Related Resources

- [Bubble API Connector](https://manual.bubble.io): Learn how Bubble's API Connector calls external APIs securely.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
