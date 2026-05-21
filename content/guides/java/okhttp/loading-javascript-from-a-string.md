---
title: "Loading JavaScript from a string"
description: "Learn how to load JavaScript from a string when converting HTML to PDF using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to include inline JavaScript."
language: 'Java'
library: 'OkHTTP'
property: 'javascript'
output: 'pdf'
related: ['loading-javascript-from-a-url', 'waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how to load JavaScript from a string when converting HTML to PDF using Java and the OkHTTP library.

When converting HTML to PDF, you might want to include JavaScript functionality using inline code.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"javascript\": \"document.body.style.backgroundColor = 'red';\"\n" +
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

This enables dynamic behavior in your PDFs.