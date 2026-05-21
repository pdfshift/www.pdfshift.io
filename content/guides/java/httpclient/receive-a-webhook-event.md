---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when PDF conversion is complete using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to handle asynchronous conversion notifications."
language: 'Java'
library: 'HttpClient'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to receive webhook events when PDF conversion is complete using Java and the HttpClient library.

When converting documents asynchronously, you might want to be notified when the conversion is complete via a webhook.

```java
import java.net.http.*;
import java.net.URI;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
    .header("X-API-Key", apiKey)
    .header("Content-Type", "application/json")
    .POST(BodyPublishers.ofString("{\n" +
        "  \"source\": \"https://www.example.com\",\n" +
        "  \"webhook\": {\n" +
        "    \"url\": \"https://your-server.com/webhook\",\n" +
        "    \"secret\": \"your-secret-key\"\n" +
        "  }\n" +
        "}"))
    .build();

HttpResponse<byte[]> response = client.send(request, BodyHandlers.ofByteArray());

// Handle errors:
if (response.statusCode() >= 400) {
    throw new RuntimeException("Request failed with status code " + response.statusCode());
}

java.nio.file.Files.write(java.nio.file.Paths.get("result.pdf"), response.body());

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to be notified when conversions are complete without polling.