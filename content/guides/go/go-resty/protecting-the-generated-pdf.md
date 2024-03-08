---
title: "Protecting the generated PDF"
description: "Learn how to protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Go and the Go-Resty library and relies on the PDFShift's API."
language: 'Go'
library: 'Go-Resty'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: false
---

In this guide, we'll show you how you can protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Go and the Go-Resty library and relies on the PDFShift's API.

One of the most useful feature here is the ability to set a password for the owner and the user of the PDF. This allows you to protect your document from anyone and restrict its access to only a few people.

PDFShift allows you to do this easily by adding the `protection` object to your query.

Here's a sample:

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
		"protection": map[string]interface{}{
			"owner_password": "owner_password",
			"user_password":  "user_password",
			"no_print":       true,
			"no_modify":      true,
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

Adding the `protection` object to your query will tell PDFShift to generate a PDF that will be password protected.

The `protection` object accepts the following parameters:

 * `author` : The name of the author in the PDF metadata.
 * `owner_password`: The password set for the owner.
 * `user_password`: The password set for the user.
 * `no_print`: If set to `True`, the user won't be able to print the PDF. (Only the owner)
 * `no_modify`: If set to `True`, the user won't be able to modify the PDF. (Only the owner)
 * `no_copy`: If set to `True`, the user won't be able to copy the content of the PDF. (Only the owner)


**IMPORTANT**:
It is important to note that most PDF reader don't respect the protection parameter. For instance, if you set the user_password to none (allowing anyone to view the PDF) but set the owner_password and block the modify, print and copy, most PDF reader will still allow user (and not owners) to modify, print and copy the PDF. This is a limitation of the PDF format and not PDFShift.
