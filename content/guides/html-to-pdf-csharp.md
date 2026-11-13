---
title: "HTML to PDF in C#: getting Chromium into your .NET deploy"
description: "HTML to PDF in C# on .NET 10: PuppeteerSharp downloads 564 MB of Chrome when your app starts, Playwright needs its own install step. Or call HttpClient."
date: "2026-11-13"
dateModified: "2026-11-13"
author: "Cyril Nicodème"
faq:
  - question: "Is there a free HTML to PDF library for C#?"
    answer: "Yes. PuppeteerSharp and Playwright for .NET are both MIT licensed and print modern HTML and CSS through Chromium. HtmlRenderer.PdfSharp is free too, but it supports HTML 4.01 and CSS level 2, so flexbox and grid layouts won't come out right."
  - question: "How do I convert a .cshtml Razor view to PDF?"
    answer: "Render the view to an HTML string first, then convert that string. For Razor components, ASP.NET Core's HtmlRenderer class (not the HtmlRenderer.PdfSharp package) renders a component to HTML outside of an HTTP request. Pass the string as the source in any of the snippets on this page."
  - question: "How do I add a watermark to a PDF in C#?"
    answer: "With PDFShift, add a watermark object (text or an image) to the same request that converts your HTML. Our C# watermark guide has the full HttpClient code."
---

You add PuppeteerSharp to your project, a 17 MB package, and the build passes. Then a fresh container starts and downloads 564 MB of Chrome before it can print a page. In C#, the NuGet package is never the browser. Either put Chromium in your image when you build it, or skip it and send one `HttpClient` POST to PDFShift.

::guide-figure{caption="What each C# route adds to your app, and when. Publish sizes are dotnet publish for linux-x64, browser sizes are the downloads on our Mac. Circle area is size. Our test on .NET 10, November 13, 2026."}
<svg viewBox="0 0 360 544" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2cs-life-title h2cs-life-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2cs-life-title">When each C# route gets its PDF engine</title>
<desc id="h2cs-life-desc">Four routes across three moments: publish, a separate install step, and app start. PDFShift through HttpClient adds nothing at publish, needs no install step, and sends one HTTPS POST when the app runs. PuppeteerSharp publishes 7.5 MB, has no install step, and downloads 564 MB of Chrome when the app starts. Playwright publishes 136 MB, of which 121 MB is Node.js, and needs an install step that downloads 572 MB of browsers. DinkToPdf publishes 0.2 MB, needs you to copy the libwkhtmltox native library yourself, and throws an exception without it.</desc>
<g style="font-size:12px;font-weight:600" fill="#4C556D" text-anchor="middle">
<text x="70" y="20">Publish</text>
<text x="180" y="20">Install step</text>
<text x="290" y="20">App start</text>
</g>
<rect x="4" y="32" width="352" height="112" rx="12" fill="#FFFFFF" stroke="#6C47FF"/>
<g stroke="#DBE4F2">
<line x1="4" y1="280" x2="356" y2="280"/>
<line x1="4" y1="412" x2="356" y2="412"/>
</g>
<g style="font-size:13px;font-weight:600" fill="#0A0C3D">
<text x="16" y="54">PDFShift with HttpClient</text>
<text x="16" y="178">PuppeteerSharp</text>
<text x="16" y="310">Playwright</text>
<text x="16" y="442">DinkToPdf</text>
</g>
<g style="font-size:12px" fill="#0A0C3D" text-anchor="middle">
<text x="70" y="96">nothing added</text>
<text x="180" y="96">none</text>
<text x="290" y="96">one HTTPS POST</text>
<circle cx="70" cy="216" r="4.1" fill="#4C556D"/>
<text x="70" y="270">7.5 MB</text>
<text x="180" y="220">none</text>
<circle cx="290" cy="216" r="35.7" fill="#4C556D"/>
<text x="290" y="270">564 MB Chrome</text>
<circle cx="70" cy="348" r="17.6" fill="#4C556D"/>
<text x="70" y="402">136 MB</text>
<circle cx="180" cy="348" r="36" fill="#4C556D"/>
<text x="180" y="402">572 MB browsers</text>
<text x="290" y="352">none</text>
<circle cx="70" cy="480" r="1.5" fill="#4C556D"/>
<text x="70" y="534">0.2 MB</text>
<text x="180" y="476">you copy</text>
<text x="180" y="492">libwkhtmltox</text>
<text x="290" y="476">throws</text>
<text x="290" y="492">without it</text>
</g>
</svg>
::

