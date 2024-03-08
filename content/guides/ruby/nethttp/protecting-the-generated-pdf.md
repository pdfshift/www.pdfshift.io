---
title: "Protecting the generated PDF"
description: "Learn how to protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Ruby and the Net::HTTP library and relies on the PDFShift's API."
language: 'Ruby'
library: 'Net::HTTP'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: true
---

In this guide, we'll show you how you can protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Ruby and the Net::HTTP library and relies on the PDFShift's API.

One of the most useful feature here is the ability to set a password for the owner and the user of the PDF. This allows you to protect your document from anyone and restrict its access to only a few people.

PDFShift allows you to do this easily by adding the `protection` object to your query.

Here's a sample:

```ruby
require 'net/http'
require 'uri'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'protection' => {
        'owner_password' => 'owner_password',
        'user_password' => 'user_password',
        'no_print' => True,
        'no_modify' => True
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

Adding the `protection` object to your query will tell PDFShift to generate a PDF that will be password protected.

The `protection` object accepts the following parameters:

 * `author` : The name of the author in the PDF metadata.
 * `owner_password`: The password set for the owner.
 * `user_password`: The password set for the user.
 * `no_print`: If set to `True`, the user won't be able to print the PDF. (Only the owner)
 * `no_modify`: If set to `True`, the user won't be able to modify the PDF. (Only the owner)
 * `no_copy`: If set to `True`, the user won't be able to copy the content of the PDF. (Only the owner)


**IMPORTANT**:
It is important to note that most PDF reader don't respect the protection parameter. For instance, if you set the user_password to none (allowing anyone to view the PDF) but set the owner_password and block the modify, print and copy, most PDF reader will still allow user (and not owners) to modify, print and copy the PDF. This is a limitation of the PDF format and not PDFShift.