---
title: "Avoid conversion on error"
description: "Learn how to avoid conversion on error using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to handle conversion errors gracefully."
language: 'Java'
library: 'OkHTTP'
property: 'continue_on_error'
output: 'pdf'
related: ['define-a-time-limit', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to avoid conversion on error using Java and the OkHTTP library.

When converting documents to PDF, you might want to prevent conversion if certain errors occur to avoid generating invalid PDFs.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"continue_on_error\": false\n" +
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

This allows you to fail fast when conversion issues occur.