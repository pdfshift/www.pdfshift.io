---
title: "HTML to PDF in Python: does your HTML need a browser?"
description: "HTML to PDF in Python: we ran one invoice through WeasyPrint, xhtml2pdf, Playwright and PDFShift. See which HTML needs a browser and what that costs."
date: "2026-11-12"
dateModified: "2026-11-12"
author: "Cyril Nicodème"
---

In Python, picking an HTML-to-PDF library comes down to one question: does your HTML need a browser? We sent the same invoice through four Python routes. Its one inline script ran only in the two that use Chromium. So if your HTML runs JavaScript (a chart drawn by a script, totals filled in on load) or the PDF has to match what Chrome shows, you need Chromium: Playwright on your own servers, or one `requests.post` to the PDFShift API.

## Which Python routes got our test invoice right?

Our test file is an invoice in 7,992 bytes of HTML. A flex header sits on top. The bill-to and ship-to addresses share a two-column CSS grid. Below them, a 45-row `<table>` with a `<thead>` runs onto page 2, and `tr { break-inside: avoid }` keeps each row whole. An `@page` rule asks for A4 and a "Page X of Y" footer in the bottom-right margin. One inline script writes "JS ran" into an empty element. Every route got that file unchanged.

::guide-figure{caption="Four checks on the same 45-row invoice, one row per Python route. Our test, November 12, 2026."}
<svg viewBox="0 0 360 216" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2p-checks-title h2p-checks-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2p-checks-title">Only PDFShift and Playwright passed all four checks</title>
<desc id="h2p-checks-desc">Check and cross matrix. PDFShift API with use_print: script ran, grid kept, Page X of Y footer, header row on page 2, all yes. Playwright: all yes. WeasyPrint: script did not run; grid, footer and header row yes. xhtml2pdf: script did not run, grid stacked, no footer; header row repeated on page 2.</desc>
<rect x="4" y="50" width="352" height="36" rx="6" fill="#FFFFFF"/>
<g stroke="#DBE4F2">
<line x1="10" y1="46" x2="350" y2="46"/>
<line x1="10" y1="88" x2="350" y2="88"/>
<line x1="10" y1="128" x2="350" y2="128"/>
<line x1="10" y1="168" x2="350" y2="168"/>
</g>
<g style="font-size:13px" fill="#4C556D" text-anchor="middle">
<text x="132" y="18">Script</text>
<text x="132" y="34">ran</text>
<text x="190" y="18">Grid</text>
<text x="190" y="34">kept</text>
<text x="248" y="18">Page X</text>
<text x="248" y="34">of Y</text>
<text x="312" y="18">Header row</text>
<text x="312" y="34">on page 2</text>
</g>
<g style="font-size:13px" fill="#0A0C3D">
<text x="14" y="73" style="font-weight:600">PDFShift API</text>
<text x="14" y="113">Playwright</text>
<text x="14" y="153">WeasyPrint</text>
<text x="14" y="193">xhtml2pdf</text>
</g>
<g style="fill:none;stroke:#6C47FF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round">
<polyline points="125,68 130,73 139,63"/>
<polyline points="183,68 188,73 197,63"/>
<polyline points="241,68 246,73 255,63"/>
<polyline points="305,68 310,73 319,63"/>
</g>
<g style="fill:none;stroke:#0A0C3D;stroke-width:3;stroke-linecap:round;stroke-linejoin:round">
<polyline points="125,108 130,113 139,103"/>
<polyline points="183,108 188,113 197,103"/>
<polyline points="241,108 246,113 255,103"/>
<polyline points="305,108 310,113 319,103"/>
<polyline points="183,148 188,153 197,143"/>
<polyline points="241,148 246,153 255,143"/>
<polyline points="305,148 310,153 319,143"/>
<polyline points="305,188 310,193 319,183"/>
</g>
<g style="stroke:#FF9D28;stroke-width:3;stroke-linecap:round">
<line x1="127" y1="143" x2="137" y2="153"/>
<line x1="137" y1="143" x2="127" y2="153"/>
<line x1="127" y1="183" x2="137" y2="193"/>
<line x1="137" y1="183" x2="127" y2="193"/>
<line x1="185" y1="183" x2="195" y2="193"/>
<line x1="195" y1="183" x2="185" y2="193"/>
<line x1="243" y1="183" x2="253" y2="193"/>
<line x1="253" y1="183" x2="243" y2="193"/>
</g>
</svg>
::

