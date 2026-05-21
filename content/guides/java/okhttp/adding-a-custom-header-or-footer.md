---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to customize PDF appearance with headers and footers."
language: 'Java'
library: 'OkHTTP'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using Java and the OkHTTP library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"header\": {\n" +
    "    \"content\": \"<div style='text-align: center;'>Header Content</div>\",\n" +
    "    \"height\": \"20mm\"\n" +
    "  },\n" +
    "  \"footer\": {\n" +
    "    \"content\": \"<div style='text-align: center;'>Footer Content</div>\",\n" +
    "    \"height\": \"20mm\"\n" +
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

This allows you to add consistent branding elements to all your generated PDF documents.