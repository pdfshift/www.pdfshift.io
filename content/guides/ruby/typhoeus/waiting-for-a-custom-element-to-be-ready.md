---
title: "Waiting for a custom element to be ready"
description: "Learn how to set up a custom javascript function that will waits for a specific condition to become true before allowing the conversion to happen. This is very interesting for waiting on charts to be generated, or custom fonts to be loaded. With PDFShift's API, this can easily be done using Ruby and the Typhoeus library."
language: 'Ruby'
library: 'Typhoeus'
property: 'wait_for'
output: 'pdf'
related: ['define-a-time-limit', 'loading-javascript-from-a-string']
default: false
---

The `wait_for` parameter is one of the most powerful feature of PDFShift. It allows you to control when the document is ready to be converted to PDF.

For instance, you might need the `wait_for` parameter to wait on your charts to be visible.

It makes sense because from our engine point of view, all the resources are loaded so the conversion to PDF can be executed. But from your page stand point, even though everything is loaded, _not everything is rendered_!

So by using the `wait_for` parameter, you can tell PDFShift to wait for a specific condition to be true before allowing the conversion to happen.

That property **expects a string which points to a global function**.

For instance, if in your HTML page, you have the following script:

```javascript
<script>
function isPageReady() {
    return document.getElementById('chart').clientHeight > 0;
}
</script>
```

You can set the `wait_for` parameter to `isPageReady` and PDFShift will wait for the `isPageReady` function to return `true` before converting the page to PDF.


```ruby
require 'typhoeus'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'wait_for' => 'isPageReady'
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

In case your page doesn't have the javascript function available, but you still need to wait on some elements to be rendered before continuing the conversion, you can add javascript code directly in the request and use it at the same time:

```ruby
require 'typhoeus'
require 'json'

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source' => 'https://www.example.com',
    'javascript' => 'let isFontReady = false; document.fonts.ready.then(() => isFontReady = true); function isPageReady() { return isFontReady; }',
    'wait_for' => 'isPageReady'
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

The above script will wait for all fonts to be ready before returning `true` for the `isPageReady` function.
PDFShift will then wait for the fonts to be ready, via the `isPageReady`, before converting the page to PDF.