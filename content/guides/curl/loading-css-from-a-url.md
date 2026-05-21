---
title: "Loading CSS from a URL"
description: "Learn how to load external CSS stylesheets when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-string', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to load external CSS stylesheets when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Load CSS from a URL
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "css": "https://example.com/styles.css"}' \
  -o "result.pdf"
```

With this cUrl command, you can load external CSS files for styling your PDF documents. Happy coding!
```