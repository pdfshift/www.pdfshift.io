---
title: "Exporting only a specific set of pages"
description: "Learn how to export only specific pages from a document when converting to PDF using Java and the Netty library. This guide offers detailed steps with code samples in Java and the Netty library, showing how to select specific pages for export."
language: 'Java'
library: 'Netty'
property: 'pages'
output: 'pdf'
related: ['generate-a-document-with-full-height', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to export only specific pages from a document when converting to PDF using Java and the Netty library.

When converting documents, you might want to export only a specific range of pages rather than the entire document.

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
        "  \"pages\": \"1-3\"\n" +
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

This allows you to selectively export pages from multi-page documents.