---
title: "PDFShift + Clay Integration"
description: "Generate a PDF for every row in your Clay tables with the PDFShift HTTP API enrichment — reports, proposals, invoices, and more."
---

# PDFShift + Clay

Generate a PDF for every row in your Clay tables with PDFShift's HTTP API enrichment. Turn reports, proposals, invoices, and more into documents, straight from your data.

## Step-by-Step Setup Guide

PDFShift lets you generate PDF documents directly from your Clay tables. Each row can generate its own PDF using data from that row, wired up through Clay's **HTTP API** enrichment.

### 1. Get your PDFShift API key

Create a PDFShift account and retrieve your API key from the [dashboard](https://app.pdfshift.io/). You'll add this key securely to Clay rather than putting it directly inside your HTTP request.

### 2. Add an HTTP API enrichment

In your Clay table:

1. Click **Add enrichment**.
2. Search for **HTTP API**.
3. Select **HTTP API**.

Clay's HTTP API integration can connect to any service that exposes an HTTP API, including PDFShift.

### 3. Add your PDFShift API key

In the HTTP API configuration, open **Select header account** and click **Add account**. Add the following header:

```
X-API-Key: YOUR_PDFSHIFT_API_KEY
```

Give the connection a name such as:

```
PDFShift
```

Clay stores the credentials at the workspace level, so your API key never appears directly in the table configuration.

### 4. Configure the PDFShift request

Configure the HTTP API enrichment with:

```
Method: POST

Endpoint:
api.pdfshift.io/v3/convert/pdf
```

PDFShift accepts either a URL or raw HTML through the `source` property. If your Clay table has a column named **HTML**, use a JSON body similar to:

```json
{
    "source": "/HTML",
    "filename": "document.pdf"
}
```

When editing the request in Clay, select your **HTML** column using Clay's column picker rather than typing the column reference manually.

The `filename` option matters here. Without it, PDFShift returns the PDF as binary data. With `filename`, PDFShift stores the generated document temporarily and returns a JSON response containing the PDF URL instead, which is much easier to work with in Clay.

### 5. Store the generated PDF URL

A successful PDFShift response contains information similar to:

```json
{
    "success": true,
    "url": "PDF_URL",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}
```

In Clay's **Field paths to return** setting, select:

```
url
```

Clay will then create a column containing the generated PDF URL for every row. Your workflow becomes:

```
Clay row
   ↓
HTML or URL
   ↓
PDFShift
   ↓
PDF generated
   ↓
PDF URL added to Clay
```

## Generate personalized PDFs

The HTML sent to PDFShift can contain any information from your Clay table. Create an HTML column that assembles the document, for example:

```html
<!doctype html>
<html>
<body>
    <h1>Company Report</h1>

    <h2>Acme Inc.</h2>

    <p>Industry: SaaS</p>
    <p>Employees: 125</p>

    <p>
        This report was automatically generated
        using Clay and PDFShift.
    </p>
</body>
</html>
```

Use Clay formulas or AI columns to generate this HTML dynamically for every row, and PDFShift converts each version into its own PDF.

### Generate PDFs from URLs

PDFShift can also convert an existing web page. If your Clay table contains a column named **Website**, your request can simply use that URL:

```json
{
    "source": "/Website",
    "filename": "website.pdf"
}
```

PDFShift will load the page and return its PDF version.

### Use Clay AI to configure PDFShift

Clay's HTTP API integration includes an AI-assisted configuration mode. You can ask it something similar to:

```
Configure an API call to PDFShift that converts the HTML
from my HTML column into a PDF.

Send a POST request to the PDFShift PDF conversion endpoint.

Authenticate using the X-API-Key header from my
PDFShift connection.

Send the HTML column as the "source" parameter and use
"document.pdf" as the filename.

Return the "url" property from the JSON response.
```

Review the generated configuration and test it on one row before running it across the entire table.

## Customize & Automate

You can pass additional PDFShift parameters in the request body. For example:

```json
{
    "source": "/HTML",
    "filename": "document.pdf",
    "landscape": true,
    "use_print": true
}
```

PDFShift also supports features such as:

- Custom page formats
- Margins
- Headers and footers
- Custom CSS
- Custom JavaScript
- Delayed rendering
- Authentication and cookies
- Webhooks

These parameters can also be populated dynamically from Clay columns.

### Automatically generate PDFs for new rows

Once your HTTP API enrichment works correctly, enable Clay's **Auto-update** option. Clay can then automatically call PDFShift whenever the input data for a row changes.

Use **Only run if** to control which rows should generate a PDF, which prevents unnecessary conversions. For example, generate the PDF only when:

```
Status = Ready
```

### PDF URLs are temporary

When using the `filename` parameter, PDFShift stores the generated PDF temporarily and returns its URL. The file is automatically deleted after two days. If the PDF needs to remain available permanently, download it or copy it to your own storage as part of your workflow.

## Related Resources

- [Clay HTTP API](https://www.clay.com): Learn how Clay's HTTP API enrichment connects to any external service.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
