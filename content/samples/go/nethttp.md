---
language: 'Go'
library: 'Net/HTTP'
link: 'https://golang.org/pkg/net/http/'
---

[Net/HTTP](https://golang.org/pkg/net/http/) is a core package that provides functionality for building HTTP servers and clients, handling HTTP requests and responses, and managing web communication. It offers a straightforward API for creating web applications, APIs, and microservices, making it a fundamental component of web development in Go.

```go
package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type Response struct {
	Filename string `json:"filename"`
	Webhook  string `json:"webhook"`
	Status   string `json:"status"`
}

func convert(apiKey string, params map[string]interface{}, endpoint string) ([]byte, error) {
	allowedEndpoints := map[string]bool{
		"pdf":  true,
		"png":  true,
		"jpg":  true,
		"webp": true,
	}
	
	if _, ok := allowedEndpoints[endpoint]; !ok {
		panic("Invalid endpoint! Allowed endpoints are 'pdf', 'png', 'jpg', 'webp'")
	}
	
	url := "https://api.pdfshift.io/v3/convert/" + endpoint
	jsonParams, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonParams))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-Key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if _, ok := params["filename"]; ok || params["webhook"]; ok {
		responseData := &Response{}
		decoder := json.NewDecoder(resp.Body)
		err := decoder.Decode(&responseData)
		if err != nil {
			return nil, err
		}
		jsonResponse, err := json.Marshal(responseData)
		if err != nil {
			return nil, err
		}
		return jsonResponse, nil
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}
```

```go
func main() {
	params := map[string]interface{}{
		"source": "https://en.wikipedia.org/wiki/REST",
	}
	data, err := convert("sk_XXXXXXXXXXXXXX", params, "pdf")
	if err != nil {
		panic(err)
	}
	err = ioutil.WriteFile("result.pdf", data, 0644)
	if err != nil {
		panic(err)
	}
}
```
