---
title: "Adding a custom header or footer"
description: "Discover how to add custom headers or footers to a PDF using Go and the Go-Resty library. This in-depth guide includes Go codes that you can easily follow and quickly generate documents with PDFShift's API."
language: 'Go'
library: 'Go-Resty'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers or footers to a PDF using Go and the Go-Resty library.

We'll focus this guide on the `header` parameter, but know that the `footer` parameter works _exactly_ the same way.

The `header` parameter is an object that accepts the following parameters:

 * `source`: The source of the header. It can be a URL or a raw HTML document. You can also provide some variables that we'll explain at the bottom of this guide.
 * `height`: The height of the header. By default, the height is in pixels, but you can also use `mm`, `cm` or `in` as units, like `10mm`.
 * `start_at`: The page number where the header should start. By default, the header will start at the first page.


**NOTE**: You must provide the full data in the header/footer, and not via a network request. Loading files such as external CSS, Js or Fonts won't work in the header or footer.
Instead, we recommend you to embed them in Base64.

Here's an example:

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
	// Define the API key
	apiKey := "sk_xxxxxxxxxxxx"

	// Define the request parameters
	params := map[string]interface{}{
		"source": "https://en.wikipedia.org/wiki/PDF",
		"header": map[string]interface{}{
			"source":    "<div>Page {{ page }} over a total of {{ total }}. Made on {{ date }}</div>",
			"height":    150,
			"start_at":  2,
		},
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

The `source` parameter present in the header/footer accepts a set of variables that will be translated when converting the document.

Here are the properties you can use:

 * `{{ title }}`: The title of the document.
 * `{{ url }}`: The URL of the document.
 * `{{ page }}`: The current page number.
 * `{{ total }}`: The total number of pages in the document.
 * `{{ date }}`: The current date in the format `M/D/YY-H:MM am/pm` such as "3/16/24, 2:04 PM".


This will allow you to generate a document that looks more like a printable version of a website, with page number and customized header and footer.