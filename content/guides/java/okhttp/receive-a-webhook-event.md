---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when PDF conversion is complete using Java and the OkHTTP library. This guide offers detailed steps with code samples in Java and the OkHTTP library, showing how to handle asynchronous conversion notifications."
language: 'Java'
library: 'OkHTTP'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to receive webhook events when PDF conversion is complete using Java and the OkHTTP library.

When converting documents asynchronously, you might want to be notified when the conversion is complete via a webhook.

```java
import okhttp3.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

OkHttpClient client = new OkHttpClient();

RequestBody body = RequestBody.create(
    "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"webhook\": {\n" +
    "    \"url\": \"https://your-server.com/webhook\",\n" +
    "    \"secret\": \"your-secret-key\"\n" +
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

This allows you to be notified when conversions are complete without polling.