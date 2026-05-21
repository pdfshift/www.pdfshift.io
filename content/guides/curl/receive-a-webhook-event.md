---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to receive webhook events when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Receive a webhook event upon completion
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "webhook": {"url": "https://yourdomain.com/webhook"}}' \
  -o "result.pdf"
```

With this cUrl command, you can receive webhook notifications when PDF conversion is complete. Happy coding!
```