---
title: "Waiting for a custom element to be ready"
description: "Learn how to wait for a custom element to be ready before converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to wait for a custom element to be ready before converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Wait for a custom element to be ready
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "wait_for": "#dynamic-content"}' \
  -o "result.pdf"
```

With this cUrl command, you can delay PDF conversion until specific elements are ready. Happy coding!
```