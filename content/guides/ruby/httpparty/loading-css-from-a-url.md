---
title: "Loading CSS from a URL"
description: "This guides shows you how to add a custom CSS from an URL onto your document to customize the output of your generated PDF. Follow this guides to learn how to do it using Ruby and the HttpParty library and see how it can quickly be implemented using the PDFShift's API."
language: 'Ruby'
library: 'HttpParty'
property: 'css'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to load custom CSS as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw CSS content, as it allows you to later modify that CSS without having to modify the query made to PDFShift.

```ruby
require 'httparty'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'css' => "https://www.example.com/public/style/print.css"
}

response = HTTParty.post(
    "https://api.pdfshift.io/v3/convert/pdf",
    body: params.to_json,
    headers: {
        'Content-Type' => 'application/json',
        'X-API-Key' => api_key
    }
)

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