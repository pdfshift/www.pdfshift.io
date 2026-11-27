---
title: "Save your PDF to your Amazon S3 bucket"
description: "Learn how to save your PDF directly to an Amazon S3 bucket when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 's3_destination'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'convert-html-to-pdf-from-a-url']
default: true
---

In this guide, we'll show you how to save your PDF directly to an Amazon S3 bucket when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Save PDF to Amazon S3 bucket
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "s3_destination": "s3://my-bucket/documents/my-document.pdf"}'
```

With this cUrl command, you can directly save your PDF to an Amazon S3 bucket. Happy coding!
