---
title: "PDFShift + Zapier Integration"
description: "Generate PDFs automatically inside your Zapier workflows with PDFShift — convert HTML, dynamic Zap data, or webpages to PDF and route them anywhere."
---

# PDFShift + Zapier

Generate PDF documents automatically inside your Zapier workflows with PDFShift. Convert raw HTML, dynamic Zap data, or an existing webpage into a PDF and route it anywhere Zapier connects.

## Step-by-Step Setup Guide

PDFShift accepts either raw HTML or a URL and converts it into a PDF. You'll wire it into Zapier using the **API by Zapier** app.

### 1. Get your PDFShift API key

Create a PDFShift account and retrieve your API key from the [dashboard](https://app.pdfshift.io/). PDFShift authenticates requests using:

```
X-API-Key: YOUR_PDFSHIFT_API_KEY
```

Your API key should be kept private and never stored directly inside normal Zap fields.

### 2. Create an API by Zapier connection

In Zapier, go to **Apps → Add connection** and search for `API by Zapier`. Choose:

```
Static Headers (API key)
```

For the authentication header, enter:

```
X-API-Key: YOUR_PDFSHIFT_API_KEY
```

For the domain filter, use:

```
api.pdfshift.io
```

You can optionally test the connection with:

```
https://api.pdfshift.io/v3/credits/usage
```

Once created, Zapier stores your PDFShift API key separately from your Zap and adds it automatically to PDFShift requests.

### 3. Add PDFShift to your Zap

Create or open a Zap, add an **Action**, and select `API by Zapier`, then choose:

```
API by Zapier → API Request
```

Select the PDFShift connection you created previously.

### 4. Configure the PDF conversion

Set:

```
Method: POST
URL: https://api.pdfshift.io/v3/convert/pdf
```

Then provide a JSON body such as:

```json
{
    "source": "<html><body><h1>Hello from Zapier!</h1></body></html>",
    "filename": "zapier-document"
}
```

You don't need to add the `X-API-Key` header manually because Zapier adds it from your connection. When the request body is valid JSON, Zapier automatically sends it as JSON.

### 5. Test the PDF generation

Run the Zapier action. Because the request contains `filename`, PDFShift returns JSON with a URL to the generated document instead of the PDF binary, and you can use that URL in subsequent Zap steps. Your workflow might look like:

```
New order
    ↓
Create HTML
    ↓
PDFShift: Generate PDF
    ↓
PDF URL
    ↓
Send Email
```

### 6. Use data from previous Zap steps

Your HTML can contain dynamic information from any previous Zap step. For example, if a Stripe payment triggered the Zap, your HTML could contain:

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
    <p>Total: $149.00</p>
</body>
</html>
```

Instead of hard-coding those values, use Zapier's field picker to insert values from previous steps:

```
Invoice # [Stripe → Invoice Number]

Customer: [Stripe → Customer Name]

Total: [Stripe → Amount]
```

Zapier inserts the values before sending the HTML to PDFShift, so every Zap execution generates its own personalized PDF.

### 7. Attach the generated PDF to an email

Many Zapier actions that accept files can use a downloadable file URL. After PDFShift generates the document, map the returned `url` into the attachment field of your email action:

```
Stripe
Payment received
      ↓
PDFShift
Generate invoice
      ↓
Gmail
Send email
Attachment: PDFShift URL
```

Zapier will retrieve the document from the URL when the following action expects a file.

### 8. Save the PDF to cloud storage

You can also send the generated URL to storage applications such as:

```
Google Drive
Dropbox
OneDrive
Amazon S3
```

A typical workflow is:

```
Form submitted
      ↓
Generate HTML
      ↓
PDFShift Generate PDF
      ↓
Google Drive: Upload PDF
      ↓
Gmail: Send confirmation
```

Saving the document elsewhere is particularly useful because PDFShift's temporary URL is automatically removed after two days.

## Generate a PDF from a webpage

PDFShift can also convert an existing webpage. Instead of providing HTML, provide the page URL as `source`:

```json
{
    "source": "https://example.com/report/1234",
    "filename": "customer-report"
}
```

PDFShift loads the page and generates the PDF. This is useful when a previous Zap step provides a page URL, such as:

```
WordPress post
Customer portal page
Invoice URL
Report URL
Order summary
```

## Customize the generated PDF

You can add any supported PDFShift parameters to the JSON body. For example:

```json
{
    "source": "<html>...</html>",
    "filename": "customer-report",
    "landscape": true,
    "use_print": true,
    "delay": 1000
}
```

PDFShift supports options including:

- Page formats and margins
- Landscape mode
- Print CSS and custom CSS
- Headers and footers
- Custom JavaScript
- Delayed rendering
- Cookies, HTTP headers, and authentication
- Sandbox conversions and webhooks

Values can also come dynamically from previous Zap steps.

## Example Workflows

### Generate an invoice after a Stripe payment

A Zap could look like:

```
Stripe
New Payment
      ↓
Formatter / Template
Create invoice HTML
      ↓
PDFShift
Generate PDF
      ↓
Google Drive
Store invoice
      ↓
Gmail
Email invoice to customer
```

Every successful Stripe payment automatically generates its own PDF invoice.

### Turn form responses into PDF reports

You could also create:

```
Typeform
New Response
      ↓
OpenAI
Generate report content
      ↓
PDFShift
Generate PDF
      ↓
Google Drive
Upload PDF
      ↓
Slack
Notify team
```

This works with any Zapier trigger that provides data you can include in HTML.

### PDF URLs are temporary

When `filename` is provided, PDFShift temporarily stores the generated document and returns a downloadable URL that is automatically deleted after two days. For permanent storage, use another Zapier action to copy the PDF into Google Drive, Dropbox, S3, or another service. If you don't want PDFShift to store the document at all, omit `filename` and PDFShift returns the PDF directly.

## Native PDFShift integration

For an even simpler experience, PDFShift can be used as a native Zapier integration. Users would install **PDFShift**, connect their API key once, and then use actions such as:

```
PDFShift
├── Generate PDF
├── Generate PNG
├── Generate JPEG
└── List Recent Conversions
```

The main action could expose friendly fields such as:

- HTML or URL
- Filename
- Page format
- Landscape
- Margins
- Use print CSS
- Header
- Footer
- Delay
- Sandbox

Instead of configuring an API request, users could simply select:

```
PDFShift → Generate PDF
```

and map data from previous Zap steps into the fields.

## Related Resources

- [API by Zapier](https://help.zapier.com/hc/en-us/sections/44386003111693-API): Learn how the API by Zapier app calls external services from your Zaps.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
