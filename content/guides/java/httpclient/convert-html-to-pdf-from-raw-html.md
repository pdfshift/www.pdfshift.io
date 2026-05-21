---
title: "Convert HTML to PDF from raw HTML"
description: "Learn how to convert raw HTML to PDF using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to convert HTML content directly to PDF."
language: 'Java'
library: 'HttpClient'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'loading-css-from-a-string']
default: true
---

In this guide, we'll show you how to convert raw HTML to PDF using Java and the HttpClient library.

Converting raw HTML content to PDF is useful when you have HTML content that isn't hosted on a web server.

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
        "  \"source\": \"<html><body><h1>Hello World</h1></body></html>\"\n" +
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

This allows you to convert HTML content directly to PDF without needing a URL.