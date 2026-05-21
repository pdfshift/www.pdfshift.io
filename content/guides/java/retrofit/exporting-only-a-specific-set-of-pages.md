---
title: "Exporting only a specific set of pages"
description: "Learn how to export only specific pages from a document when converting to PDF using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to select specific pages for export."
language: 'Java'
library: 'Retrofit'
property: 'pages'
output: 'pdf'
related: ['generate-a-document-with-full-height', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to export only specific pages from a document when converting to PDF using Java and the Retrofit library.

When converting documents, you might want to export only a specific range of pages rather than the entire document.

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
payload.addProperty("pages", "1-3");

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

This allows you to selectively export pages from multi-page documents.