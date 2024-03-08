---
title: "Loading Javascript from a URL"
description: "Follow this guide to add custom javascript to your page before converting it to PDF. Using a URL allows you to later be able to change the content of the javascript without having to update the query made to PDFShift. Learn how you can implement this using Go and the Net/HTTP library to call the PDFShift's API."
language: 'Go'
library: 'Net/HTTP'
property: 'javascript'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string']
default: true
---

In this guide, we'll show you how to load custom javascript as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom Js to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw javascript content, as it allows you to later modify that javascript without having to modify the query made to PDFShift.

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
		"javascript": "https://www.example.com/custom.js"
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

The `javascript` parameter accepts either a string or a URL. It will be used as the javascript for the page when converting it to PDF. This allows you to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.