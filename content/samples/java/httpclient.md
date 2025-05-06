---
language: 'Java'
library: 'HttpClient'
link: 'https://openjdk.org/groups/net/httpclient/intro.html'
---

[HttpClient](https://openjdk.org/groups/net/httpclient/intro.html) is a class provided by the Java standard library that facilitates making HTTP requests and receiving HTTP responses. It offers a simple and flexible API for performing tasks such as sending GET, POST, PUT, and DELETE requests, handling headers and content, managing cookies, and configuring timeouts and other request parameters.

```java
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.nio.file.Files;
import java.nio.file.Paths;

public class PDFConvert {

    public byte[] convert(String apiKey, String params, String endpoint) throws Exception {
        if (!endpoint.equals("pdf") && !endpoint.equals("png") && !endpoint.equals("jpg") && !endpoint.equals("webp")) {
            throw new Exception("Invalid endpoint");
        }

        HttpClient httpClient = HttpClients.createDefault();

        HttpPost request = new HttpPost("https://api.pdfshift.io/v3/convert/" + endpoint);
        request.setHeader("Content-Type", "application/json");
        request.setHeader("X-API-Key", apiKey);

        StringEntity entity = new StringEntity(params);
        request.setEntity(entity);

        HttpResponse response = httpClient.execute(request);

        if (response.getStatusLine().getStatusCode() != 200) {
            throw new Exception("Http request failed with status code: " + response.getStatusLine().getStatusCode());
        }

        byte[] binary = EntityUtils.toByteArray(response.getEntity());

        if (params.contains("\"filename\"") || params.contains("\"webhook\"")) {
            return EntityUtils.toString(response.getEntity()).getBytes();
        }

        return binary;
    }
}
```

```java
public static void main(String[] args) {
    try {
        String apiKey = "sk_XXXXXXXXXXXXXX";
        String params = "{\"source\": \"https://en.wikipedia.org/wiki/REST\"}";

        PDFConvert pdfConvert = new PDFConvert();
        byte[] binary = pdfConvert.convert(apiKey, params, "pdf");

        Files.write(Paths.get("result.pdf"), binary);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```
