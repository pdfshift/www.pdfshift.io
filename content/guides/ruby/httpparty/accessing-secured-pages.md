---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Ruby and the HttpParty library. This guide offers detailed steps with code samples in Ruby and the HttpParty library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Ruby'
library: 'HttpParty'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Ruby and the HttpParty library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```ruby
require 'httparty'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    # You can set a basic authentication by passing the "auth" property which contains a username and password
    'auth' => {
        'username' => 'user',
        'password' => 'password'
    }
}

response = HTTParty.post(
    "https://api.pdfshift.io/v3/convert/pdf",
    body: params.to_json,
    headers: {
        'Content-Type' => 'application/json',
        'Authorization' => "Basic #{Base64.strict_encode64("api:#{api_key}")}"
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
