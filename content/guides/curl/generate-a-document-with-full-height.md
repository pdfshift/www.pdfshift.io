---
title: "Generate a document with full height"
description: "Learn how to generate PDF documents with full height using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'format'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
default: true
---

In this guide, we'll show you how to generate PDF documents with full height using PDFShift's API. This ensures your content spans the entire page height.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Generate a document with full height
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "format": "1280xauto"}' \
  -o "result.pdf"
```

With this cUrl command, you can generate PDF documents that expand to fill the full height of the page. The custom `1280xauto` format makes the page 1280px wide and as tall as the content. Happy coding!
