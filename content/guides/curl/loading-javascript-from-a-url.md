---
title: "Loading JavaScript from a URL"
description: "Learn how to load external JavaScript files when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'javascript'
output: 'pdf'
related: ['loading-javascript-from-a-string', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to load external JavaScript files when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Load JavaScript from a URL
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "javascript": "https://example.com/script.js"}' \
  -o "result.pdf"
```

With this cUrl command, you can load external JavaScript files for dynamic content in your PDF documents. Happy coding!
```