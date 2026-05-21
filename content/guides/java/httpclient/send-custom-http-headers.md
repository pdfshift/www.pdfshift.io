---
title: "Send custom HTTP headers"
description: "Learn how to send custom HTTP headers when converting HTML to PDF using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to customize request headers."
language: 'Java'
library: 'HttpClient'
property: 'headers'
output: 'pdf'
related: ['accessing-secured-pages', 'using-cookies']
default: false
---

In this guide, we'll show you how to send custom HTTP headers when converting HTML to PDF using Java and the HttpClient library.

When converting HTML to PDF, you might need to send custom HTTP headers to access protected resources or provide additional information.

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
        "  \"headers\": {\n" +
        "    \"authorization\": \"Bearer token123\",\n" +
        "    \"user-agent\": \"MyApp/1.0\"\n" +
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

This allows you to customize the HTTP requests sent to the source URL.