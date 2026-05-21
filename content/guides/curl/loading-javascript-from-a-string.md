---
title: "Loading JavaScript from a string"
description: "Learn how to provide JavaScript directly as a string when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'javascript'
output: 'pdf'
related: ['loading-javascript-from-a-url', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to provide JavaScript directly as a string when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Provide JavaScript as a string
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "javascript": "document.body.style.backgroundColor = \"red\";"}' \
  -o "result.pdf"
```

With this cUrl command, you can provide inline JavaScript for dynamic content in your PDF documents. Happy coding!
```