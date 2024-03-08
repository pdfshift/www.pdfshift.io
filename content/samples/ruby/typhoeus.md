---
language: 'Ruby'
library: 'Typhoeus'
link: 'https://github.com/typhoeus/typhoeus'
---

[Typhoeus](https://github.com/typhoeus/typhoeus) is a parallel HTTP client library for Ruby that provides high-performance and asynchronous HTTP requests. It allows developers to make multiple HTTP requests simultaneously and handle responses asynchronously. Typhoeus is commonly used for making concurrent HTTP requests and improving the performance of web applications.

```ruby
require 'typhoeus'
require 'json'

def convert(api_key, params, endpoint = 'pdf')
  # Ensure the endpoint is valid
  unless %w[pdf png jpg webp].include?(endpoint)
    raise ArgumentError, 'Invalid endpoint specified'
  end

  # Set the API URL
  url = "https://api.pdfshift.io/v3/convert/#{endpoint}"

  # Make the POST request
  response = Typhoeus.post(url, body: params.to_json, headers: {
    'Content-Type' => 'application/json',
    'Authorization' => "Basic #{Base64.strict_encode64("api:#{api_key}")}"
  })

  # Check for successful response
  unless response.success?
    raise "Request failed with status code #{response.code}: #{response.body}"
  end

  # Return the response based on the presence of filename or webhook
  response_body.key?('filename') || response_body.key?('webhook') ? JSON.parse(response.body) : response.body
end
```

```ruby
begin
  result = convert('sk_XXXXXXXXXXXXXX', {'source' => 'https://en.wikipedia.org/wiki/REST'})
  puts result
rescue StandardError => e
  puts "Error: #{e.message}"
end
```
