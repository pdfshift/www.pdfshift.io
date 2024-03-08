---
title: "Waiting for a custom element to be ready"
description: "Learn how to set up a custom javascript function that will waits for a specific condition to become true before allowing the conversion to happen. This is very interesting for waiting on charts to be generated, or custom fonts to be loaded. With PDFShift's API, this can easily be done using Go and the Go-Resty library."
language: 'Go'
library: 'Go-Resty'
property: 'wait_for'
output: 'pdf'
related: ['define-a-time-limit', 'loading-javascript-from-a-string']
default: false
---

The `wait_for` parameter is one of the most powerful feature of PDFShift. It allows you to control when the document is ready to be converted to PDF.

For instance, you might need the `wait_for` parameter to wait on your charts to be visible.

It makes sense because from our engine point of view, all the resources are loaded so the conversion to PDF can be executed. But from your page stand point, even though everything is loaded, _not everything is rendered_!

So by using the `wait_for` parameter, you can tell PDFShift to wait for a specific condition to be true before allowing the conversion to happen.

That property **expects a string which points to a global function**.

For instance, if in your HTML page, you have the following script:

```javascript
<script>
function isPageReady() {
    return document.getElementById('chart').clientHeight > 0;
}
</script>
```

You can set the `wait_for` parameter to `isPageReady` and PDFShift will wait for the `isPageReady` function to return `true` before converting the page to PDF.


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
		"source": "https://www.example.com",
		"wait_for": "isPageReady"
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

In case your page doesn't have the javascript function available, but you still need to wait on some elements to be rendered before continuing the conversion, you can add javascript code directly in the request and use it at the same time:

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
		"source": "https://www.example.com",
		"javascript": "let isFontReady = false; document.fonts.ready.then(() => isFontReady = true); function isPageReady() { return isFontReady; }",
		"wait_for": "isPageReady"
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

The above script will wait for all fonts to be ready before returning `true` for the `isPageReady` function.
PDFShift will then wait for the fonts to be ready, via the `isPageReady`, before converting the page to PDF.