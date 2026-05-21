---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to customize PDF appearance with headers and footers."
language: 'Java'
library: 'Retrofit'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using Java and the Retrofit library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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
JsonObject header = new JsonObject();
header.addProperty("content", "<div style='text-align: center;'>Header Content</div>");
header.addProperty("height", "20mm");
JsonObject footer = new JsonObject();
footer.addProperty("content", "<div style='text-align: center;'>Footer Content</div>");
footer.addProperty("height", "20mm");
payload.add("header", header);
payload.add("footer", footer);

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

This allows you to add consistent branding elements to all your generated PDF documents.