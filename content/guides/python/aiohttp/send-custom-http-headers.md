---
title: "Send custom HTTP headers"
description: "Learn how to add custom HTTP headers when requesting an URL to be converted in PDF with PDFShift's API. It allows you to add specific headers that your backend can check against to authenticate a query before converting it to PDF. This guide explains you how using Python and the aiohttp library."
language: 'Python'
library: 'aiohttp'
property: 'http_headers'
output: 'pdf'
related: ['using-cookies', 'accessing-secured-pages']
default: false
---

In this guide, we'll walk you through the process of sending custom HTTP headers when requesting an URL to be converted to PDF using PDFShift's API.

This can be useful to pass custom parameters to your server. It can help for instance to identify from where is coming the request, and add some extra layer of security.

```python
import aiohttp, asyncio, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'http_headers': {
        'x-custom-header': 'custom-value',
        'Authorization': 'Bearer {token}'  # This allows you to authenticate PDFShift to your service in a custom way
    }
}

response = None
try:
    auth = base64.b64encode(
        'api:{}'.format(api_key).encode('utf-8')
    ).decode('utf-8')

    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://api.pdfshift.io/v3/convert/pdf',
            headers={'Authorization': f'Basic {auth}'},
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

This allows you to set specific HTTP headers that will be send along with the request PDFShift will make to your server.
It can be helpful to authenticate the request that your backend can check against before converting it to PDF.