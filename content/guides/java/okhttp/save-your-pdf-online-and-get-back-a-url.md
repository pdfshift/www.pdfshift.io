---
title: "Save your PDF online and get back a URL"
description: "Learn how to save your PDF online and get back a URL using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to store PDFs in cloud storage and retrieve URLs."
language: 'Java'
library: 'OkHTTP'
property: 'output'
output: 'url'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF online and get back a URL using Java and the OkHTTP library.

When generating PDFs, you might want to store them in cloud storage and get a URL to access them later.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"output\": {\n" +
    "    \"type\": \"url\",\n" +
    "    \"url\": \"https://your-storage.com/\"\n" +
    "  }\n" +
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

This allows you to store PDFs in cloud storage and access them via URLs.