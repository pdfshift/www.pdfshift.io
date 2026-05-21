---
title: "Adding an image watermark"
description: "Learn how to add image watermarks to your PDFs using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to apply image watermarks to protect your documents."
language: 'Java'
library: 'OkHTTP'
property: 'watermark'
output: 'pdf'
related: ['adding-a-text-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add image watermarks to your PDFs using Java and the OkHTTP library.

When generating PDFs, you might want to add image watermarks to your documents for protection or branding purposes.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"watermark\": {\n" +
    "    \"image\": \"https://example.com/watermark.png\",\n" +
    "    \"opacity\": 0.5,\n" +
    "    \"position\": \"center\"\n" +
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

This allows you to add visual protection to your documents with custom images.