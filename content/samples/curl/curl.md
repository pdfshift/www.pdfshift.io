---
language: 'cUrl'
library: 'cUrl'
link: 'https://curl.se/docs/'
---

[cUrl](https://curl.se/docs/) is a command-line tool and library for transferring data with URLs. It supports numerous protocols including HTTP, HTTPS, FTP, and many others. cUrl is widely used for testing APIs, downloading files, and making HTTP requests from the command line.

```bash
#!/bin/bash

# Simple function to convert HTML to PDF using cUrl
convert() {
    local api_key="$1"
    local endpoint="$2"
    local params="$3"
    
    # Validate endpoint
    if [[ ! "$endpoint" =~ ^(pdf|png|jpg|webp)$ ]]; then
        echo "Error: Invalid endpoint"
        return 1
    fi
    
    # Make the API request
    curl -X POST "https://api.pdfshift.io/v3/convert/$endpoint" \
        -H "Content-Type: application/json" \
        -H "X-API-Key: $api_key" \
        -d "$params" \
        -o "result.$endpoint"
}

# Example usage
convert "sk_XXXXXXXXXXXXXX" "pdf" '{"source": "https://en.wikipedia.org/wiki/REST"}'
```

```bash
# Example usage with error handling
API_KEY="sk_xxxxxxxxxxxx"

# Convert HTML from URL to PDF with error handling
response=$(curl -s -w "%{http_code}" -X POST "https://api.pdfshift.io/v3/convert/pdf" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d '{"source": "https://www.example.com"}')

# Extract HTTP status code
http_status="${response: -3}"
# Extract response body
response_body="${response%???}"

if [ "$http_status" -eq 200 ]; then
    echo "Conversion successful"
    echo "$response_body" > "result.pdf"
else
    echo "Error: HTTP $http_status"
    echo "$response_body"
fi
```