## When does PuppeteerSharp download Chrome?

When your code calls `DownloadAsync()`. That's usually at startup, so it runs on every machine and every fresh container your app starts on. The call fetched Chrome for Testing and its headless shell, 564 MB, into the folder you set as `CacheDir`. It took 7.4 seconds on our connection, and the first launch took another 2.1 seconds. Point `CacheDir` at a folder inside your image and run the download while you build it, and the call at startup finds the browser and skips the download.

Here's the code we ran on .NET 10 with PuppeteerSharp 25.15.0, reusing one open browser for every PDF:

```csharp
using PuppeteerSharp;
using PuppeteerSharp.Media;

var fetcher = new BrowserFetcher { CacheDir = "/app/chrome" };
var installed = await fetcher.DownloadAsync(); // returns at once when the folder already has Chrome

await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
{
    Headless = true,
    ExecutablePath = installed.GetExecutablePath()
});

async Task<byte[]> RenderPdf(string html)
{
    await using var page = await browser.NewPageAsync();
    await page.SetContentAsync(html);
    return await page.PdfDataAsync(new PdfOptions
    {
        Format = PaperFormat.A4,
        PrintBackground = true,
        PreferCSSPageSize = true
    });
}
```

Our 45-row invoice came out as 2 A4 pages, with "Page 1 of 2" from its `@page` rule and the table header repeated on page 2. Each PDF took about 1.1 seconds with the browser already open. If you copy an older snippet that waits for `networkidle0` inside `SetContentAsync`, 25.15 flags it as obsolete at build time. For memory growth, crashes and containers, see [our Puppeteer production guide](/guides/puppeteer-pdf-in-production/): its code is Node, but it's the same browser.

## How do you convert HTML to PDF in C# with Playwright?

Playwright for .NET (1.64.1) is a 204 MB download from NuGet. Most of it is Node.js, one build for each operating system: the .NET library drives a Node.js process, which drives the browser. `dotnet publish` for linux-x64 keeps only the Linux build, so your published app is 136 MB, 121 MB of it Node.js. The browsers come in a separate step: `Microsoft.Playwright.Program.Main(new[] { "install", "chromium" })` from code, or the `playwright.ps1 install` script in your image build. On our Mac that step downloaded 572 MB.

```csharp
using Microsoft.Playwright;

Microsoft.Playwright.Program.Main(new[] { "install", "chromium" }); // or run playwright.ps1 install in your image build

using var playwright = await Playwright.CreateAsync();
await using var browser = await playwright.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();
await page.SetContentAsync(html);
var pdf = await page.PdfAsync(new PagePdfOptions
{
    Format = "A4",
    PrintBackground = true,
    PreferCSSPageSize = true
});
await page.CloseAsync();
```

Don't skip the options. Without `Format`, Playwright prints on Letter paper, and without `PreferCSSPageSize` it scales your content to fit the paper instead of using your `@page` size. With them, it printed the same 2 pages as PuppeteerSharp, in about 0.56 seconds per PDF with the browser open. [Our Playwright production guide](/guides/playwright-pdf-in-production/) covers what changes when you run it under load.

## Can you still use DinkToPdf on .NET 10?

No, not out of the box. Here's what the README's basic example threw on its first call:

```
System.DllNotFoundException: Unable to load shared library 'libwkhtmltox' or one of its dependencies.
```

