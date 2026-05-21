---
title: "Save your PDF online and get back a URL"
description: "Learn how to save your PDF online and get back a URL when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to save your PDF online and get back a URL when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Save PDF online and get a URL
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "filename": "my-document.pdf", "webhook": {"url": "https://yourdomain.com/webhook"}}' \
  -o "result.pdf"
```

With this cUrl command, you can save your PDF online and receive a URL to access it. Happy coding!
```