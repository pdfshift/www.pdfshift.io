---
title: "Avoid conversion on error"
description: "Learn how to prevent PDF conversion from happening when there are errors in the source HTML or CSS using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'convert-html-to-pdf-from-raw-html']
default: true
---

In this guide, we'll show you how to avoid conversion on error using PDFShift's API. This allows you to prevent PDF generation when there are issues with the source content.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Convert HTML from a URL with error handling
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "raise_for_status": true}' \
  -o "result.pdf"
```

With this cUrl command, you can prevent PDF generation when the source URL answers with a non-2XX status. Happy coding!
