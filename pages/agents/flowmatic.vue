<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + FlowMattic">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/flowmatic.svg" alt="FlowMattic logo" class="w-16 h-16 rounded" />
                </div>
                Automate PDF creation in WordPress with FlowMattic automation workflows.<br />
                Connect your WordPress site to powerful PDF generation capabilities.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                FlowMattic is a powerful WordPress automation plugin that lets you create workflows directly
                                in your WordPress admin. By integrating PDFShift with FlowMattic, you can automatically
                                generate PDFs from WordPress content, WooCommerce orders, form submissions, and more.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with FlowMattic?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Automate PDF generation directly within WordPress</li>
                                <li>Generate invoices from WooCommerce orders</li>
                                <li>Create PDFs from form submissions (Gravity Forms, Contact Form 7, etc.)</li>
                                <li>Export posts and pages as PDFs automatically</li>
                                <li>Build document workflows without leaving WordPress</li>
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
                                    <h3 class="h3 text-navy-700 mb-2">2. WordPress Installation</h3>
                                    <p class="p -small text-navy-700">
                                        A WordPress site with admin access (self-hosted or managed hosting).
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. FlowMattic Plugin</h3>
                                    <p class="p -small text-navy-700">
                                        Install the FlowMattic plugin from
                                        <a href="https://flowmattic.com" target="_blank" class="text-purple-500 hover:underline">flowmattic.com</a>.
                                        A Pro license is recommended for full features.
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
                                        <h3 class="h3 text-navy-700 mb-3">Install FlowMattic Plugin</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Install and activate FlowMattic from your WordPress admin or upload the plugin files.
                                            Go to FlowMattic → Settings to configure.
                                        </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Create a New Workflow</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Go to FlowMattic → Workflows → Add New. Give your workflow a descriptive name
                                            like "Generate WooCommerce Invoice PDF".
                                        </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add a Trigger</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Add Trigger" and choose from available options:
                                        </p>
                                        <ul class="list-disc list-inside space-y-1 text-navy-700 text-sm">
                                            <li>WooCommerce - New Order</li>
                                            <li>Gravity Forms - Form Submission</li>
                                            <li>WordPress - New Post Published</li>
                                            <li>Contact Form 7 - Form Submitted</li>
                                            <li>Schedule - Run at specific times</li>
                                        </ul>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add HTTP Action</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Add Action" and select "HTTP" (or "Webhook"). Configure the HTTP request:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">Method:</span>
                                                <span class="ml-2 text-navy-700">POST</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">URL:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">https://api.pdfshift.io/v3/convert/pdf</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Content Type:</span>
                                                <span class="ml-2 text-navy-700">JSON</span>
                                            </div>
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure Authentication</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the Headers section, add:
                                        </p>
                                        <div class="space-y-2">
                                            <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm">
                                                <span class="text-purple-400">Header Name:</span> Authorization<br />
                                                <span class="text-purple-400">Header Value:</span> Basic [base64 of "api:YOUR_API_KEY"]
                                            </div>
                                            <p class="p -small text-navy-700 mt-3">
                                                Use an online Base64 encoder to encode "api:YOUR_API_KEY"
                                            </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure Request Body</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the Body field, add your JSON with dynamic tags:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{ post_url }}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{ order_id }}-invoice.pdf"</span><br />
}
                                        </div>
                                        <p class="p -small text-navy-700 mt-3">
                                            Use FlowMattic's dynamic tags to insert data from your trigger.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 7 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        7
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Add Follow-up Actions</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add actions to handle the generated PDF:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Email - Send the PDF as an attachment</li>
                                            <li>WordPress - Save as media file</li>
                                            <li>FTP - Upload to server</li>
                                            <li>Dropbox - Save to cloud storage</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 8 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        8
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Test and Activate</h3>
                                        <p class="p -small text-navy-700">
                                            Click "Test Workflow" to verify it works, then click "Activate" to enable the workflow.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Detailed Examples Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Detailed Examples</h2>

                        <!-- Example 1 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 1: WooCommerce Invoice Generation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Automatically generate and email invoices when orders are completed:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Workflow:</strong>
                                        <ol class="list-decimal list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Trigger: WooCommerce - Order Status Changed to "Completed"</li>
                                            <li>Action: HTTP - Call PDFShift API with invoice template URL</li>
                                            <li>Action: Email - Send PDF to customer email</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <strong>Request Body:</strong>
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{ site_url }}/invoice/?order_id={{ order_id }}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"invoice-{{ order_number }}.pdf"</span><br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Form Submission to PDF</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate PDFs from Gravity Forms submissions:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Workflow:</strong>
                                        <ol class="list-decimal list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Trigger: Gravity Forms - Form Submitted</li>
                                            <li>Action: WordPress - Create formatted HTML from form data</li>
                                            <li>Action: HTTP - Generate PDF from HTML</li>
                                            <li>Action: WordPress - Save PDF to media library</li>
                                            <li>Action: Email - Notify admin with PDF link</li>
                                        </ol>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Export Posts as PDFs</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Automatically create PDF versions of published posts:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Workflow:</strong>
                                        <ol class="list-decimal list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Trigger: WordPress - Post Published</li>
                                            <li>Action: HTTP - Generate PDF from post URL</li>
                                            <li>Action: WordPress - Attach PDF to post as download link</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <strong>Request Body:</strong>
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{ post_url }}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{ post_slug }}.pdf"</span><br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Use Cases Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Common Use Cases</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsClipboardTick />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">E-commerce Invoicing</h3>
                                <p class="p -small text-navy-700">
                                    Generate invoices for WooCommerce orders and email them to customers automatically
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Form to PDF</h3>
                                <p class="p -small text-navy-700">
                                    Convert form submissions (applications, quotes, registrations) to PDFs for records
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Content Export</h3>
                                <p class="p -small text-navy-700">
                                    Allow users to download posts, pages, or custom post types as PDFs
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Membership Certificates</h3>
                                <p class="p -small text-navy-700">
                                    Generate certificates when users complete courses or reach membership milestones
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Advanced Features Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Advanced Features</h2>
                        <CardLight>
                            <div class="space-y-6">
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Using Router for Conditional Logic</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Use FlowMattic's Router to generate different PDFs based on conditions:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Route 1: If order total > $100 → Generate detailed invoice</li>
                                        <li>Route 2: If order total &lt; $100 → Generate simple receipt</li>
                                        <li>Route 3: If product is digital → Skip PDF generation</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Building Custom Templates</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Create custom WordPress templates for PDF generation:
                                    </p>
                                    <ol class="list-decimal list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Create a custom page template in your theme</li>
                                        <li>Add CSS for print-friendly formatting</li>
                                        <li>Use dynamic data from FlowMattic triggers</li>
                                        <li>Generate PDFs from template URL</li>
                                    </ol>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Error Handling and Notifications</h3>
                                    <p class="p -small text-navy-700">
                                        Set up error handling in FlowMattic:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Add conditional check for HTTP response status</li>
                                        <li>Send admin email if PDF generation fails</li>
                                        <li>Log errors to WordPress debug log</li>
                                        <li>Add retry logic with delays</li>
                                    </ul>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Troubleshooting Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Troubleshooting & FAQ</h2>
                        <div class="space-y-4">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Authentication Errors (401)</h3>
                                <p class="p -small text-navy-700">
                                    Verify that your Authorization header is correctly formatted. The Base64 encoding of
                                    "api:YOUR_API_KEY" must be accurate. Use an online encoder to verify.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Dynamic Tags Not Working</h3>
                                <p class="p -small text-navy-700">
                                    Make sure you're using FlowMattic's tag syntax correctly. Tags should be in the format
                                    {{ tag_name }} and match the data available from your trigger.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">PDFs Not Generating from WordPress URLs</h3>
                                <p class="p -small text-navy-700">
                                    Ensure your WordPress site is publicly accessible. If it's behind a firewall or localhost,
                                    PDFShift won't be able to access it. Consider using staging sites for testing.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Workflow Not Triggering</h3>
                                <p class="p -small text-navy-700">
                                    Check that your workflow is activated and the trigger is configured correctly. Review
                                    FlowMattic's execution logs to see if the workflow is running.
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Related Resources -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Related Resources</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">API Documentation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Complete API reference with all parameters you can use in your FlowMattic workflows.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Other Integrations</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Explore integrations with other automation platforms and tools.
                                </p>
                                <Button to="/agents" :arrow="true">View All Integrations</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Automate WordPress PDFs Today</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start generating PDFs in your WordPress workflows
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
const title = 'PDFShift + FlowMattic Integration | WordPress PDF Automation';
const description = 'Learn how to integrate PDFShift with FlowMattic for WordPress. Automate PDF generation from WooCommerce orders, forms, and content.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
