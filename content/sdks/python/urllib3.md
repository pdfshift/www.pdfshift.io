---
language: 'Python'
library: 'Urllib3'
link: 'https://urllib3.readthedocs.io/en/latest/'
---

[Urllib3](https://urllib3.readthedocs.io/en/latest/) is a powerful HTTP client library for Python. It builds upon Python's built-in http.client module and provides features like connection pooling, SSL/TLS verification, and request retries. urllib3 offers a higher-level API compared to http.client and is commonly used for making secure and reliable HTTP requests in Python applications.

```python
import json
import urllib3

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
    
    http = urllib3.PoolManager()
    
    url = f'https://api.pdfshift.io/v3/convert/{endpoint}'
    body = json.dumps(params).encode('utf-8')
    headers = urllib3.util.make_headers(
        basic_auth=f'api:{api_key}'
    )
    headers['Content-Type'] = 'application/json'
    
    response = http.request('POST', url, headers=headers, body=body)
    
    if response.status >= 400:
        raise ValueError(f"Request failed with status code {response.status}: {response.data.decode('utf-8')}")
    
    if 'filename' in params or 'webhook' in params:
        return json.loads(response.data.decode('utf-8'))
    
    return response.data
```

```python
binary = convert('sk_XXXXXXXXXXXXXX', {'source': 'https://en.wikipedia.org/wiki/REST'})
with open('result.pdf', 'wb') as f:
    f.write(binary)
```
