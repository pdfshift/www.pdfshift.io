---
title: "Using cookies"
description: "Learn how to use cookies when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to use cookies when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Use cookies for authentication
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "cookies": [{"name": "session", "value": "abc123"}]}' \
  -o "result.pdf"
```

With this cUrl command, you can pass cookies to authenticate with protected content. Happy coding!
```