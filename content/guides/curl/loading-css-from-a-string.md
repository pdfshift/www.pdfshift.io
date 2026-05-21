---
title: "Loading CSS from a string"
description: "Learn how to provide CSS styles directly as a string when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to provide CSS styles directly as a string when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Provide CSS as a string
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "css": "body { font-family: Arial; } h1 { color: blue; }"}' \
  -o "result.pdf"
```

With this cUrl command, you can provide inline CSS styles for your PDF documents. Happy coding!
```