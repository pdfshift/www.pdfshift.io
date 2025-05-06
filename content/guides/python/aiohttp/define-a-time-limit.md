---
title: "Define a time limit"
description: "Learn how to set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted. This guides explains you how to achieve it using Python and the aiohttp library."
language: 'Python'
library: 'aiohttp'
property: 'timeout'
output: 'pdf'
related: ['waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how you can set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted.

In some cases, this can be useful if you want the request to not be too long and then handle failure on your end depending on the result.

To do so, we use the `timeout` property, which is the maximum time in **seconds** that the request is allowed to take. If the request takes longer than the defined time, the conversion will be aborted.

```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'timeout': 10
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

In the above example, the conversion could fail if the conversion takes longer than 10 seconds.