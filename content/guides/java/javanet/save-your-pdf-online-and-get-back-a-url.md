---
title: "Save your PDF online and get back a URL"
description: "Learn how to save your PDF online and get back a URL using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to store PDFs in cloud storage and retrieve URLs."
language: 'Java'
library: 'Java.net'
property: 'output'
output: 'url'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF online and get back a URL using Java and the Java.net library.

When generating PDFs, you might want to store them in cloud storage and get a URL to access them later.

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
    "  \"output\": {\n" +
    "    \"type\": \"url\",\n" +
    "    \"url\": \"https://your-storage.com/\"\n" +
    "  }\n" +
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

InputStream inputStream = connection.getInputStream();
FileOutputStream outputStream = new FileOutputStream("result.pdf");
byte[] buffer = new byte[1024];
int bytesRead;
while ((bytesRead = inputStream.read(buffer)) != -1) {
    outputStream.write(buffer, 0, bytesRead);
}
outputStream.close();
inputStream.close();

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to store PDFs in cloud storage and access them via URLs.