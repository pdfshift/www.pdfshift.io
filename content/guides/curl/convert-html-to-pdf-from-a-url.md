---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: true
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of cUrl code.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Convert HTML from a URL to PDF
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com"}' \
  -o "result.pdf"
```

With this cUrl command, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!
```