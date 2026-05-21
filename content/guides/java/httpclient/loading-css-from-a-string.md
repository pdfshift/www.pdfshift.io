---
title: "Loading CSS from a string"
description: "Learn how to load CSS from a string when converting HTML to PDF using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to apply inline CSS styling."
language: 'Java'
library: 'HttpClient'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to load CSS from a string when converting HTML to PDF using Java and the HttpClient library.

When converting HTML to PDF, you might want to apply CSS styling using inline CSS rather than external stylesheets.

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
        "  \"css\": \"body { font-family: Arial; } h1 { color: blue; }\"\n" +
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

This allows you to apply custom styling directly to your PDFs.