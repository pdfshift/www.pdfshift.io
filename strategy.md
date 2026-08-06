~~
People don't buy PDFs.
They buy *not having to run Chromium*.
~~

Stratégie de croissance PDFShift

[ ] - Reddit campaign
[ ] - Mettre en avant le pricing dans l'API en accessible publique, et l'ajouter dans le llms.txt et llms-full.txt
[ ] - An endpoint for agents that gets a new account with API Key that can be used. Watermarked until the email has been validated, limited to 5 per day
[ ] - Ajouter le OpenAPI URL dans le llms.txt et llms-full.txt
[x] - Centraliser les churn.csv et en faire un graph
[ ] - Mettre à jour le site pour y inclure la page /agents et les pages dédiés
[ ] - Ajouter les différents outils no-code (Lovable, Base44, Make, Clay, N8n, Zapier)
[ ] - Faire des vidéos Youtube de bonne qualité pour chaque intégrations (no-code, librairies, etc)
[x] - Automatiser une campagne email pour demander quel usage les clients qui ont plus de 3 mois font de PDFShift
[ ] - Implement MCP agent
[ ] - Demander des questions lors du signup
[ ] - Créer des pages crawlable sur des mots clés spécifiques
[ ] - Implémenter des pages de comparaisons avec les compétiteurs
[ ] - Implement a migration checklist for each competitors
[ ] - Ecrire des case-study sur les plus gros utilisateurs de PDFShift
[ ] - Automatiser ce processus lorsqu'un client dépasse un certain usage (nombre de crédit / total payé)
[ ] - Implémenter un système de signature pré-signée générique (déjà le cas pour Cloudflare!)
[ ] - Implementer OVH RDS pour les données de santé
[ ] - Track the time from account creation to first successfully converted PDF (Account created > First successful PDF)
[ ] - Optimize documentation (docs.pdfshift.io) for AI/MCP systems
[ ] - Implement various SDK for each major programming languages
[ ] - Write about architecture and experience running thousands of conversions per day

NOTE: Comment ca se passe pour les one-time login link si un bot va sur l'url ?
=> Tester et faire en sorte que ca ne supprime pas le token automatiquement

---

## Reddit campaign

https://x.com/arthuryuzbashew
https://redreach.ai/

---


## Write articles for No-Code platforms, along with videos

 * Lovable
 * Base44
 * Make
 * N8n
 * Bubble
 * Zapier
 * Clay

---

## Add four questions to signup:

Ask:
 * What are you generating?
 * What are you currently using?
    * Puppeteer or Playwright
    * wkhtmltopdf
    * Gotenberg
    * Doppio
    * PDFMonkey
    * DocRaptor
    * Another API
    * Nothing yet
 * How many documents do you expect to generate monthly?
 * Which language or framework are you using?

---

## Expose a /agents page

containing:

 * signup endpoint
 * OpenAPI
 * MCP server
 * examples
 * limits
 * verification flow

 Postiz does it well with various agents system, skills, and service:
 https://postiz.com/codex/telegram:

 * Claude cowork
 * Codex
 * Hermes agent
 * Nanoclaw
 * Openclaw
 * Paper clip
 * Perplexity computer


---

## Allow Agents to signup and get an API key immediately

But restricts to watermarked documents until the email has been validated
Return a short-lived API key

```http
POST /v1/agent-signups

{
    "email": "user@example.com",
    "name": "John Doe",
    "source": "chatgpt"
}
```

```json
{
    "signup_id": "...",
    "verification_url": "...",
    "status": "email_verification_required",
    "max_uses": 1,
    "expires_in": 300, (ou "expires_at": "2026-07-30T18:30:00Z")
}
```

Limit account creations:

 * Per IP:  5/day
 * Per email domain: 2/day
 * 


---

## Implement short-lived API keys

Used when agents create an account or renew an API key

---

## Create dedicated, crawlable commercial pages (SEO work)

Today, most HTML→PDF APIs rank for similar keywords.

Instead, own hundreds of long-tail pages.

Examples:

* HTML invoice to PDF
* HTML receipt PDF API
* Convert React to PDF
* Convert Vue to PDF
* Next.js PDF generation
* Django HTML PDF
* Laravel PDF API
* Flask PDF
* Tailwind PDF
* Bootstrap PDF

Not shallow AI-generated pages.

Each page should contain:

* working code
* screenshots
* common issues
* benchmarks
* limitations
* PDFShift example

Hundreds of pages.

Analyze google search console, and craft pages that matches the criteria. Also work with ahref on this one

For instance:

 * /features
 * /security
 * /enterprise
 * /templates
 * /screenshots
 * /html-to-pdf-api
 * /healthcare

---

