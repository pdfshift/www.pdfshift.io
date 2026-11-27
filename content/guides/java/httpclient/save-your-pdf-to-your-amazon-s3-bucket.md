---
title: "Save your PDF to your Amazon S3 bucket"
description: "Learn how to save your PDF to your Amazon S3 bucket using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to store PDFs directly in AWS S3."
language: 'Java'
library: 'HttpClient'
property: 's3_destination'
output: 's3'
related: ['save-your-pdf-online-and-get-back-a-url', 'receive-a-webhook-event']
default: true
---

In this guide, we'll show you how to save your PDF to your Amazon S3 bucket using Java and the HttpClient library.

When generating PDFs, you might want to store them directly in Amazon S3 for easy access and management.

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
        "  \"s3_destination\": \"s3://your-bucket-name/path/to/document.pdf\"\n" +
        "}"))
    .build();

HttpResponse<String> response = client.send(request, BodyHandlers.ofString());

// Handle errors:
if (response.statusCode() >= 400) {
    throw new RuntimeException("Request failed with status code " + response.statusCode());
}

System.out.println(response.body());
```

This allows you to store PDFs directly in your AWS S3 buckets.