<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + MCP">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/mcp.svg" alt="MCP logo" class="w-16 h-16 rounded" />
                </div>
                Integrate PDF generation into Claude Desktop and AI agent workflows.<br />
                Build intelligent document automation with the Model Context Protocol.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                The Model Context Protocol (MCP) is an open standard for connecting AI assistants like Claude Desktop
                                to external tools and data sources. By creating an MCP server for PDFShift, you can enable Claude
                                and other AI agents to generate PDFs directly during conversations.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with MCP?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Enable Claude to generate PDFs during natural conversations</li>
                                <li>Build AI agents that can create documents on demand</li>
                                <li>Automate report generation with AI-powered content</li>
                                <li>Create intelligent document workflows</li>
                                <li>Integrate with Claude Desktop and custom AI applications</li>
                            </ul>
                        </CardLight>
                    </section>

                    <!-- Prerequisites Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Prerequisites</h2>
                        <CardLight>
                            <div class="space-y-4">
                                <div>
                                    <h3 class="h3 text-navy-700 mb-2">1. PDFShift API Key</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        You'll need an API key from PDFShift:
                                    </p>
                                    <Button to="/register" :arrow="true">Register for Free</Button>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">2. Claude Desktop or MCP-Compatible Client</h3>
                                    <p class="p -small text-navy-700">
                                        Download Claude Desktop from
                                        <a href="https://claude.ai/download" target="_blank" class="text-purple-500 hover:underline">claude.ai/download</a>
                                        or use any MCP-compatible AI application.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. Node.js or Python</h3>
                                    <p class="p -small text-navy-700">
                                        MCP servers can be built with Node.js or Python. This guide uses Node.js examples.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">4. Basic Programming Knowledge</h3>
                                    <p class="p -small text-navy-700">
                                        Familiarity with JavaScript/Node.js and HTTP APIs is helpful.
                                    </p>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Step-by-Step Setup Guide -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Step-by-Step Setup Guide</h2>

                        <!-- Step 1 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Install MCP SDK</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Install the MCP SDK for Node.js:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
