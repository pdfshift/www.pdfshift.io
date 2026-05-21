---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDF documents when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'header'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to add custom headers and footers to your PDF documents when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Add a custom header and footer
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "header": {"html": "<div style=\"text-align: center;\">Page Header</div>"}, "footer": {"html": "<div style=\"text-align: center;\">Page Footer</div>"}}' \
  -o "result.pdf"
```

With this cUrl command, you can add custom headers and footers to your PDF documents. Happy coding!
```