DinkToPdf 1.0.8 is a 240 KB wrapper with no native library inside. [Its README](https://github.com/rdvojmoc/DinkToPdf) tells you to copy the wkhtmltopdf library into your project yourself, a different file for each operating system. It has over 33 million downloads, and its last release was in April 2018. wkhtmltopdf itself is archived, and [its own status page](https://wkhtmltopdf.org/status.html) says not to use it with any untrusted HTML. If it's in your app today, replace it with either route above or the HttpClient call below.

## How do you convert HTML or a URL to PDF in C# with HttpClient?

On this route the browser is our problem. Send the HTML to PDFShift and get the PDF back. `HttpClient` and `System.Net.Http.Json` ship with .NET, so there's no package to add and nothing to install in your image:

```csharp
using System.Net.Http.Json;

var http = new HttpClient(); // create it once and reuse it, or get it from IHttpClientFactory
http.DefaultRequestHeaders.Add("X-API-Key", Environment.GetEnvironmentVariable("PDFSHIFT_API_KEY"));

var response = await http.PostAsJsonAsync("https://api.pdfshift.io/v3/convert/pdf", new
{
    source = html, // an HTML string, or a URL like "https://example.com/invoice/1042"
    format = "A4",
    use_print = true
});
response.EnsureSuccessStatusCode();
await File.WriteAllBytesAsync("invoice.pdf", await response.Content.ReadAsByteArrayAsync());
```

`source` takes either HTML or a web address, and PDFShift works out which. `use_print = true` renders your page with its print CSS, the same media the browser routes use. We sent the full invoice and got back the same 2 pages, page numbers and repeated header row included, in 1.96 seconds with the network.

::guide-figure{caption="Page 2 of the same invoice from Playwright and from one HttpClient call to PDFShift, drawn from the PDFs: the header row repeats and the footer reads Page 2 of 2 in both. The badge is the watermark on calls without a key. Our test on .NET 10, November 13, 2026."}
<svg viewBox="0 0 360 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2cs-page-title h2cs-page-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2cs-page-title">Page 2 of the invoice from Playwright and from PDFShift</title>
<desc id="h2cs-page-desc">Two A4 pages side by side. Both start with the table's header row, then rows 33 to 45, and both end with Page 2 of 2 in the bottom right corner. The PDFShift page has a small PDFShift badge in the top right, the watermark added to calls without an API key.</desc>
<g style="font-size:12px;font-weight:600" fill="#0A0C3D" text-anchor="middle">
<text x="92" y="18">Playwright</text>
<text x="268" y="18">PDFShift with HttpClient</text>
</g>
<rect x="12" y="30" width="160" height="226" fill="#FFFFFF" stroke="#DBE4F2"/>
<rect x="23.4" y="41.4" width="137.2" height="5.4" fill="#DBE4F2"/>
<rect x="25.4" y="43.3" width="3" height="1.6" fill="#0A0C3D"/>
<rect x="41.4" y="43.3" width="26" height="1.6" fill="#0A0C3D"/>
<rect x="107.4" y="43.3" width="3" height="1.6" fill="#0A0C3D"/>
<rect x="122.4" y="43.3" width="9" height="1.6" fill="#0A0C3D"/>
<rect x="140.4" y="43.3" width="11" height="1.6" fill="#0A0C3D"/>
<line x1="23.4" y1="52.2" x2="160.6" y2="52.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="48.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="48.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="48.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="48.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="48.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="57.6" x2="160.6" y2="57.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="54.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="54.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="54.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="54.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="54.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="63.0" x2="160.6" y2="63.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="59.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="59.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="59.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="59.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="59.5" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="68.4" x2="160.6" y2="68.4" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="64.9" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="64.9" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="64.9" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="64.9" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="64.9" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="73.8" x2="160.6" y2="73.8" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="70.3" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="70.3" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="70.3" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="70.3" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="70.3" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="79.2" x2="160.6" y2="79.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="75.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="75.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="75.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="75.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="75.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="84.6" x2="160.6" y2="84.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="81.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="81.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="81.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="81.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="81.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="90.0" x2="160.6" y2="90.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="86.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="86.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="86.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="86.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="86.5" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="95.4" x2="160.6" y2="95.4" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="91.9" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="91.9" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="91.9" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="91.9" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="91.9" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="100.8" x2="160.6" y2="100.8" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="97.3" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="97.3" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="97.3" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="97.3" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="97.3" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="106.2" x2="160.6" y2="106.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="102.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="102.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="102.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="102.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="102.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="111.6" x2="160.6" y2="111.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="108.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="108.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="108.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="108.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="108.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="23.4" y1="117.0" x2="160.6" y2="117.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="25.4" y="113.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="41.4" y="113.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="107.4" y="113.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="122.4" y="113.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="140.4" y="113.5" width="11" height="1.4" fill="#4C556D"/>
<text x="160.6" y="250" style="font-size:9px" fill="#0A0C3D" text-anchor="end">Page 2 of 2</text>
<rect x="188" y="30" width="160" height="226" fill="#FFFFFF" stroke="#DBE4F2"/>
<rect x="199.4" y="41.4" width="137.2" height="5.4" fill="#DBE4F2"/>
<rect x="201.4" y="43.3" width="3" height="1.6" fill="#0A0C3D"/>
<rect x="217.4" y="43.3" width="26" height="1.6" fill="#0A0C3D"/>
<rect x="283.4" y="43.3" width="3" height="1.6" fill="#0A0C3D"/>
<rect x="298.4" y="43.3" width="9" height="1.6" fill="#0A0C3D"/>
<rect x="316.4" y="43.3" width="11" height="1.6" fill="#0A0C3D"/>
<line x1="199.4" y1="52.2" x2="336.6" y2="52.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="48.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="48.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="48.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="48.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="48.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="57.6" x2="336.6" y2="57.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="54.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="54.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="54.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="54.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="54.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="63.0" x2="336.6" y2="63.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="59.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="59.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="59.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="59.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="59.5" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="68.4" x2="336.6" y2="68.4" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="64.9" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="64.9" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="64.9" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="64.9" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="64.9" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="73.8" x2="336.6" y2="73.8" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="70.3" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="70.3" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="70.3" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="70.3" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="70.3" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="79.2" x2="336.6" y2="79.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="75.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="75.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="75.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="75.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="75.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="84.6" x2="336.6" y2="84.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="81.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="81.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="81.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="81.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="81.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="90.0" x2="336.6" y2="90.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="86.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="86.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="86.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="86.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="86.5" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="95.4" x2="336.6" y2="95.4" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="91.9" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="91.9" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="91.9" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="91.9" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="91.9" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="100.8" x2="336.6" y2="100.8" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="97.3" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="97.3" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="97.3" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="97.3" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="97.3" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="106.2" x2="336.6" y2="106.2" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="102.7" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="102.7" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="102.7" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="102.7" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="102.7" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="111.6" x2="336.6" y2="111.6" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="108.1" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="108.1" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="108.1" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="108.1" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="108.1" width="11" height="1.4" fill="#4C556D"/>
<line x1="199.4" y1="117.0" x2="336.6" y2="117.0" stroke="#DBE4F2" style="stroke-width:0.5"/>
<rect x="201.4" y="113.5" width="3" height="1.4" fill="#4C556D"/>
<rect x="217.4" y="113.5" width="40" height="1.4" fill="#4C556D"/>
<rect x="283.4" y="113.5" width="2" height="1.4" fill="#4C556D"/>
<rect x="298.4" y="113.5" width="10" height="1.4" fill="#4C556D"/>
<rect x="316.4" y="113.5" width="11" height="1.4" fill="#4C556D"/>
<text x="336.6" y="250" style="font-size:9px" fill="#0A0C3D" text-anchor="end">Page 2 of 2</text>
<rect x="290.6" y="45.4" width="46" height="16" rx="3" fill="#FFFFFF" stroke="#4C556D" style="stroke-width:0.5"/>
<text x="313.6" y="56.4" style="font-size:8px;font-weight:600" fill="#6C47FF" text-anchor="middle">PDFShift</text>
</svg>
::

Requests without a key work too, watermarked and up to 10 a day. [Create a free account](/register/) for 50 credits a month, no card needed. Every parameter is in the [API docs](https://docs.pdfshift.io/), and [our HttpClient guides](/guides/csharp/httpclient/) show the same call with custom headers and footers, S3 uploads and webhooks.

## Should you skip HTML and build the PDF with QuestPDF?

The top answer in [a busy r/dotnet thread](https://www.reddit.com/r/dotnet/comments/1g5tkrs/best_c_libraries_for_converting_html_to_pdf/) on this question is "Don't do it. It's not worth the hassle." Read the thread and the hassle people name is Chrome on a server: one commenter lists Chrome that won't launch in Docker, then fonts missing once it does. That's a deploy problem, not a reason to rewrite your Razor views or HTML templates in C#.

QuestPDF fits documents you don't have as HTML yet. It builds the PDF from C# code with no HTML or CSS engine involved, and its Community License is free for companies under USD 1 million in annual revenue. Two more names you'll run into. iText's pdfHTML add-on is licensed under the AGPL. IronPDF is commercial, and its Lite license costs $999 for one developer.

## Frequently asked questions

### Is there a free HTML to PDF library for C#?

Yes. PuppeteerSharp and Playwright for .NET are both MIT licensed and print modern HTML and CSS through Chromium. HtmlRenderer.PdfSharp is free too, but it supports HTML 4.01 and CSS level 2, so flexbox and grid layouts won't come out right.

### How do I convert a .cshtml Razor view to PDF?

Render the view to an HTML string first, then convert that string. For Razor components, ASP.NET Core's `HtmlRenderer` class (not the HtmlRenderer.PdfSharp package) renders a component to HTML outside of an HTTP request. Pass the string as the `source` in any of the snippets on this page.

### How do I add a watermark to a PDF in C#?

With PDFShift, add a `watermark` object (text or an image) to the same request that converts your HTML. [Our C# watermark guide](/guides/csharp/httpclient/adding-a-text-watermark/) has the full HttpClient code.
