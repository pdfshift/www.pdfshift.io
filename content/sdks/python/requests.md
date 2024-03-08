---
language: 'Python'
library: 'Requests'
link: 'https://docs.python-requests.org/en/master/'
---

[Requests](https://docs.python-requests.org/en/master/) is a popular Python HTTP library that provides a simple and elegant API for making HTTP requests and handling responses. It abstracts away the complexities of HTTP communication and provides features like automatic JSON parsing, session management, and response content decoding. requests is widely used for web scraping, API integration, and web development in Python.

```python
import requests

def convert(api_key, params, endpoint='pdf'):
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
    
    response = requests.post(
        f'https://api.pdfshift.io/v3/convert/{endpoint}',
        auth=('api', api_key),
        json=params
    )
    response.raise_for_status()
    
    if 'filename' in params or 'webhook' in params:
        return response.json()
    
    return response.content
```

```python
binary = convert('sk_XXXXXXXXXXXXXX', {'source': 'https://en.wikipedia.org/wiki/REST'})
with open('result.pdf', 'wb') as f:
    f.write(binary)
```
