---
title: "Adding an image watermark"
description: "Discover how to effortlessly add image watermarks to PDFs using Ruby and the Faraday library. Our guide shows you how to add images on top of your PDF to protect your document easily. This is easily done with a simple request to PDFShift's API."
language: 'Ruby'
library: 'Faraday'
property: 'watermark'
output: 'pdf'
related: ['protecting-the-generated-pdf', 'adding-a-text-watermark']
default: false
---

In this guide, we'll walk you through the process of adding text watermarks to your PDF files, using PDFShift's API.

Adding a watermark to your PDF can be done by adding the `watermark` object to your query.
The advantage of providing an image is that you can add a visual stamp on top of each of your pages that are generated through PDFShift.

```ruby
require 'faraday'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'watermark' => {
        'image' => 'https://placekitten.com/200/300',
        'offset_x' => 'center',
        'offset_top' => 'top'
    }
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

The "image" parameter for the watermark can be used in two different values:

 * URL : A full URL to an image that will be used as the watermark.
 * Base64 : A base64 encoded image that will be used as the watermark.

Note that you can also rotate the image by passing the `rotate` parameter as a degree (or negative degree)

You can also customize the position of the text watermark by applying the following properties:

 * `offset_x`: The horizontal position of the text. Can be 'left', 'center', 'right', or a specific value in pixels. Defaults to 'center'.
 * `offset_y`: The vertical position of the text. Can be 'top', 'middle', 'bottom', or a specific value in pixels. Defaults to 'center'.

For the offset positions, we accept a value in integer which will be translated to pixels, but you can also pass a unit such as 'px', 'in', 'cm', 'mm', 'pt'.

For example:

```json
params = {
    "source": "https://www.example.com",
    "watermark": {
        "text": "PROTECTED DOCUMENT",
        "offset_x": "5cm",
        "offset_top": "15mm"
    }
}
```
