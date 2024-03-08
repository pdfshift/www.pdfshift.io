---
title: "Define a time limit"
description: "Learn how to set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted. This guides explains you how to achieve it using Go and the Go-Resty library."
language: 'Go'
library: 'Go-Resty'
property: 'timeout'
output: 'pdf'
related: ['waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how you can set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted.

In some cases, this can be useful if you want the request to not be too long and then handle failure on your end depending on the result.

To do so, we use the `timeout` property, which is the maximum time in **seconds** that the request is allowed to take. If the request takes longer than the defined time, the conversion will be aborted.

```go
package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"github.com/go-resty/resty/v2"
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
	// Create a new Resty client
	client := resty.New()

	// Perform the request
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetBasicAuth("api", apiKey).
		SetBody(jsonParams).
		Post("https://api.pdfshift.io/v3/convert/pdf")

	if err != nil {
		fmt.Println("Error performing request:", err)
		return
	}

	// Check response status code
	if resp.StatusCode() >= 400 {
		fmt.Printf("Request failed with status code %d: %s\n", resp.StatusCode(), string(resp.Body()))
		return
	}

	// Save the PDF document
	err = ioutil.WriteFile("result.pdf", resp.Body(), 0644)
	if err != nil {
		fmt.Println("Error saving PDF document:", err)
		return
	}

	fmt.Println("The PDF document was generated and saved to result.pdf")
}
```

In the above example, the conversion could fail if the conversion takes longer than 10 seconds.