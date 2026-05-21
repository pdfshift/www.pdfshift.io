---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to customize PDF appearance with headers and footers."
language: 'Java'
library: 'HttpClient'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using Java and the HttpClient library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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
        "  \"header\": {\n" +
        "    \"content\": \"<div style='text-align: center;'>Header Content</div>\",\n" +
        "    \"height\": \"20mm\"\n" +
        "  },\n" +
        "  \"footer\": {\n" +
        "    \"content\": \"<div style='text-align: center;'>Footer Content</div>\",\n" +
        "    \"height\": \"20mm\"\n" +
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

This allows you to add consistent branding elements to all your generated PDF documents.