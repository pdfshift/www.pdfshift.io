---
title: "Adding an image watermark"
description: "Discover how to effortlessly add image watermarks to PDFs using Go and the Go-Resty library. Our guide shows you how to add images on top of your PDF to protect your document easily. This is easily done with a simple request to PDFShift's API."
language: 'Go'
library: 'Go-Resty'
property: 'watermark'
output: 'pdf'
related: ['protecting-the-generated-pdf', 'adding-a-text-watermark']
default: false
---

In this guide, we'll walk you through the process of adding text watermarks to your PDF files, using PDFShift's API.

Adding a watermark to your PDF can be done by adding the `watermark` object to your query.
The advantage of providing an image is that you can add a visual stamp on top of each of your pages that are generated through PDFShift.

```go
package main

import (
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
		"watermark": map[string]string{
			"image":       "https://placekitten.com/200/300",
			"offset_x":   "center",
			"offset_top": "top",
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
		SetHeader("X-API-Key", apiKey).
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

The "image" parameter for the watermark can be used in two different values:

 * URL : A full URL to an image that will be used as the watermark.
 * Base64 : A base64 encoded image that will be used as the watermark.

Note that you can also rotate the image by passing the `rotate` parameter as a degree (or negative degree)

You can also customize the position of the text watermark by applying the following properties:

 * `offset_x`: The horizontal position of the text. Can be 'left', 'center', 'right', or a specific value in pixels. Defaults to 'center'.
 * `offset_y`: The vertical position of the text. Can be 'top', 'middle', 'bottom', or a specific value in pixels. Defaults to 'center'.

For the offset positions, we accept a value in integer which will be translated to pixels, but you can also pass a unit such as 'px', 'in', 'cm', 'mm', 'pt'.

For example:

```json
params = {
    "source": "https://www.example.com",
    "watermark": {
        "text": "PROTECTED DOCUMENT",
        "offset_x": "5cm",
        "offset_top": "15mm"
    }
}
```