**Method.** One Apple Silicon Mac (macOS 27.0.1, Python 3.15), November 12, 2026. WeasyPrint 70.0, xhtml2pdf 0.2.28, Playwright 1.65.1 with its Chromium build 1254, and requests 2.34.2 for the API call. Each route printed A4 with its defaults, plus only the options in the code below. Times are the median of 3 runs.

## What does WeasyPrint need on your server?

A pip install, and a system library that pip can't install for you. The Python side is short:

```python
from weasyprint import HTML

# html can be your Django or Jinja template rendered to a string
HTML(string=html).write_pdf("invoice.pdf")
```

On our invoice, WeasyPrint got everything but the script right: the flex header, the two-column grid, the header row repeated on page 2 and the `@page` footer, with the table split 32 rows and then 13. It took a median 110 ms per PDF. If your HTML loads images or stylesheets by relative path, pass `base_url` as well.

The system library is Pango. WeasyPrint 70.0 needs Pango 1.44 or newer on every server that renders PDFs. On Debian:

```bash
apt install python3-pip libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz-subset0
```

Installing it isn't always smooth: in an r/Python thread from January asking for HTML-to-PDF libraries, the person who started it reported a WeasyPrint "dll issue".

Our invoice is a simple layout. [WeasyPrint's API reference](https://doc.courtbouillon.org/weasyprint/stable/api_reference.html) says flex "works for simple use cases but is not deeply tested", and grid "works for simple cases, but has some limitations". Run your own template through it once before you build on it.

## Why did xhtml2pdf turn the invoice into 3 pages?

xhtml2pdf is pure Python, built on ReportLab. `pip install xhtml2pdf` is all it takes, with nothing outside pip. It made our PDF in 75 ms.

```python
from xhtml2pdf import pisa

with open("invoice.pdf", "wb") as f:
    pisa.CreatePDF(html, dest=f)
```

Its own log names the first problem: "Ignoring CSS properties xhtml2pdf does not implement: border-collapse, grid-template-columns". Its docs say it treats grid as a plain block, so the bill-to and ship-to addresses stacked on top of each other. The fonts came out different, the item descriptions wrapped onto two lines, and the 45 rows needed 3 pages (13, 18 and 14 rows). The header row did repeat on pages 2 and 3.

The `@page` footer never printed. xhtml2pdf takes page numbers from its own tags, `<pdf:pagenumber />` and `<pdf:pagecount />`, placed in an `@frame footer`.

[Its docs](https://xhtml2pdf.readthedocs.io/en/latest/) promise HTML5 and CSS 2.1 "and some of CSS 3". So for HTML written for the web, the pip-only install doesn't save you work: you'd keep a second copy of the template written for xhtml2pdf, and update both every time.

## Is pdfkit still worth using?

No. The top answer on a Stack Overflow question about this still uses `pdfkit.from_url`, but pdfkit is a wrapper around wkhtmltopdf, and wkhtmltopdf's [GitHub repository was archived on January 2, 2023](https://github.com/wkhtmltopdf/wkhtmltopdf). Its [status page](https://wkhtmltopdf.org/status.html) says the WebKit inside it "hasn't been updated since 2012", and warns that running it on untrusted HTML "can lead to complete takeover of the server it is running on". pdfkit's last release, 1.0.0, came out in November 2021. We left it out of our test.

pyhtml2pdf is the other wrapper that comes up. It drives headless Chrome through Selenium, so it's the Chromium route below with Selenium added on top.

## What does running Chromium from Python cost?

About 632 MB on our Mac before the first PDF, and a browser process you keep running after it.

::guide-figure{caption="Install size on disk for each Python route, wheels plus files outside pip. Our test on an Apple Silicon Mac, November 12, 2026."}
<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="h2p-size-title h2p-size-desc" style="max-width:360px;display:block;margin:0 auto" font-family="DM Sans, sans-serif">
<title id="h2p-size-title">Playwright takes about 632 MB on disk; the PDFShift route takes 0.77 MB</title>
<desc id="h2p-size-desc">Horizontal bar chart of install size in MB, starting at zero. PDFShift API through requests: 0.77 MB, 5 wheels. WeasyPrint: 11.7 MB of wheels plus the Pango system library, which was not measured. xhtml2pdf: 16.5 MB. Playwright: 48 MB of wheels plus about 584 MB of browser files, about 632 MB in all.</desc>
<g stroke="#DBE4F2">
<line x1="10" y1="4" x2="10" y2="252"/>
<line x1="10" y1="252" x2="330" y2="252"/>
<line x1="170" y1="252" x2="170" y2="257"/>
<line x1="330" y1="252" x2="330" y2="257"/>
</g>
<g style="font-size:13px" fill="#4C556D">
<text x="10" y="272" text-anchor="middle">0</text>
<text x="170" y="272" text-anchor="middle">320</text>
<text x="330" y="272" text-anchor="middle">640 MB</text>
<text x="18" y="18" fill="#0A0C3D" style="font-weight:600">PDFShift API (requests)</text>
<text x="18" y="76">WeasyPrint (+ Pango, a system library)</text>
<text x="18" y="134">xhtml2pdf</text>
<text x="18" y="192">Playwright (wheels + browser files)</text>
<text x="18" y="240">48 MB of wheels + 584 MB = about 632 MB</text>
</g>
<rect x="10" y="26" width="2" height="22" rx="1" fill="#6C47FF"/>
<rect x="10" y="84" width="6" height="22" rx="2" fill="#4C556D"/>
<rect x="10" y="142" width="8" height="22" rx="2" fill="#4C556D"/>
<rect x="10" y="200" width="24" height="22" rx="3" fill="#4C556D"/>
<rect x="34" y="200" width="292" height="22" rx="3" fill="#FF9D28"/>
<g style="font-size:13px" fill="#0A0C3D">
<text x="20" y="42" style="font-weight:600">0.77 MB (5 wheels)</text>
<text x="24" y="100">11.7 MB + Pango (not measured)</text>
<text x="26" y="158">16.5 MB</text>
<text x="44" y="216">about 584 MB of browser files</text>
</g>
</svg>
::

Playwright's 48 MB of wheels (the pip packages) are the small part. The default `playwright install chromium` then downloaded about 584 MB more: the full Chromium (376 MB), the headless shell (205 MB) and ffmpeg (2.9 MB). `page.pdf()` only needs the headless shell, and `--only-shell` skips the full Chromium. That still leaves 205 MB of browser to deploy, keep updated and run.

This is the Playwright code we ran, with the sync API:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()  # launch once, reuse for every PDF
    page = browser.new_page()
    page.set_content(html, wait_until="load")
    page.pdf(
        path="invoice.pdf",
        format="A4",
        print_background=True,
        prefer_css_page_size=True,
    )
    page.close()
    browser.close()
```

Each option changes a default. Without `format`, Playwright prints US Letter. Without `print_background=True`, background colors don't print. Without `prefer_css_page_size=True`, it ignores the page size in your `@page` rule.

Playwright passed all four checks on 2 pages, 28 rows on the first and 17 on the second. It took 76 ms per PDF with the browser already open. Launching the browser took 1.4 s, so start it once when your worker starts and open a new page for each PDF.

In a Docker image, `--with-deps` adds the system libraries the browser needs:

```bash
RUN playwright install --with-deps --only-shell
```

From then on, a browser is part of your production stack, and you handle its memory use and timeouts. Our [Playwright production guide](/guides/playwright-pdf-in-production/) covers both.

## How do you get Chromium's PDF in Python without running a browser?

Send the HTML to the PDFShift API. We run Chromium, and the PDF comes back as the response body. On your side, that's `requests` and nothing else:

```python
import os
import requests

# html can be your Django or Jinja template rendered to a string
response = requests.post(
    "https://api.pdfshift.io/v3/convert/pdf",
    headers={"X-API-Key": os.environ["PDFSHIFT_API_KEY"]},
    json={"source": html, "format": "A4", "use_print": True},
)
response.raise_for_status()

with open("invoice.pdf", "wb") as f:
    f.write(response.content)
```

Like Playwright, it passed all four checks on 2 pages, in 1.8 s with the network round trip.

Keep `use_print: True` in the body. Without it, our PDF lost the header row on page 2.

You can run that code before you sign up. Leave out the `X-API-Key` header and the call runs as a free account: the PDF gets a watermark, and the limits are 2 MB, 30 seconds and 10 calls a day. That's how we ran our test. While you build, set `sandbox` to `True` to get watermarked PDFs that don't use your credits.

With a key, the free plan gives you 50 credits a month, no credit card. [Get a free API key](/register/), and find every parameter in the [API docs](https://docs.pdfshift.io/). If your project uses aiohttp, urllib3 or httplib2 instead of requests, [our Python guides](/guides/python/) show the same call with each client.
