---
title: "Accessing secured pages"
description: "Learn how to access secured pages when converting HTML to PDF using cUrl. This how-to guide offers clear cUrl code examples that show developers how to implement this using the PDFShift API."
language: 'cUrl'
library: 'cUrl'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
---

In this guide, we'll show you how to access secured pages when converting HTML to PDF using PDFShift's API.

```bash
# You can get an API key at https://pdfshift.io
API_KEY="sk_xxxxxxxxxxxx"

# Access a secured page
curl -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com/secured", "auth": {"username": "user", "password": "pass"}}' \
  -o "result.pdf"
```

With this cUrl command, you can access secured pages by providing authentication credentials. Happy coding!
```