---
title: "Protecting the generated PDF"
description: "Learn how to protect the generated PDF with a password using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to protect the generated PDF with a password using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Protect the PDF with a password
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com", "protect": {"password": "mypassword"}}' \
  -o "result.pdf"
```

With this cUrl command, you can password-protect your generated PDF documents. Happy coding!
```