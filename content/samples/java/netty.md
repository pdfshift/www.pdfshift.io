---
language: 'Java'
library: 'Netty'
link: 'https://netty.io/'
---

[Netty](https://netty.io/) is a high-performance networking framework for building server-side and client-side applications in Java. It provides a flexible and event-driven architecture for handling network communication efficiently. Netty is commonly used for building scalable and low-latency network applications, such as web servers, proxy servers, and messaging systems.

```java
import io.netty.handler.codec.http.*;
import io.netty.buffer.Unpooled;
import io.netty.util.CharsetUtil;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class Convert {
    private static final String API_KEY = "sk_XXXXXXXXXXXXXX";
    private static final String HOST = "https://api.pdfshift.io/v3/convert/";
    
    private static byte[] convert(String apiKey, Map<String, String> params, String endpoint) throws Exception {
        if(!Arrays.asList("pdf", "png", "jpg", "webp").contains(endpoint)) {
            throw new IllegalArgumentException("Invalid endpoint");
        }

        String url = HOST + endpoint;
        String paramsJson = new Gson().toJson(params);

        FullHttpRequest request = new DefaultFullHttpRequest(
                HttpVersion.HTTP_1_1, HttpMethod.POST, url,
                Unpooled.copiedBuffer(paramsJson, CharsetUtil.UTF_8));

        request.headers().set(HttpHeaderNames.CONTENT_TYPE, "application/json");
        request.headers().set("X-API-Key", apiKey);
        

        HttpClient client = new HttpClient();
        FullHttpResponse response = client.sendRequest(request);

        if (!HttpResponseStatus.OK.equals(response.status())) {
            throw new RuntimeException("Failed : HTTP error code : " + response.status());
        }

        if (params.containsKey("filename") || params.containsKey("webhook")) {
            Map<String, Object> responseMap = new Gson().fromJson(
                    response.content().toString(CharsetUtil.UTF_8),
                    new TypeToken<Map<String, Object>>() {
                    }.getType());
            return responseMap;
        }

        return response.content().array();
    }
}
```

```java
public static void main(String[] args) {
    Map<String, String> params = new HashMap<>();
    params.put("source", "https://en.wikipedia.org/wiki/REST");
    
    byte[] result = convert(API_KEY, params, "pdf");
    Files.write(Paths.get("result.pdf"), result);
}
```
