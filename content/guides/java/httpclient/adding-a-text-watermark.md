---
title: "Adding a text watermark"
description: "Learn how to add text watermarks to your PDFs using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to apply text watermarks to protect your documents."
language: 'Java'
library: 'HttpClient'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add text watermarks to your PDFs using Java and the HttpClient library.

When generating PDFs, you might want to add text watermarks to your documents for protection or branding purposes.

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
        "  \"watermark\": {\n" +
        "    \"text\": \"CONFIDENTIAL\",\n" +
        "    \"opacity\": 0.3,\n" +
        "    \"size\": \"20px\",\n" +
        "    \"color\": \"#000000\"\n" +
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

This allows you to add textual protection to your documents with customizable text.