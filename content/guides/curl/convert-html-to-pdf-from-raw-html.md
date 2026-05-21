---
title: "Convert an HTML document to PDF from raw HTML"
description: "Learn how to easily convert HTML documents to PDF from raw HTML using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'html'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'avoid-conversion-on-error']
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API by providing raw HTML content. This is a straightforward process that can be accomplished with just a few lines of cUrl code.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Convert raw HTML to PDF
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"html": "<h1>Hello World</h1><p>This is a test document.</p>"}' \
  -o "result.pdf"
```

With this cUrl command, you can effortlessly convert raw HTML to PDF files using PDFShift's API. Happy coding!
```