---
title: "Loading CSS from a URL"
description: "Learn how to load CSS from a URL when converting HTML to PDF using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to reference external CSS files."
language: 'Java'
library: 'OkHTTP'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-string', 'convert-html-to-pdf-from-a-url']
default: false
---

In this guide, we'll show you how to load CSS from a URL when converting HTML to PDF using Java and the OkHTTP library.

When converting HTML to PDF, you might want to reference external CSS files to maintain consistent styling.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"css\": \"https://example.com/styles.css\"\n" +
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

This allows you to apply external stylesheets to your PDFs.