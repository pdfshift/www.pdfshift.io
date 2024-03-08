---
language: 'Python'
library: 'Aiohttp'
link: 'https://docs.aiohttp.org/en/stable/'
---

[Aiohttp](https://docs.aiohttp.org/en/stable/) is an asynchronous HTTP client/server framework for Python. It allows developers to write asynchronous web servers and clients using Python's asyncio library. aiohttp provides a high-level API for making HTTP requests and handling responses asynchronously, making it suitable for high-performance networking applications and web services.

```python
import aiohttp
import asyncio
import base64
import json

async def convert(api_key, params, endpoint='pdf'):
    """
    We focused on making this function as simple as possible.
    Since PDFShift is a REST API, we just need to send a
    POST request to the endpoint by passing a set of custom parameters.
    
    Args:
        api_key (str): Your API key.
        params (dict): A dictionary containing the parameters
                       you want to send to the API.
        endpoint (str): The type of conversion you want to perform
                        (pdf, png, jpg, webp)
    
    Returns:
        bytes | dict: Either the binary content of the PDF
                      or a dictionary containing the details
                      when filename/webhook are passed
    """
    
    assert endpoint in ('pdf', 'png', 'jpg', 'webp')
    
    auth = base64.b64encode(
        'api:{}'.format(api_key).encode('utf-8')
    ).decode('utf-8')
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                'https://api.pdfshift.io/v3/convert/{}'.format(endpoint),
                headers={'Authorization': f'Basic {auth}'},
                json=params
            ) as response:
                if response.status >= 400:
                    raise Exception('Invalid request: {}'.format(await response.text()))
                
                if 'filename' in params or 'webhook' in params:
                    return json.loads(await response.text())
                
                return await response.read()
    except asyncio.TimeoutError:
        raise Exception('The request took too long to process')
    except aiohttp.ClientError as e:
        raise Exception(f'An error occurred: {e}')
    except Exception as e:
        # We highly recommend you to handle exceptions. Often, PDFShift will provide you with a clear explanation about what happened.
        # Moreover, in case of error, no PDF are returned !
        raise Exception(f'An error occurred: {e}')
```

```python
binary = await convert('sk_XXXXXXXXXXXXXX', {'source': 'https://en.wikipedia.org/wiki/REST'})
with open('result.pdf', 'wb') as f:
    f.write(binary)
```
