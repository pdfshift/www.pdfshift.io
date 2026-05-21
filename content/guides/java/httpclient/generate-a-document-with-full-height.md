---
title: "Generate a document with full height"
description: "Learn how to generate a document with full height using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to create full-height PDFs."
language: 'Java'
library: 'HttpClient'
property: 'full_height'
output: 'pdf'
related: ['exporting-only-a-specific-set-of-pages', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to generate a document with full height using Java and the HttpClient library.

When converting documents to PDF, you might want to ensure the entire document height is preserved.

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
        "  \"full_height\": true\n" +
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

This ensures the entire document content is included in the PDF.