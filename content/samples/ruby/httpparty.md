---
language: 'Ruby'
library: 'HttpParty'
link: 'https://lostisland.github.io/faraday/'
---

[HTTParty](https://lostisland.github.io/faraday/) is a Ruby HTTP client library that provides a simple and intuitive API for making HTTP requests and handling responses. It abstracts away the complexities of HTTP communication and provides features like automatic parsing of JSON and XML responses, request timeouts, and response caching.

```ruby
require 'httparty'
require 'json'

def convert(api_key, params, endpoint = 'pdf')
  # Ensure the endpoint is valid
  unless %w[pdf png jpg webp].include?(endpoint)
    raise ArgumentError, 'Invalid endpoint specified'
  end

  # Set the API URL
  url = "https://api.pdfshift.io/v3/convert/#{endpoint}"

  # Set headers
  headers = {
    'Content-Type' => 'application/json',
    'X-API-Key' => api_key
  }

  # Make the POST request
  response = HTTParty.post(url, body: params.to_json, headers: headers)

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
