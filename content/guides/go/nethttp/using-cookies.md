---
title: "Using cookies to convert HTML documents to PDF"
description: "Learn how to add custom Cookies when requesting an URL to be converted in PDF with PDFShift's API. It allows you to pursue an active session for instance, that will authenticate the request as a specific user before converting the page to PDF. This guide explains you how using Go and the Net/HTTP library."
language: 'Go'
library: 'Net/HTTP'
property: 'cookies'
output: 'pdf'
related: ['send-custom-http-headers', 'accessing-secured-pages']
default: true
---

In this comprehensive guide, we will demonstrate the step-by-step process of incorporating custom Cookies into your URL request for PDF conversion using PDFShift's API. By leveraging this functionality, you can maintain an active session, enabling authentication as a specific user before generating the PDF document.

To do so, we'll use the `cookies` parameter when sending a request to PDFShift. It expects a list of dictionnary that contains the name and the value of the cookies (more details after):

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
		// The "cookies" parameter expects a list of dictionnary that contains the name and the value of the cookies
		"cookies": []map[string]string{
			{"name": "PHPSESSID", "value": "el4ukv0kqbvoirg7nkp4dncpk3"},
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

The `cookies` parameter accept the following parameters:

 * `name` : The name of the cookie.
 * `value`: The value of the cookie.
 * `secure`: A boolean (defaults to false) that will tell the browser to only send the cookie if the request is being sent over HTTPS.
 * `http_only`: A boolean (defaults to false) that will tell the browser to not expose it to client-side scripts.

Like in our guide to send custom HTTP headers or to access secured pages, this allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