## Implement alternative pages for the competitors

 * /alternatives/doppio ** (see below) https://doppio.sh/alternatives/docraptor-alternative
 * /alternatives/pdfmonkey
 * /alternatives/docraptor
 * /alternatives/pdf4dev - https://pdf4.dev/vs/pdfshift
 * /alternatives/polydoc - https://polydoc.tech/alternatives/
 * /alternatives/gotenberg
 * /alternatives/puppeteer
 * /alternatives/wkhtmltopdf

 (possibility to take all the competitors on all the list of these pages (like https://polydoc.tech/alternatives/) and add them here

 * /alternatives/html2pdf.app
 * /alternatives/api2pdf
 * /alternatives/weasyprint
 * /alternatives/prince xml
 * /alternatives/pspdfkit
 * /alternatives/pdfreactor
 * /alternatives/pdfcrowd
 * /alternatives/PDFLayer
 * /alternatives/PDF.co
 * /alternatives/Playwright
 * /alternatives/pdfgen - https://pdfgen.com/vs/pdfshift
 * /alternatives/craftmypdf
 * /alternatives/anvil

---

## Doppio alternative page covering:

 * PDF, PNG, JPEG and WebP support
 * Screenshot selectors and clip regions
 * Pricing by volume
 * HIPAA versus HDS
 * Storage workflows
 * Templates
 * Rate limits
 * Async and batch processing
 * Data retention
 * Support

 ---

/!\ FOR ALL THE COMPETITORS

Implement a "Migration checklist" page that explains how to migrate from them to PDFShift

Each page should answer:

> "How do I migrate in 15 minutes?"

---

## Create case-studies

Each case study should contain:

 * The customer’s business
 * The documents generated
 * Previous solution
 * Monthly volume
 * Integration time
 * Why PDFShift was selected
 * Reliability or development-time improvement

---

## Implement Generic presigned destination URLs

Allow customers to pass a signed PUT URL rather than requiring storage-specific credentials. This supports S3, Cloudflare R2, MinIO, DigitalOcean Spaces and other compatible services while reducing credential-handling risk.

Doppio markets this workflow prominently.

---

## Implement OVH HDS 

Requires support plan at 250 € /m

---

### Obsess over the first 5 minutes

A developer should be able to:

* create an account
* obtain an API key
* generate a PDF

in under five minutes.

Track:

* Visitor → signup
* Signup → first successful PDF
* Time to first PDF

This is probably the single most important metric for growth.

---

## AI-first documentation

Every endpoint documentation should have:

* OpenAPI
* MCP server
* copy-paste prompts
* Cursor examples
* Claude examples
* ChatGPT examples
* Windsurf examples
* Copilot examples

---

## Implement SDKs

Official libraries for every language.

Not community packages.

Maintain them yourself.

* Python
* Node
* PHP
* Go
* Java
* .NET
* Ruby
* Rust

---

## Publish engineering

Your infrastructure experience is an asset.

Write about:

* scaling Chromium
* rendering 1M PDFs
* font loading
* memory optimisation
* browser pooling
* PDF benchmarking
* rendering accuracy

Developers love infrastructure posts.

They also rank well.

---



Search for usage on Google (generate pdf mcp, etc) and appear on the front page, answer Reddit questions, etc

Go throught the three to five pages of Google listing, Kagi, Duck Duck Go, etc
See what kinds of things show up and start to get a feel of what do I need to do, what do I want to do ?
"Where do I need to be seen ?"
Should I leave a comment to a Reddit forum ?

---

## Heroku alternative!

Rank on these ideas on SEO:

(written from Claude) - https://app.getfernand.com/pdfshift/conversations/view/658124
My honest recommendation for your use case — Puppeteer is probably the best fit. Your catalogue pages combine artwork images, grid layouts and styled text in a way that maps naturally to HTML/CSS, and you already have Vue components that could be reused or adapted as templates. The output quality for image-heavy documents is also noticeably better than pdfmake.

The main practical consideration is whether your hosting environment can run a headless Chrome instance — it adds around 150MB to your deployment. If you're on a constrained server or serverless environment that could be a problem.

What does your hosting setup look like?

Currently run node/express server apps on Heroku platform

Puppeteer on Heroku is doable but has a few friction points worth knowing about:

The problem — Heroku's default dynos don't include the system dependencies Chrome needs (fonts, graphics libraries etc). You have to add them manually.

The solution — add the community buildpack alongside the Node buildpack:

bash

heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add --index 2 heroku/nodejs
And launch Puppeteer with the --no-sandbox flag which is required in the Heroku environment:

typescript

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
});
Dyno size consideration — Chrome is memory-hungry. A Basic or Standard-1X dyno (512MB) will likely struggle under any load. Standard-2X (1GB) is the practical minimum for reliable PDF generation.

An alternative worth considering — if the Heroku overhead feels like too much friction, there are hosted PDF generation services that accept HTML and return a PDF, keeping your server lean:

Gotenberg — open source, Docker-based, can be run as a separate Heroku service
