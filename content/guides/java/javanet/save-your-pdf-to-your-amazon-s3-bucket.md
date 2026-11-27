---
title: "Save your PDF to your Amazon S3 bucket"
description: "Learn how to save your PDF to your Amazon S3 bucket using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to store PDFs directly in AWS S3."
language: 'Java'
library: 'Java.net'
property: 's3_destination'
output: 's3'
related: ['save-your-pdf-online-and-get-back-a-url', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF to your Amazon S3 bucket using Java and the Java.net library.

When generating PDFs, you might want to store them directly in Amazon S3 for easy access and management.

```java
import java.net.*;
import java.io.*;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

URL url = new URL("https://api.pdfshift.io/v3/convert/pdf");
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
connection.setRequestMethod("POST");
connection.setRequestProperty("X-API-Key", apiKey);
connection.setRequestProperty("Content-Type", "application/json");
connection.setDoOutput(true);

String payload = "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"s3_destination\": \"s3://your-bucket-name/path/to/document.pdf\"\n" +
    "}";

try (OutputStream os = connection.getOutputStream()) {
    byte[] input = payload.getBytes("utf-8");
    os.write(input, 0, input.length);
}

int responseCode = connection.getResponseCode();

// Handle errors:
if (responseCode >= 400) {
    throw new RuntimeException("Request failed with status code " + responseCode);
}

String body = new String(connection.getInputStream().readAllBytes(), "utf-8");
System.out.println(body);
```

This allows you to store PDFs directly in your AWS S3 buckets.