---
language: 'Ruby'
library: 'Faraday'
link: 'https://lostisland.github.io/faraday/'
---

[Faraday](https://lostisland.github.io/faraday/) is an HTTP client library for Ruby that provides a flexible and modular API for making HTTP requests and handling responses. It supports middleware, which allows developers to customize the behavior of requests and responses. Faraday is commonly used for interacting with web services and consuming APIs in Ruby applications.

```ruby
require 'faraday'
require 'json'

def convert(api_key, params, endpoint = 'pdf')
  # Ensure the endpoint is valid
  unless %w[pdf png jpg webp].include?(endpoint)
    raise ArgumentError, 'Invalid endpoint specified'
  end

  # Set the API URL
  url = "https://api.pdfshift.io/v3/convert/#{endpoint}"

  # Create a Faraday connection
  conn = Faraday.new(url: url) do |faraday|
    faraday.request :url_encoded
    faraday.adapter Faraday.default_adapter
  end

  # Make the POST request
  response = conn.post do |req|
    req.headers['Content-Type'] = 'application/json'
    req.headers['X-API-Key'] = api_key
    req.body = params.to_json
  end

  # Check for successful response
  unless response.success?
    raise "Request failed with status code #{response.status}: #{response.body}"
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
