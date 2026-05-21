---
title: "Protecting the generated PDF"
description: "Learn how to protect generated PDFs with passwords using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to secure your PDF documents."
language: 'Java'
library: 'OkHTTP'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: false
---

In this guide, we'll show you how to protect generated PDFs with passwords using Java and the OkHTTP library.

When generating PDFs, you might want to add password protection to restrict access.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"protection\": {\n" +
    "    \"user_password\": \"user123\",\n" +
    "    \"owner_password\": \"owner123\"\n" +
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

This allows you to secure your PDF documents with passwords.