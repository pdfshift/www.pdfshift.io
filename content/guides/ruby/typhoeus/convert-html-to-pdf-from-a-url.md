---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Ruby and the Typhoeus library. This how-to guide offers clear Ruby code examples that show developers how to implement this using the PDFShift API."
language: 'Ruby'
library: 'Typhoeus'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Ruby code.

```ruby
require 'typhoeus'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
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

With this Ruby script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!