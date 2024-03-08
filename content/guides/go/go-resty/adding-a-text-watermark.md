---
title: "Adding a text watermark"
description: "Learn how to add text watermarks to your generated PDF document using Go and the Go-Resty library. With this guide, you'll be able to add watermarks on top of your generated PDFs easily with a quick request to PDFShift's API."
language: 'Go'
library: 'Go-Resty'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll walk you through the process of adding text watermarks to your PDF files, using PDFShift's API.

Adding a watermark to your PDF can be done by adding the `watermark` object to your query. Adding a text allows you to customize its content and PDFShift's API provides a few properties to help you customize the visual aspect, such as the font size, color, and position.

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
		"watermark": map[string]string{
			"text":       "PROTECTED DOCUMENT",
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

You can customize the text watermark by applying the following properties:

 * `font_size`: The size of the text. An integer value in pixels. Defaults to 16.
 * `font_family` : The font family to be used. Defaults to Helvetica.
 * `font_color` : The color of the text. A hexadecimal color value. Defaults to '000000'.
 * `font_opacity` : The opacity of the text. A float value between 0 and 100. Defaults to 100.
 * `font_bold`: A boolean to set the text as bold. Defaults to false.
 * `font_italic`: A boolean to set the text as italic. Defaults to false.

You can also customize the position of the text watermark by applying the following properties:

 * `offset_x`: The horizontal position of the text. Can be 'left', 'center', 'right', or a specific value in pixels. Defaults to 'center'.
 * `offset_y`: The vertical position of the text. Can be 'top', 'middle', 'bottom', or a specific value in pixels. Defaults to 'center'.

For the offset positions, we accept a value in integer which will be translated to pixels, but you can also pass a unit such as 'px', 'in', 'cm', 'mm', 'pt'.

For example:

```go
params = {
    "source": "https://www.example.com",
    "watermark": {
        "text": "PROTECTED DOCUMENT",
        "offset_x": "5cm",
        "offset_top": "15mm"
    }
}
```
