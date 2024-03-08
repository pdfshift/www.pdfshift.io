---
language: 'Python'
library: 'Httplib2'
link: 'https://httplib2.readthedocs.io/en/latest/'
---

[Httplib2](https://httplib2.readthedocs.io/en/latest/) is a comprehensive HTTP client library for Python. It provides support for features like caching, authentication, SSL/TLS, and proxy handling. httplib2 offers a higher-level API compared to Python's built-in http.client module and is commonly used for making HTTP requests and handling responses in Python applications.

```python
import httplib2
import json
import base64

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
    
    # Set the API URL
    url = f'https://api.pdfshift.io/v3/convert/{endpoint}'
    
    # Create an httplib2.Http instance
    http = httplib2.Http()
    
    # Set authorization header
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.b64encode(f'api:{api_key}'.encode('utf-8')).decode('utf-8')
    }
    
    # Convert params to JSON
    body = json.dumps(params)
    
    # Make the POST request
    response, content = http.request(url, method='POST', body=body, headers=headers)
    
    # Check for successful response
    if response.status >= 400:
        raise ValueError(f"Request failed with status code {response.status}: {content.decode('utf-8')}")
    
    # Decode the content
    decoded_content = content.decode('utf-8')
    
    # Return the response based on the presence of filename or webhook
    if 'filename' in params or 'webhook' in params:
        return json.loads(decoded_content)
    
    return decoded_content
```

```python
binary = convert('sk_XXXXXXXXXXXXXX', {'source': 'https://en.wikipedia.org/wiki/REST'})
with open('result.pdf', 'wb') as f:
    f.write(binary)
```
