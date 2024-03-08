---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using Ruby and the Net::HTTP library and relies on the PDFShift's API."
language: 'Ruby'
library: 'Net::HTTP'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: true
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```ruby
require 'net/http'
require 'uri'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.httpstat.us/404',
    'raise_for_status' => True
}

url = URI("https://api.pdfshift.io/v3/convert/pdf")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request['Content-Type'] = 'application/json'
request.basic_auth('api', api_key)
request.body = params.to_json

# Send the request and handle the response
response = http.request(request)

# write response to a file nammed "result.pdf"
File.open('result.pdf', 'wb') { |f| f.write(response.body) }

# Print a success message
puts 'The PDF document was generated and saved to result.pdf'
```

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.