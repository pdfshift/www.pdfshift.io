---
title: "Adding a text watermark"
description: "Learn how to add a text watermark to your PDF documents when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to add a text watermark to your PDF documents when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Add a text watermark
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "watermark": {"text": "CONFIDENTIAL"}}' \
  -o "result.pdf"
```

With this cUrl command, you can add text watermarks to protect your PDF documents. Happy coding!
```