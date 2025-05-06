---
title: "Define a time limit"
description: "Learn how to set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted. This guides explains you how to achieve it using Go and the Net/HTTP library."
language: 'Go'
library: 'Net/HTTP'
property: 'timeout'
output: 'pdf'
related: ['waiting-for-a-custom-element-to-be-ready']
default: true
---

In this guide, we'll show you how you can set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted.

In some cases, this can be useful if you want the request to not be too long and then handle failure on your end depending on the result.

To do so, we use the `timeout` property, which is the maximum time in **seconds** that the request is allowed to take. If the request takes longer than the defined time, the conversion will be aborted.

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	// You can get an API key at https://pdfshift.io
	apiKey := "sk_xxxxxxxxxxxx"

	params := map[string]interface{}{
		"source":  "https://www.example.com",
		"timeout": 10,
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
	req.Header.Set("X-API-Key", apiKey)

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

In the above example, the conversion could fail if the conversion takes longer than 10 seconds.