npm install @anthropic-ai/mcp-server
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Create MCP Server File</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Create a file named <code class="font-mono">pdfshift-mcp-server.js</code>:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
<span class="text-purple-400">const</span> { Server } = <span class="text-green-400">require</span>(<span class="text-green-400">'@anthropic-ai/mcp-server'</span>);<br />
<span class="text-purple-400">const</span> fetch = <span class="text-green-400">require</span>(<span class="text-green-400">'node-fetch'</span>);<br />
<br />
<span class="text-purple-400">const</span> PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;<br />
<br />
<span class="text-purple-400">const</span> server = <span class="text-green-400">new</span> <span class="text-yellow-400">Server</span>({<br />
  name: <span class="text-green-400">'pdfshift'</span>,<br />
  version: <span class="text-green-400">'1.0.0'</span><br />
});<br />
<br />
<span class="text-gray-400">// Tool definition will go here</span>
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Define PDF Generation Tool</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add a tool definition for converting HTML to PDF:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
server.<span class="text-yellow-400">tool</span>(<span class="text-green-400">'convert_html_to_pdf'</span>, {<br />
  description: <span class="text-green-400">'Convert HTML content to a PDF document'</span>,<br />
  parameters: {<br />
    source: {<br />
      type: <span class="text-green-400">'string'</span>,<br />
      description: <span class="text-green-400">'URL or HTML string to convert'</span>,<br />
      required: <span class="text-purple-400">true</span><br />
    },<br />
    filename: {<br />
      type: <span class="text-green-400">'string'</span>,<br />
      description: <span class="text-green-400">'Name for the generated PDF file'</span>,<br />
      required: <span class="text-purple-400">false</span><br />
    }<br />
  },<br />
  handler: <span class="text-purple-400">async</span> (params) => {<br />
    <span class="text-gray-400">// Implementation will go here</span><br />
  }<br />
});
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 4 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        4
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Implement the Handler</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add the implementation that calls PDFShift API:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
handler: <span class="text-purple-400">async</span> (params) => {<br />
  <span class="text-purple-400">const</span> response = <span class="text-purple-400">await</span> <span class="text-green-400">fetch</span>(<span class="text-green-400">'https://api.pdfshift.io/v3/convert/pdf'</span>, {<br />
    method: <span class="text-green-400">'POST'</span>,<br />
    headers: {<br />
      <span class="text-green-400">'Authorization'</span>: <span class="text-green-400">`Basic ${Buffer.from(`api:${PDFSHIFT_API_KEY}`).toString('base64')}`</span>,<br />
      <span class="text-green-400">'Content-Type'</span>: <span class="text-green-400">'application/json'</span><br />
    },<br />
    body: JSON.<span class="text-yellow-400">stringify</span>({<br />
      source: params.source,<br />
      filename: params.filename || <span class="text-green-400">'document.pdf'</span><br />
    })<br />
  });<br />
  <br />
  <span class="text-purple-400">if</span> (!response.ok) {<br />
    <span class="text-purple-400">throw new</span> <span class="text-yellow-400">Error</span>(<span class="text-green-400">`PDF generation failed: ${response.statusText}`</span>);<br />
  }<br />
  <br />
  <span class="text-purple-400">const</span> pdfBuffer = <span class="text-purple-400">await</span> response.<span class="text-yellow-400">buffer</span>();<br />
  <span class="text-purple-400">return</span> {<br />
    content: pdfBuffer.<span class="text-yellow-400">toString</span>(<span class="text-green-400">'base64'</span>),<br />
    contentType: <span class="text-green-400">'application/pdf'</span><br />
  };<br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 5 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        5
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Configure Claude Desktop</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add your MCP server to Claude Desktop's configuration file:
                                        </p>
                                        <p class="p -small text-navy-700 mb-2">
                                            <strong>On macOS:</strong> <code class="font-mono">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                                        </p>
                                        <p class="p -small text-navy-700 mb-4">
                                            <strong>On Windows:</strong> <code class="font-mono">%APPDATA%\Claude\claude_desktop_config.json</code>
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"mcpServers"</span>: {<br />
    <span class="text-purple-400">"pdfshift"</span>: {<br />
      <span class="text-purple-400">"command"</span>: <span class="text-green-400">"node"</span>,<br />
      <span class="text-purple-400">"args"</span>: [<span class="text-green-400">"/path/to/pdfshift-mcp-server.js"</span>],<br />
      <span class="text-purple-400">"env"</span>: {<br />
        <span class="text-purple-400">"PDFSHIFT_API_KEY"</span>: <span class="text-green-400">"your_api_key_here"</span><br />
      }<br />
    }<br />
  }<br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 6 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        6
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Restart Claude Desktop</h3>
                                        <p class="p -small text-navy-700">
                                            Restart Claude Desktop to load your MCP server. You should see a 🔨 hammer icon
                                            indicating tools are available.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Usage Examples -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Usage Examples</h2>

                        <!-- Example 1 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Generate PDF from URL</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Ask Claude to generate a PDF from a website:
                                </p>
                                <div class="bg-gray-100 border-l-4 border-purple-500 p-4 rounded">
                                    <p class="text-navy-700 font-semibold mb-2">You:</p>
                                    <p class="text-navy-700">"Please convert https://example.com to a PDF"</p>
                                    <p class="text-navy-700 font-semibold mt-4 mb-2">Claude:</p>
                                    <p class="text-navy-700">"I'll use the PDFShift tool to convert that page to PDF... [generates PDF]"</p>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Generate Report from Data</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Ask Claude to create a report and convert it to PDF:
                                </p>
                                <div class="bg-gray-100 border-l-4 border-purple-500 p-4 rounded">
                                    <p class="text-navy-700 font-semibold mb-2">You:</p>
                                    <p class="text-navy-700">"Create a sales report for Q4 with this data [paste data], then generate a PDF"</p>
                                    <p class="text-navy-700 font-semibold mt-4 mb-2">Claude:</p>
                                    <p class="text-navy-700">"I'll analyze the data and create a formatted HTML report, then convert it to PDF... [generates PDF]"</p>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Multi-Step Workflow</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Chain multiple operations together:
                                </p>
                                <div class="bg-gray-100 border-l-4 border-purple-500 p-4 rounded">
                                    <p class="text-navy-700 font-semibold mb-2">You:</p>
                                    <p class="text-navy-700">"Fetch the latest blog post from my site, summarize it, create a nice HTML version, and convert to PDF"</p>
                                    <p class="text-navy-700 font-semibold mt-4 mb-2">Claude:</p>
                                    <p class="text-navy-700">"I'll fetch the post, create a summary, format it as HTML, and generate a PDF... [executes workflow]"</p>
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Advanced Features Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Advanced Features</h2>
                        <CardLight>
                            <div class="space-y-6">
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Adding More Tools</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Extend your MCP server with additional PDFShift features:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li><strong>add_watermark:</strong> Tool to add text or image watermarks</li>
                                        <li><strong>protect_pdf:</strong> Tool to password-protect PDFs</li>
                                        <li><strong>add_header_footer:</strong> Tool to add custom headers/footers</li>
                                        <li><strong>save_to_s3:</strong> Tool to save PDFs directly to S3</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Handling Errors Gracefully</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Implement robust error handling:
                                    </p>
                                    <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
<span class="text-purple-400">try</span> {<br />
  <span class="text-gray-400">// PDF generation code</span><br />
} <span class="text-purple-400">catch</span> (error) {<br />
  <span class="text-purple-400">if</span> (error.status === <span class="text-yellow-400">401</span>) {<br />
    <span class="text-purple-400">throw new</span> <span class="text-yellow-400">Error</span>(<span class="text-green-400">'Invalid PDFShift API key'</span>);<br />
  }<br />
  <span class="text-purple-400">throw new</span> <span class="text-yellow-400">Error</span>(<span class="text-green-400">`PDF generation failed: ${error.message}`</span>);<br />
}
                                    </div>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Caching Generated PDFs</h3>
                                    <p class="p -small text-navy-700">
                                        Implement caching to avoid regenerating the same PDF:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Cache PDFs by source URL hash</li>
                                        <li>Store in local filesystem or cloud storage</li>
                                        <li>Return cached version if available</li>
                                        <li>Implement TTL for cache expiration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Logging and Monitoring</h3>
                                    <p class="p -small text-navy-700">
                                        Add logging to track PDF generations:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Log each PDF generation request</li>
                                        <li>Track success/failure rates</li>
                                        <li>Monitor API usage and costs</li>
                                        <li>Debug issues with detailed error logs</li>
                                    </ul>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Use Cases Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Use Cases for AI Agents</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsClipboardTick />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Research Reports</h3>
                                <p class="p -small text-navy-700">
                                    Ask Claude to research a topic, compile findings, format as report, and generate PDF
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Data Analysis Reports</h3>
                                <p class="p -small text-navy-700">
                                    Analyze data, create visualizations, format results, and export as professional PDF
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Document Summarization</h3>
                                <p class="p -small text-navy-700">
                                    Fetch documents, summarize content, create formatted version, and save as PDF
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Content Archiving</h3>
                                <p class="p -small text-navy-700">
                                    Archive web pages, articles, or conversations as searchable PDF documents
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Troubleshooting Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Troubleshooting & FAQ</h2>
                        <div class="space-y-4">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Server Not Appearing in Claude Desktop</h3>
                                <p class="p -small text-navy-700">
                                    Verify the config file path is correct, check for JSON syntax errors, and ensure Node.js
                                    is in your PATH. Restart Claude Desktop after making changes.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Authentication Errors</h3>
                                <p class="p -small text-navy-700">
                                    Double-check your API key in the config file. Make sure it's set as an environment variable
                                    and the Base64 encoding is correct.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Tool Not Being Used</h3>
                                <p class="p -small text-navy-700">
                                    Ensure your tool description is clear and specific. Claude needs to understand when to use
                                    the tool based on the conversation context.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Large PDF Timeouts</h3>
                                <p class="p -small text-navy-700">
                                    For complex documents, consider implementing webhook support for async processing,
                                    or splitting large documents into smaller chunks.
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Related Resources -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Related Resources</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">MCP Documentation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Learn more about the Model Context Protocol and building MCP servers.
                                </p>
                                <Button to="https://modelcontextprotocol.io" :arrow="true">Visit MCP Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">PDFShift API Docs</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Complete API reference with all parameters and features you can integrate.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Build Intelligent Document Workflows</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start building AI-powered document generation
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button to="/register" :arrow="true" :light="true">Get Your Free API Key</Button>
                                <Button to="/documentation" :arrow="true">Read the Documentation</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = 'PDFShift + MCP Integration | AI Agent PDF Generation with Claude';
const description = 'Learn how to integrate PDFShift with Model Context Protocol (MCP) for Claude Desktop. Enable AI agents to generate PDFs during conversations.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
