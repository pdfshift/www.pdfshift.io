---
title: "Loading CSS from a string"
description: "Follow this guide to load custom CSS as a given string when converting an HTML document to PDF with PDFShift's API. This guide provides Ruby code samples with the Typhoeus library."
language: 'Ruby'
library: 'Typhoeus'
property: 'css'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to load custom CSS as a given string when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

```ruby
require 'typhoeus'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'css' => 'body { background-color: #f00; }'
}

# Make the POST request
response = Typhoeus.post("https://api.pdfshift.io/v3/convert/pdf", body: params.to_json, headers: {
    'Content-Type' => 'application/json',
    'Authorization' => "Basic #{Base64.strict_encode64("api:#{api_key}")}"
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

The `css` parameter accepts either a string or a URL. It will be used as the CSS for the page when converting it to PDF. This allows you to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.