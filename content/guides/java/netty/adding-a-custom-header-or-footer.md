---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using Java and the Netty library. This guide offers detailed steps with code samples in Java and the Netty library, showing how to customize PDF appearance with headers and footers."
language: 'Java'
library: 'Netty'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using Java and the Netty library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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
        "  \"header\": {\n" +
        "    \"content\": \"<div style='text-align: center;'>Header Content</div>\",\n" +
        "    \"height\": \"20mm\"\n" +
        "  },\n" +
        "  \"footer\": {\n" +
        "    \"content\": \"<div style='text-align: center;'>Footer Content</div>\",\n" +
        "    \"height\": \"20mm\"\n" +
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

This allows you to add consistent branding elements to all your generated PDF documents.