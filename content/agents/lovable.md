---
title: "PDFShift + Lovable Integration"
description: "Add PDF generation to your Lovable app with PDFShift. Copy the one-shot prompt or click Build with Lovable to set up a secure server-side PDF export in minutes."
---

# PDFShift + Lovable

Add PDF generation to any application built with Lovable. Generate invoices, reports, receipts, or certificates directly from the HTML your app produces, with your API key kept safely server-side.

## Quick Start: the one-shot prompt

The fastest way to integrate PDFShift into your Lovable app is to paste the prompt below into your Lovable project, or click **Build with Lovable** to open Lovable with it pre-filled. It sets up the secret, the server-side Edge Function, and the "Export as PDF" button in a single pass.

```text
Add PDF export to my app using PDFShift (an HTML-to-PDF API).
Keep my PDFShift API key secret and make every PDFShift call from the server, never from the browser.

1. Secret
Add a secret in Lovable Cloud named PDFSHIFT_API_KEY. Never expose it in frontend code or return it to the client.

2. Edge Function "generate-pdf"
Create a server-side Edge Function named "generate-pdf" that:
- Accepts a POST request with a JSON body: { "source": "<raw HTML string>", "options": { ...optional PDFShift options } }.
- Calls the PDFShift API:
  - URL: https://api.pdfshift.io/v3/convert/pdf
  - Method: POST
  - Headers: "X-API-Key: <PDFSHIFT_API_KEY>" and "Content-Type: application/json"
  - JSON body: { "source": <source>, "sandbox": true, ...options }
- When no "filename" or "webhook" is set, PDFShift returns the binary PDF in the response body.
- Return that binary PDF to the client with "Content-Type: application/pdf".
- If PDFShift returns a non-2xx status, read its JSON error and return the same status code and message to the client. Never leak the API key.
- Enable CORS so the frontend can call the function.

3. "Export as PDF" button
Add an "Export as PDF" button to the main document view. When clicked, it:
- Builds a complete, self-contained HTML string for the current document, with all CSS inlined so the PDF renders correctly.
- POSTs { "source": html } to the generate-pdf function.
- Receives the response as a Blob and triggers a browser download named "document.pdf".
- Shows a loading state while generating and a friendly error message if it fails.

PDFShift notes:
- "source" can be raw HTML or a publicly accessible URL.
- Keep "sandbox": true while testing (free, watermarked). Remove it for production.
- Options you can add to the JSON body later: "landscape", "format" (e.g. "A4"), "margin", "header", "footer", "css", "filename", "webhook".
```

Lovable pre-fills the prompt but never sends it automatically. You review it and click send. Add your own project details first if you have any.

## Step-by-Step Guide

### 1. Get your PDFShift API key

Create a PDFShift account and copy your API key. Do not paste it into your Lovable prompt.

[Register for Free](/register)

### 2. Ask Lovable to integrate PDFShift

Open your Lovable project and enter the one-shot prompt from the Quick Start section above. Lovable will detect that PDFShift is an authenticated third-party API and prompt you to configure a secret.

### 3. Add your PDFShift API key as a secret

In your Lovable project, open **Cloud → Secrets** and create a secret named: `PDFSHIFT_API_KEY`

Set its value to your PDFShift API key. The key is then available to the server-side function without being exposed to visitors using your application.

### 4. Generate the HTML

PDFShift accepts either a publicly accessible URL or raw HTML through the `source` parameter. For dynamically generated documents, sending raw HTML is usually best as it also lets you convert content that isn't public.

Your app might build something like this:

```html
<!doctype html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>Invoice #1234</h1>
    <p>Customer: Acme Inc.</p>
    <p>Total: $149.00</p>
</body>
</html>
```

That HTML becomes the `source` passed to PDFShift. Inline your CSS so the document renders exactly as you expect.

### 5. Download the PDF

Your Lovable frontend calls the `generate-pdf` function rather than PDFShift directly. The flow looks like this:

```text
Lovable application
       |
generate-pdf Edge Function
       |
PDFShift API
       |
PDF document
       |
Browser download
```

This separation matters because the browser never receives your PDFShift API key.

## Customizing the generated PDF

Once the basic integration works, ask Lovable to expose more PDFShift options. For example:

```text
Update the PDFShift integration so generated PDFs
use A4 pages and include our custom header and footer.
```

PDFShift supports a wide range of options you can wire into your app:

- Headers and footers
- Custom CSS
- Page margins and formats
- Landscape documents
- Custom JavaScript
- Delayed rendering
- Saving generated files
- Webhooks for async jobs

Just tell Lovable which options you want the application to use.

## Generating a PDF from an existing page

PDFShift can also convert a publicly accessible URL. Ask Lovable:

```text
Change the PDF export feature so it sends the URL of the
current document page to PDFShift instead of building the HTML manually.
```

PDFShift will load the page and convert it. For authenticated or private pages, sending raw HTML is usually preferable as PDFShift can't reach a page that requires a login without additional configuration.

## Related Resources

- [Lovable Documentation](https://docs.lovable.dev): Learn about Lovable Cloud, secrets, and Edge Functions to power your integration.
- [PDFShift API Doc](https://docs.pdfshift.io): Complete API reference with every parameter, option, and example.
