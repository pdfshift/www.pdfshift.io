---
title: "PDFShift + Base44 Integration"
description: "Add PDF generation to your Base44 app with PDFShift. Connect it from the OpenAPI spec or a backend function, and keep your API key secure on the server."
---

# PDFShift + Base44

Generate invoices, reports, certificates, and receipts from your Base44 app. Connect PDFShift through its OpenAPI specification - or a backend function - while keeping your API key safely on the server.

## Option 1: Add PDFShift as a Base44 integration

This is the easiest way to make PDFShift available to your Base44 applications.

### 1. Get your PDFShift API key

Create a PDFShift account and get your API key. Keep it private and never add it directly to your frontend code.

[Register for Free](/register)

### 2. Add PDFShift to Base44

Click your workspace name, then open **Settings → Integrations → New Integration** and choose **From URL**. Point it at PDFShift's OpenAPI specification:

```text
https://api.pdfshift.io/openapi.json
```

Base44 reads the specification and lists the PDFShift API endpoints available to your applications.

### 3. Select the PDF conversion endpoint

For PDF generation, enable:

```text
POST /convert/pdf
```

You can optionally enable the image conversion endpoints too:

```text
POST /convert/png
POST /convert/jpeg
POST /convert/webp
```

### 4. Configure authentication

Configure the integration with:

```text
Slug: pdfshift
Name: PDFShift
Base URL: https://api.pdfshift.io/v3
```

Then add the following custom header:

```text
X-API-Key: YOUR_PDFSHIFT_API_KEY
```

Base44 stores sensitive headers securely and does not expose your PDFShift API key to visitors using your application.

## Generate PDFs

### Ask Base44

With the integration in place, you can ask Base44 to use PDFShift directly. For example:

```text
Add an "Export as PDF" button to this page.

Use the PDFShift integration to generate the PDF.

Generate an HTML document containing the information currently displayed on the page.

Call:

POST /convert/pdf

with:

{
    "source": "<the generated HTML>",
    "filename": "document-export"
}

When PDFShift returns the result, download the file from the returned "url".
```

Base44 then generates the necessary frontend logic for you.

### Calling PDFShift from code

If you're editing your Base44 application code directly, the equivalent call looks like this:

```js
const response = await base44.integrations.custom.call(
    'pdfshift',
    'post:/convert/pdf',
    {
        payload: {
            source: html,
            filename: 'document-export'
        }
    }
);

const pdfUrl = response.data.url;
```

You can then open the resulting URL or provide it as a download link to the user.

## Why do we use `filename`?

By default, PDFShift returns the generated PDF directly as binary data. Base44 custom integrations are designed around JSON responses, so passing `filename` is particularly convenient. When it's provided, PDFShift returns JSON like:

```json
{
    "success": true,
    "url": "...",
    "filesize": 259972,
    "pdf_pages": 5
}
```

The `url` points to the generated PDF. PDFShift keeps this temporary file for 2 days and then automatically deletes it.

## Option 2: Route through a backend function

If you don't want PDFShift to temporarily store the generated document - for example when it contains sensitive data - use a Base44 backend function instead. This lets PDFShift return the PDF directly as binary data. Ask Base44:

```text
Integrate PDFShift using a server-side backend function called "generate-pdf".

Ask me to configure a secret called PDFSHIFT_API_KEY.

The function must:

1. Accept an HTML string in a "source" parameter.
2. POST it to the PDFShift API at /v3/convert/pdf.
3. Send PDFSHIFT_API_KEY using the X-API-Key header.
4. Do not provide "filename" or "webhook".
5. Receive the PDF directly as binary data.
6. Return the binary PDF response to the frontend using Content-Type: application/pdf.
7. Forward PDFShift errors and their HTTP status codes.

Then add an "Export as PDF" button.

Use base44.functions.fetch() to call the function so that the binary response can be accessed directly.

Convert the response to a Blob and download it as document.pdf.

Never expose PDFSHIFT_API_KEY in frontend code.
```

Base44's `functions.fetch()` method provides access to the native HTTP response, including binary bodies, making it suitable for PDF downloads. The resulting architecture is:

```text
Base44 application
       |
generate-pdf backend function
       |
PDFShift API
       |
PDF binary
       |
Browser download
```

With this approach, the generated PDF is returned directly to your Base44 application and is never temporarily stored by PDFShift.

## Related Resources

- [Base44 Documentation](https://docs.base44.com): Learn about Base44 custom integrations, backend functions, and secrets.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
