---
title: "Define a time limit"
description: "Learn how to define a time limit for PDF conversions using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to set timeouts to prevent long-running conversions."
language: 'Java'
library: 'OkHTTP'
property: 'timeout'
output: 'pdf'
related: ['avoid-conversion-on-error', 'define-a-time-limit']
default: false
---

In this guide, we'll show you how to define a time limit for PDF conversions using Java and the OkHTTP library.

When converting documents to PDF, you might want to set a timeout to prevent long-running conversions from blocking your application.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient.Builder()
    .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
    .readTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
    .build();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"timeout\": 30\n" +
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

This allows you to control how long a conversion can take before timing out.