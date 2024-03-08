---
title: "Send custom HTTP headers"
description: "Learn how to add custom HTTP headers when requesting an URL to be converted in PDF with PDFShift's API. It allows you to add specific headers that your backend can check against to authenticate a query before converting it to PDF. This guide explains you how using Go and the Net/HTTP library."
language: 'Go'
library: 'Net/HTTP'
property: 'http_headers'
output: 'pdf'
related: ['using-cookies', 'accessing-secured-pages']
default: true
---

In this guide, we'll walk you through the process of sending custom HTTP headers when requesting an URL to be converted to PDF using PDFShift's API.

This can be useful to pass custom parameters to your server. It can help for instance to identify from where is coming the request, and add some extra layer of security.

```go
package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	// You can get an API key at https://pdfshift.io
	apiKey := "sk_xxxxxxxxxxxx"

	params := map[string]interface{}{
		"source": "https://www.example.com",
		"http_headers": map[string]string{
			"x-custom-header": "custom-value",
			"Authorization":   "Bearer {token}", // This allows you to authenticate PDFShift to your service in a custom way
		},
	}

	// Marshal the parameters into JSON
	jsonParams, err := json.Marshal(params)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a new request
	req, err := http.NewRequest("POST", "https://api.pdfshift.io/v3/convert/pdf", bytes.NewBuffer(jsonParams))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set request headers
	req.Header.Set("Content-Type", "application/json")

	// Set basic authentication header
	auth := "api:" + apiKey
	req.Header.Set("Authorization", "Basic "+base64.StdEncoding.EncodeToString([]byte(auth)))

	// Perform the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error performing request:", err)
		return
	}
	defer resp.Body.Close()

	// Read response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Check response status code
	if resp.StatusCode >= 400 {
		fmt.Printf("Request failed with status code %d: %s\n", resp.StatusCode, string(body))
		return
	}

	// Save the PDF document
	err = ioutil.WriteFile("result.pdf", body, 0644)
	if err != nil {
		fmt.Println("Error saving PDF document:", err)
		return
	}

	fmt.Println("The PDF document was generated and saved to result.pdf")
}
```

This allows you to set specific HTTP headers that will be send along with the request PDFShift will make to your server.
It can be helpful to authenticate the request that your backend can check against before converting it to PDF.