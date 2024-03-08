---
title: "Receive a webhook event"
description: "Receive a notification via a POST request on your server once the conversion was done. This allows you to trigger a massive amount of conversion without having to wait on their results, and get notified once they are done. This guides will show you how to receive webhook events in Go and the Net/HTTP library to call the PDFShift's API."
language: 'Go'
library: 'Net/HTTP'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'save-your-pdf-to-your-amazon-s3-bucket']
default: true
---

In this guide, we'll show you how you can receive a notification via a POST request on your server once the conversion was done. This allows you to trigger a massive amount of conversion without having to wait on their results, and get notified once they are done.

For this guide, we are going to use the "webhook" parameter when sending a request to PDFShift. It expects a URL to which the POST request will be sent once the conversion is done.

Here's a sample:

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
		"javascript": "https://enyygzdj8jy9b.x.pipedream.net/"
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

	fmt.Println("The PDF document was generated and you will receive an event on your webhook once it is done.")
}
```

(Please note that the webhook requires a valid API key)

We used Requestbin.com to generate a endpoint that will receive our POST event, but you can set your own endpoint with custom parameters.

When sending the above request to PDFShift, the response will be immediate with a status code of 202 (Request accepted), with the following JSON body:

```json
{
    "success":true,
    "queued":true
}
```


Once the conversion is actually done at PDFShift, you will receive a POST request containing the following JSON body:

```json
{
    "success": true,
    "url": "https://pdfshift.s3.amazonaws.com/d/2/2024-03/39775239d74d4accbabb709800f034d2/8a3ec881-fa69-4059-9c71-0f40c633317e.pdf",
    "filesize": 34980,
    "duration": 1058,
    "response": {
        "status-code": 200,
        "content-length": 0,
        "requests": 0,
        "duration": 934.5173301696777
    },
    "executed": "2024-03-06T09:10:10.981098",
    "pdf_pages": 1
}
```

It might occur that the conversion fails, for instance if PDFShift can't access the page or if there is any parameter that cause the loading page to fail (page taking to long to load, etc).

In this case, the POST request will contain the following JSON body:

```json

```

This can be useful if you don't need to wait for the conversion to continue your process. For instance, when generating all the invoices from last month's payment, you can trigger the conversions and save the PDF on your webhook's destination. This way, you can continue your process without having to wait for the conversion to be done.