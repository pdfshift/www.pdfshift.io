---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Python and the aiohttp library. This guide offers detailed steps with code samples in Python and the aiohttp library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Python'
library: 'aiohttp'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Python and the aiohttp library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    # You can set a basic authentication by passing the "auth" property which contains a username and password
    'auth': {
        'username': 'user',
        'password': 'password'
    }
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

            with open('result.pdf', 'wb') as f:
                f.write(await response.read())

            print('The PDF document was generated and saved to result.pdf')
except asyncio.TimeoutError:
    raise Exception('The request took too long to process')
except aiohttp.ClientError as e:
    raise Exception(f'An error occurred: {e}')
except Exception as e:
    # We highly recommend you to handle exceptions. Often, PDFShift will provide you with a clear explanation about what happened.
    # Moreover, in case of error, no PDF are returned !
    raise Exception(f'An error occurred: {e}')
```

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
