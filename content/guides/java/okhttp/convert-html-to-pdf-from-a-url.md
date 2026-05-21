---
title: "Convert HTML to PDF from a URL"
description: "Learn how to convert HTML from a URL to PDF using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to convert online HTML content to PDF."
language: 'Java'
library: 'OkHTTP'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'loading-css-from-a-url']
default: true
---

In this guide, we'll show you how to convert HTML from a URL to PDF using Java and the OkHTTP library.

Converting HTML from a URL to PDF is a common requirement when you want to generate PDFs from existing web content.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\"\n" +
    "}", MediaType.parse("application/json"));

Request request = new Request.Builder()
    .url("https://api.pdfshift.io/v3/convert/pdf")
    .addHeader("X-API-Key", apiKey)
    .post(body)
    .build();

try (Response response = client.newCall(request).execute()) {
    
    // Handle errors:
    if (!response.isSuccessful()) {
        throw new IOException("Request failed with status code " + response.code());
    }
    
    ResponseBody responseBody = response.body();
    if (responseBody != null) {
        java.nio.file.Files.write(
            java.nio.file.Paths.get("result.pdf"), 
            responseBody.bytes()
        );
    }
    
    System.out.println("The PDF document was generated and saved to result.pdf");
}
```

This allows you to easily convert any webpage to a PDF document.