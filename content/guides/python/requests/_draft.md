---
title: ""
description: ""
language: 'Python'
library: 'requests'
property: ''
output: 'pdf'
related: ['xxx', 'xxx']
default: true
draft: true
---


```python
import requests

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
}

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    headers={'X-API-Key': api_key},
    json=params
)
response.raise_for_status()

with open('result.pdf', 'wb') as f:
    f.write(response.content)

print('The PDF document was generated and saved to result.pdf')
```
