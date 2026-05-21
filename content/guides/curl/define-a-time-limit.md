---
title: "Define a time limit"
description: "Learn how to define a time limit for PDF conversion using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to define a time limit for PDF conversion using PDFShift's API. This helps prevent long-running conversions from impacting your application.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Convert HTML with a time limit of 30 seconds
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "time_limit": 30}' \
  -o "result.pdf"
```

With this cUrl command, you can set a time limit for PDF conversions to prevent long-running processes. Happy coding!
```