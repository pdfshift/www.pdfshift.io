---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Ruby and the Net::HTTP library. This guide offers detailed steps with code samples in Ruby and the Net::HTTP library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Ruby'
library: 'Net::HTTP'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Ruby and the Net::HTTP library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```ruby
require 'net/http'
require 'uri'
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
