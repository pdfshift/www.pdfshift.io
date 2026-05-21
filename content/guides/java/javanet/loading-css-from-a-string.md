---
title: "Loading CSS from a string"
description: "Learn how to load CSS from a string when converting HTML to PDF using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to apply inline CSS styling."
language: 'Java'
library: 'Java.net'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to load CSS from a string when converting HTML to PDF using Java and the Java.net library.

When converting HTML to PDF, you might want to apply CSS styling using inline CSS rather than external stylesheets.

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
    "  \"css\": \"body { font-family: Arial; } h1 { color: blue; }\"\n" +
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

This allows you to apply custom styling directly to your PDFs.