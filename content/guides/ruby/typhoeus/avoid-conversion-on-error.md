---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using Ruby and the Typhoeus library and relies on the PDFShift's API."
language: 'Ruby'
library: 'Typhoeus'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```ruby
require 'typhoeus'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.httpstat.us/404',
    'raise_for_status' => True
}

# Make the POST request
response = Typhoeus.post("https://api.pdfshift.io/v3/convert/pdf", body: params.to_json, headers: {
    'Content-Type' => 'application/json',
    'X-API-Key' => api_key
})

# Check for successful response
unless response.success?
    raise "Request failed with status code #{response.code}: #{response.body}"
end

# write response to a file nammed "result.pdf"
File.open('result.pdf', 'wb') { |f| f.write(response.body) }

# Print a success message
puts 'The PDF document was generated and saved to result.pdf'
```

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.