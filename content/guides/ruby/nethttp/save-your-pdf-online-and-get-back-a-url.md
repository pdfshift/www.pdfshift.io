---
title: "Save your PDF online and get back a URL"
description: "This guides shows you how can generate a PDF document from HTML and get back an URL instead of the raw PDF. This allows you to share the link directly to your users or redirect them to that page. Learn how you can achieve it using Ruby and the Net::HTTP library to call PDFShift's API."
language: 'Ruby'
library: 'Net::HTTP'
property: 'filename'
output: 'pdf'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: true
---

In this guide, we'll show you how you can generate a PDF document from HTML and get back an URL instead of the raw PDF. This allows you to share the link directly to your users or redirect them to that page.

To do so, we are going to pass the `filename` parameter to the request. It expects a string that will be the name of the file once it is saved on our servers.

```ruby
require 'net/http'
require 'uri'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'filename' => 'example.pdf'
}

url = URI("https://api.pdfshift.io/v3/convert/pdf")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request['Content-Type'] = 'application/json'
request['X-API-Key'] = api_key
request.body = params.to_json

# Send the request and handle the response
response = http.request(request)

puts 'The PDF document was generated and saved to result.pdf'
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