---
title: "Exporting only a specific set of pages"
description: "Learn how to export only specific pages from a document when converting to PDF using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to select specific pages for export."
language: 'Java'
library: 'OkHTTP'
property: 'pages'
output: 'pdf'
related: ['generate-a-document-with-full-height', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to export only specific pages from a document when converting to PDF using Java and the OkHTTP library.

When converting documents, you might want to export only a specific range of pages rather than the entire document.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"pages\": \"1-3\"\n" +
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

This allows you to selectively export pages from multi-page documents.