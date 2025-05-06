---
title: "Generate a document with full height"
description: "Learn to generate full-height documents dynamically with our step-by-step guide. This will allow you to create documents with a dynamic height, based on the content of the document. This guide provides Go code samples using the Net/HTTP library to help you generate full-height documents with PDFShift's API."
language: 'Go'
library: 'Net/HTTP'
property: 'format'
output: 'pdf'
default: true
---

In this guide, we'll show you how to generate a document with full height dynamically using Go and the Net/HTTP library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to generate a document with full height dynamically. This can be done by setting the `format` parameter to the request and passing it a custom "auto" value for the `{height}` part.


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
		"source": "https://www.example.com",
		"format": "1280xauto",
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

The format parameter can accept various values, such as 'Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'.

But it can also accept a custom values that is defined per the width and height as follow: `{width}x{height}`

Both `width` and `height` are pixel value by default, but if you precise the unit (in "cm", "mm", "in" or "pt"). That unit will be used instead.

For instance, you can set a format of:

```json
{
    "source": "https://www.example.com",
    "format": "21cmx29,7cm"
}
```

Now, if you want a "liquid" height, which will analyze the height of the page and use it as your format, you can set the `{height}` value to `auto`.
So, instead of setting a fixed height such as `'format': '1280x1024'`, you can set `'format': '1280xauto'` and the height will be calculated based on the content of the page.