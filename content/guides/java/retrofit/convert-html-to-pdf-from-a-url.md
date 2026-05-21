---
title: "Convert HTML to PDF from a URL"
description: "Learn how to convert HTML from a URL to PDF using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to convert online HTML content to PDF."
language: 'Java'
library: 'Retrofit'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'loading-css-from-a-url']
default: true
---

In this guide, we'll show you how to convert HTML from a URL to PDF using Java and the Retrofit library.

Converting HTML from a URL to PDF is a common requirement when you want to generate PDFs from existing web content.

```java
import retrofit2.*;
import retrofit2.converter.gson.GsonConverterFactory;
import com.google.gson.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
public interface PdfShiftApi {
    @POST("v3/convert/pdf")
    Call<ResponseBody> convertToPdf(
        @Header("X-API-Key") String apiKey,
        @Body JsonObject body
    );
}

// Usage
Gson gson = new GsonBuilder().create();
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.pdfshift.io/")
    .addConverterFactory(GsonConverterFactory.create(gson))
    .build();

PdfShiftApi api = retrofit.create(PdfShiftApi.class);

JsonObject payload = new JsonObject();
payload.addProperty("source", "https://www.example.com");

Call<ResponseBody> call = api.convertToPdf("sk_xxxxxxxxxxxx", payload);
Response<ResponseBody> response = call.execute();

// Handle errors:
if (!response.isSuccessful()) {
    throw new IOException("Request failed with status code " + response.code());
}

ResponseBody responseBody = response.body();
if (responseBody != null) {
    java.nio.file.Files.write(
        java.nio.file.Paths.get("result.pdf"), 
        responseBody.bytes()
    );
}

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to easily convert any webpage to a PDF document.