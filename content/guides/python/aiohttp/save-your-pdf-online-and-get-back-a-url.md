---
title: "Save your PDF online and get back a URL"
description: "This guides shows you how can generate a PDF document from HTML and get back an URL instead of the raw PDF. This allows you to share the link directly to your users or redirect them to that page. Learn how you can achieve it using Python and the aiohttp library to call PDFShift's API."
language: 'Python'
library: 'aiohttp'
property: 'filename'
output: 'pdf'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how you can generate a PDF document from HTML and get back an URL instead of the raw PDF. This allows you to share the link directly to your users or redirect them to that page.

To do so, we are going to pass the `filename` parameter to the request. It expects a string that will be the name of the file once it is saved on our servers.

```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'filename': 'example.pdf'
}

response = None
try:
    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://api.pdfshift.io/v3/convert/pdf',
            headers={'X-API-Key': api_key},
            json=params
        ) as response:
            if response.status >= 400:
                raise Exception('Invalid request: {}'.format(await response.text()))

            print('The PDF document was generated and is available online via the url in the response')
except asyncio.TimeoutError:
    raise Exception('The request took too long to process')
except aiohttp.ClientError as e:
    raise Exception(f'An error occurred: {e}')
except Exception as e:
    # We highly recommend you to handle exceptions. Often, PDFShift will provide you with a clear explanation about what happened.
    # Moreover, in case of error, no PDF are returned !
    raise Exception(f'An error occurred: {e}')
```

In the above example, we used the `filename` parameter to specify the name of the file once it is saved on our servers. The response will convert the document **but return a JSON response** instead of the raw PDF.

The body of the response will be similar to this:

```json
{
    "success": true,
    "url": "https://pdfshift.s3.amazonaws.com/d/2/2024-03/c9c2d3e536ff42d892f06fdda6bb1ff7/example.pdf",
    "filesize": 34980,
    "duration": 1237,
    "response": {
        "status-code": 200,
        "content-length": 0,
        "requests": 0,
        "duration": 1085.6739225387573
    },
    "executed": "2024-03-06T10:05:51.516413",
    "pdf_pages": 1
}
```

**NOTE**: Using the filename does save your document on our S3 storage for 2 days. After two days, the document is automatically deleted.

**NOTE**: Since we store your documents on our server, this command is not recommended if you want to be HIPAA compliant.