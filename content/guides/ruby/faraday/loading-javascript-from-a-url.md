---
title: "Loading Javascript from a URL"
description: "Follow this guide to add custom javascript to your page before converting it to PDF. Using a URL allows you to later be able to change the content of the javascript without having to update the query made to PDFShift. Learn how you can implement this using Ruby and the Faraday library to call the PDFShift's API."
language: 'Ruby'
library: 'Faraday'
property: 'javascript'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string']
default: false
---

In this guide, we'll show you how to load custom javascript as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom Js to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw javascript content, as it allows you to later modify that javascript without having to modify the query made to PDFShift.

```ruby
require 'faraday'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'javascript' => 'https://www.example.com/custom.js'
}

# Create a Faraday connection
conn = Faraday.new(url: "https://api.pdfshift.io/v3/convert/pdf") do |faraday|
    faraday.request :url_encoded
    faraday.adapter Faraday.default_adapter
end

# Make the POST request
response = conn.post do |req|
    req.headers['Content-Type'] = 'application/json'
    req.headers['Authorization'] = "Basic #{Base64.strict_encode64("api:#{api_key}")}"
    req.body = params.to_json
end

# Check for successful response
unless response.success?
    raise "Request failed with status code #{response.status}: #{response.body}"
end

# write response to a file nammed "result.pdf"
File.open('result.pdf', 'wb') { |f| f.write(response.body) }

# Print a success message
puts 'The PDF document was generated and saved to result.pdf'
```

The `javascript` parameter accepts either a string or a URL. It will be used as the javascript for the page when converting it to PDF. This allows you to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.