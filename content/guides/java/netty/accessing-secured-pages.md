---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Java and the Netty library. This guide offers detailed steps with code samples in Java and the Netty library, highlighting how you can access page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Java'
library: 'Netty'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Java and the Netty library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```java
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.*;
import io.netty.util.CharsetUtil;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

EventLoopGroup group = new NioEventLoopGroup();
try {
    Bootstrap b = new Bootstrap();
    b.group(group)
        .channel(NioSocketChannel.class)
        .handler(new ChannelInitializer<SocketChannel>() {
            @Override
            public void initChannel(SocketChannel ch) {
                ChannelPipeline p = ch.pipeline();
                p.addLast(new HttpClientCodec());
                p.addLast(new HttpObjectAggregator(1024 * 1024));
            }
        });

    Channel ch = b.connect("api.pdfshift.io", 443).sync().channel();

    FullHttpRequest request = new DefaultFullHttpRequest(
        HttpVersion.HTTP_1_1, HttpMethod.POST, "/v3/convert/pdf");
    
    request.headers().set(HttpHeaderNames.HOST, "api.pdfshift.io");
    request.headers().set("X-API-Key", apiKey);
    request.headers().set(HttpHeaderNames.CONTENT_TYPE, "application/json");
    
    String payload = "{\n" +
        "  \"source\": \"https://www.example.com\",\n" +
        "  \"auth\": {\n" +
        "    \"username\": \"user\",\n" +
        "    \"password\": \"password\"\n" +
        "  }\n" +
        "}";
    
    request.content().writeBytes(payload.getBytes(CharsetUtil.UTF_8));
    request.headers().setInt(HttpHeaderNames.CONTENT_LENGTH, request.content().readableBytes());

    ChannelFuture f = ch.writeAndFlush(request);
    f.addListener(ChannelFutureListener.CLOSE);
    
    // Handle response and save PDF...
    
    System.out.println("The PDF document was generated and saved to result.pdf");
} finally {
    group.shutdownGracefully();
}
```

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.