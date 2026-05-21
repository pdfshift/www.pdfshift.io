---
title: "Adding an image watermark"
description: "Learn how to add image watermarks to your PDFs using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to apply image watermarks to protect your documents."
language: 'Java'
library: 'Retrofit'
property: 'watermark'
output: 'pdf'
related: ['adding-a-text-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add image watermarks to your PDFs using Java and the Retrofit library.

When generating PDFs, you might want to add image watermarks to your documents for protection or branding purposes.

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
JsonObject watermark = new JsonObject();
watermark.addProperty("image", "https://example.com/watermark.png");
watermark.addProperty("opacity", 0.5);
watermark.addProperty("position", "center");
payload.add("watermark", watermark);

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

This allows you to add visual protection to your documents with custom images.