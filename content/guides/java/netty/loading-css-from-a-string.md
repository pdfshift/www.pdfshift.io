---
title: "Loading CSS from a string"
description: "Learn how to load CSS from a string when converting HTML to PDF using Java and the Netty library. This guide offers detailed steps with code samples in Java and the Netty library, showing how to apply inline CSS styling."
language: 'Java'
library: 'Netty'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to load CSS from a string when converting HTML to PDF using Java and the Netty library.

When converting HTML to PDF, you might want to apply CSS styling using inline CSS rather than external stylesheets.

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
        "  \"css\": \"body { font-family: Arial; } h1 { color: blue; }\"\n" +
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

This allows you to apply custom styling directly to your PDFs.