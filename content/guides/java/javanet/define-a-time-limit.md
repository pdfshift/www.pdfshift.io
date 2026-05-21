---
title: "Define a time limit"
description: "Learn how to define a time limit for PDF conversions using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to set timeouts to prevent long-running conversions."
language: 'Java'
library: 'Java.net'
property: 'timeout'
output: 'pdf'
related: ['avoid-conversion-on-error', 'define-a-time-limit']
default: false
---

In this guide, we'll show you how to define a time limit for PDF conversions using Java and the Java.net library.

When converting documents to PDF, you might want to set a timeout to prevent long-running conversions from blocking your application.

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
// Set a timeout in milliseconds
connection.setConnectTimeout(30000);
connection.setReadTimeout(30000);

String payload = "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"timeout\": 30\n" +
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

This allows you to control how long a conversion can take before timing out.