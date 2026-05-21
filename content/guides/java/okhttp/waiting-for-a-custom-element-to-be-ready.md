---
title: "Waiting for a custom element to be ready"
description: "Learn how to wait for a custom element to be ready when converting HTML to PDF using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to handle dynamic content."
language: 'Java'
library: 'OkHTTP'
property: 'wait_for'
output: 'pdf'
related: ['loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to wait for a custom element to be ready when converting HTML to PDF using Java and the OkHTTP library.

When converting HTML containing dynamic content, you might need to wait for specific elements to be rendered before generating the PDF.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"wait_for\": \"#dynamic-content.loaded\"\n" +
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

This allows you to ensure dynamic content is fully loaded before PDF generation.