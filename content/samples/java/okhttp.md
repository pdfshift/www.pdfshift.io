---
language: 'Java'
library: 'OkHttp'
link: 'https://square.github.io/okhttp/'
---

[OkHttp](https://square.github.io/okhttp/) is a popular HTTP client library for Java and Android. It provides a simple and intuitive API for making HTTP requests and processing responses. OkHttp supports features like connection pooling, caching, interceptors, and asynchronous requests.

```java
import okhttp3.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PDFShift {

    private static final OkHttpClient client = new OkHttpClient();

    public static byte[] convert(String apiKey, String params, String endpoint) throws Exception {
        if (!endpoint.equals("pdf") && !endpoint.equals("png") && !endpoint.equals("jpg") && !endpoint.equals("webp")) {
            throw new IllegalArgumentException("Invalid endpoint");
        }

        String url = "https://api.pdfshift.io/v3/convert/" + endpoint;
        
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, params);
        Request request = new Request.Builder()
            .url(url)
            .method("POST", body)
            .addHeader("X-API-Key", apiKey)
            .addHeader("Content-Type", "application/json")
            .build();

        byte[] content;
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            content = response.body().bytes();
        }

        if (params.contains("\"filename\"") || params.contains("\"webhook\"")) {
            return new Gson().fromJson(new String(content.toByteArray()), JsonObject.class).toString().getBytes();
        }

        return content;
    }
}
```

```java
public static void main(String[] args) throws Exception {
    String apiKey = "sk_XXXXXXXXXXXXXX";
    String params = "{\"source\" : \"https://en.wikipedia.org/wiki/REST\"}";
    String endpoint = "pdf";

    byte[] result = convert(apiKey, params, endpoint);
    Files.write(Paths.get("result.pdf"), result);
}
```
