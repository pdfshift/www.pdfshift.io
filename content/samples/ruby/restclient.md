---
language: 'Ruby'
library: 'RestClient'
link: 'https://github.com/rest-client/rest-client'
---

[RestClient](https://github.com/rest-client/rest-client) is a simple and lightweight HTTP client library for Ruby. It provides a user-friendly API for making HTTP requests and handling responses. RestClient abstracts away the complexities of HTTP communication and provides features like automatic URL encoding, response handling, and exception handling.

```ruby
require 'rest-client'
require 'json'

def convert(api_key, params, endpoint = 'pdf')
  # Ensure the endpoint is valid
  unless %w[pdf png jpg webp].include?(endpoint)
    raise ArgumentError, 'Invalid endpoint specified'
  end

  # Set the API URL
  url = "https://api.pdfshift.io/v3/convert/#{endpoint}"

  # Make the POST request
  response = RestClient.post(url, params.to_json, {
    'Content-Type' => 'application/json',
    'X-API-Key' => api_key
  })

  # Check for successful response
  unless response.code == 200
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
