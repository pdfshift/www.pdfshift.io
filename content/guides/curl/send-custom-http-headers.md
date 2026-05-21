---
title: "Send custom HTTP headers"
description: "Learn how to send custom HTTP headers when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to send custom HTTP headers when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Send custom HTTP headers
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -H "User-Agent: MyCustomAgent/1.0" \
  -d '{"source": "https://www.example.com"}' \
  -o "result.pdf"
```

With this cUrl command, you can send custom HTTP headers to the source URL. Happy coding!
```