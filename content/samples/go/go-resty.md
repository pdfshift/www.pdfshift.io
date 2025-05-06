---
language: 'Go'
library: 'go-resty'
link: 'https://github.com/go-resty/resty'
---

[Go-Resty](https://github.com/go-resty/resty) is a third-party HTTP client library for GoLang. It provides an easy-to-use API for making HTTP requests and handling responses, similar to libraries like net/http. Go-Resty simplifies tasks such as setting headers, handling cookies, and managing request parameters.

```go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

// Convert function makes a POST request to the provided endpoint with the supplied parameters
func convert(apiKey string, params map[string]string, endpoint string) ([]byte, error) {
	client := resty.New()

	// Perform the request
	resp, err := client.R().
		SetHeader("X-API-Key", apiKey).
		SetHeader("Content-Type", "application/json").
		SetBody(params).
		Post(fmt.Sprintf("https://api.pdfshift.io/v3/convert/%s", endpoint))

	if err != nil {
		return nil, err
	}

	if _, ok := params["filename"]; ok || params["webhook"]; ok {
		var response map[string]interface{}
		err := json.Unmarshal(resp.Body(), &response)
		if err != nil {
			return nil, err
		}
		return json.Marshal(response)
	}

	return resp.Body(), nil
}
```

```go
func main() {
	params := map[string]string{"source": "https://en.wikipedia.org/wiki/REST"}
	apiKey := "sk_XXXXXXXXXXXXXX"

	resp, err := convert(apiKey, params, "pdf")
	if err != nil {
		panic(err)
	}

	error := ioutil.WriteFile("result.pdf", resp, 0644)
	if error != nil {
		panic(err)
	}
}
```
