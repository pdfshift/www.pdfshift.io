<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Documentation
                    <small>Find everything you need to know here.</small>
                </h1>
            </div>
        </header>

        <div class="container">
            <div id="api-endpoint" class="section">
                <h3>API Endpoint</h3>
                <p>
                    In order to convert an HTML document to PDF, you must send a <strong>POST</strong> request to
                </p>
                <p class="center">
                    <code>https://api.pdfshift.io/v2/convert</code>.
                </p>
                <p>
                    When starting, don't forget to add the <code>sandbox=True</code> parameter. This will let you make any number of calls to the API without losing any credits.<br />
                    The resulting PDF will have a watermark on it, but it will help you make a working version of your code.
                </p>
                <p>
                    And remove the <code>sandbox</code> parameter in production, and you will be all set!
                </p>
                <p class="cta">
                    <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                </p>
            </div>
            <div id="api-authentication" class="section">
                <h3>Authentication</h3>
                <p>
                    Authenticate your account by including your secret key in API requests. You can manage your API keys in the <router-link :to="{name: 'Register'}">Dashboard</router-link>.
                </p>
                <p>
                    Authentication to the API is performed via <a href="http://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Auth</a>.
                    Provide your API key as the basic auth username value. You do not need to provide a password.
                </p>
                <p>
                    <code>curl -u '120d8e8a86d2....................:' -d source="https://www.example.com" https://api.pdfshift.io/v2/convert/</code>
                </p>
            </div>
            <div id="rate-limiting" class="section">
                <h3>Rate limiting</h3>
                <p>Rate limiting is only forced for unauthenticated accounts with a limit of 2 requests per minutes.</p>
                <p>As soon as you are authenticated, there is no rate limit restricting you.</p>
                <!--
                <p>
                    There are no restrictions per account. All accounts have the same rate limiting of <strong>45 requests per minutes</strong>.
                </p>
                <p>
                    If you frequently reach the rate limit, feel free to <a href="mailto:support@pdfshift.io">contact us</a> and we will see to configure a plan according to your needs.
                </p>
                -->
                <p>
                    When reaching the rate limit, you will get an HTTP status code of <code>429</code>.<br />
                    Each request will contain three headers to let you know your usage:
                </p>
                <p>
                    <pre><code v-hljs class="json">X-RateLimit-Remaining: 30
X-RateLimit-Limit: 45
X-RateLimit-Reset: 1466368960</code></pre>
                </p>
                <ul>
                    <li><strong>X-RateLimit-Remaining</strong> Indicates the number of requests before hitting the rate limit.</li>
                    <li><strong>X-RateLimit-Reset</strong> Indicates the number of requests you can make per minutes (always 45).</li>
                    <li><strong>X-RateLimit-Reset</strong> Indicates when the rate limit will reset.</li>
                </ul>
            </div>
            <div id="api-result" class="section">
                <h3>Result</h3>
                <p>
                    When the request is successful, PDFShift will return the raw PDF directly created.
                </p>
            </div>
            <div :id="'section-' + section.key" class="section" v-for="section in sections" :key="section.key">
                <h3>{{ section.name }}</h3>
                <p v-if="section.description">{{ section.description }}</p>
                <div v-for="parameter in section.parameters" :key="parameter.name">
                    <div class="value">
                        <strong>{{ parameter.name }}</strong>
                        <span class="required" v-if="parameter.required">*</span>
                        <small>
                            {{ parameter.type }}<br />
                            (default: <code>{{ parameter.default }}</code>)
                        </small>
                    </div>
                    <div class="description">
                        <p>{{ parameter.description }}</p>
                        <small v-if="parameter.example"><em>Example:</em> <code>{{ parameter.example }}</code></small>
                    </div>
                </div>
            </div>
            <div id="variables" class="section">
                <h3>Variables in header and footer</h3>
                <div class="table">
                    <div>
                        <div class="headers">Variable</div>
                        <div><code v-pre>{{date}}</code></div>
                        <div><code v-pre>{{title}}</code></div>
                        <div><code v-pre>{{url}}</code></div>
                        <div><code v-pre>{{page}}</code></div>
                        <div><code v-pre>{{total}}</code></div>
                    </div>
                    <div>
                        <div class="headers">Description</div>
                        <div>Formatted print date</div>
                        <div>Title of the HTML document</div>
                        <div>Page URL</div>
                        <div>Current page</div>
                        <div>Total number of pages</div>
                    </div>
                </div>
            </div>

            <p>Missing a feature? <a href="mailto:support@pdfshift.io" title="Contact us">Contact us</a> and we will see if we can implement it!</p>
        </div>

        <div class="cta">
            <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/generals.less';

.container {color: #333;}

.center {text-align: center}

.cta {
    margin: 40px 0;
    text-align: center;

    a {
        padding: 20px 80px;
    }
}

#rate-limiting ul li {
    margin: 5px 0;

    strong {
        display: inline-block;
        width: 200px;
    }
}

#variables .table {
    &>div {
        text-align: left;

        &:first-child {
            width: 150px;
        }

        &:last-child {
            width: calc(100% - 150px);
        }
    }
}

.section {
    margin-top: 80px;

    &:first-child {
        margin-top: 40px;
    }

    h3 {
        border-bottom: solid 1px #c5c5c5;
        font-size: 1.5em;
    }

    a:not(.button) {
        color: @secondary_color;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    &>div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: solid 1px #eee;
        padding: 10px 0;
        margin: 10px 0;

        &>div.value {
            min-width: 120px;
            width: 20%;
            line-height: 1.25em;

            strong {
                font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
            }

            span.required {
                color: red;
                vertical-align: text-top;
            }

            small {
                display: block;
            }
        }

        &>div.description {
            width: 80%;

            p {
                margin: 0 0 5px;
                padding: 0;
                line-height: 1.2em;
            }
        }
    }
}

.container > p {
    text-align: center;
    margin-top: 40px;
}
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent},
    data () {
        return {
            sections: [
                {
                    name: 'General',
                    key: 'general',
                    parameters: [
                        {
                            name: 'source',
                            required: true,
                            type: 'URL or string',
                            description: 'Original document to convert to PDF. PDFShift will automatically detect if it\'s an URL and load it, or an HTML document and charge it.',
                            example: 'https://www.google.com',
                            default: 'null'
                        },
                        {
                            name: 'sandbox',
                            required: false,
                            type: 'Boolean',
                            description: 'Will generates documents that doesn\'t count in the credits. The generated document will come with a watermark.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'encode',
                            required: false,
                            type: 'Boolean',
                            description: 'Will return the generated PDF in Base64 encoded format, instead of raw.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'timeout',
                            required: false,
                            type: 'Number',
                            description: 'If provided, will kill the page loading at a specified time without stopping with a TimeoutError. Value in seconds',
                            example: '15',
                            default: 'null'
                        },
                        /*
                        {
                            name: 'grayscale',
                            required: false,
                            type: 'Boolean',
                            description: 'Returns a PDF document in grayscale.',
                            example: 'true',
                            default: 'false'
                        },
                        */
                        {
                            name: 'landscape',
                            required: false,
                            type: 'Boolean',
                            description: 'Will set the view in landscape mode instead of portrait',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'css',
                            required: false,
                            type: 'URL or String',
                            description: 'Will append this CSS styles to the document before saving it. Can be an URL or a String of CSS rules.',
                            example: 'h2 {page-break-before: always; page-break-after: avoid}',
                            default: 'null'
                        },
                        {
                            name: 'javascript',
                            required: false,
                            type: 'URL or String',
                            description: 'Will execute the given Javascript before saving the document. Can be an URL or a String of JS code.',
                            example: 'document.getElementById("social-networks").style.display = "none";',
                            default: 'null'
                        },
                        {
                            name: 'disable_images',
                            required: false,
                            type: 'Boolean',
                            description: 'Images will not be included in the final document.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'disable_javascript',
                            required: false,
                            type: 'Boolean',
                            description: 'Will not execute the javascript at all in the document',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'disable_links',
                            required: false,
                            type: 'Boolean',
                            description: 'The link in the document will not point anywhere.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'disable_backgrounds',
                            required: false,
                            type: 'Boolean',
                            description: 'The final document will not have the background images.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'delay',
                            required: false,
                            type: 'Number',
                            description: 'In milliseconds. Will wait for this duration before capturing the document. Up to 10 seconds max.',
                            example: '2000',
                            default: '0'
                        },
                        {
                            name: 'use_print',
                            required: false,
                            type: 'Boolean',
                            description: 'Use the print stylesheet instead of the general one.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'format',
                            required: false,
                            type: 'String',
                            description: 'Format of the document. You can either use the standard values (Letter, Legal, Tabloid, Ledger, A0, A1, A2, A3, A4, A5) or a custom `{width}x{height}` value. For {width} and {height}, you can indicate the following units: in, cm, mm.',
                            example: '800x600',
                            default: 'A4'
                        },
                        {
                            name: 'viewport',
                            required: false,
                            type: 'String',
                            description: 'Viewport size. Defined as `width x height`. Default is 1200x1024.',
                            example: '375x667',
                            default: '1200x1024'
                        },
                        /*
                        {
                            name: 'dpi',
                            required: false,
                            type: 'Number',
                            description: 'Value between 75 and 149. DPI of virtual screen when converting the document.',
                            example: '100',
                            default: '75'
                        },
                        */
                        {
                            name: 'zoom',
                            required: false,
                            type: 'Number',
                            description: 'A value between 0 and 50. Allows you to increase the zoom in the document for specific purposes.',
                            example: '15',
                            default: '1'
                        },
                        {
                            name: 'margin',
                            required: false,
                            type: 'Object',
                            description: 'Empty spaces between the outer and the beginning of the content',
                            default: 'null'
                        },
                        {
                            name: 'auth',
                            required: false,
                            type: 'Object',
                            description: 'Object containing `username` and `password` for accessing password-protected content.',
                            example: '{"username": "admin", "password": "r00t"}',
                            default: 'null'
                        },
                        {
                            name: 'cookies',
                            required: false,
                            type: 'Array of Object',
                            description: 'List of cookies you want to send along with the requests when loading the source. See the related part at the bottom of the document',
                            example: '[{"name": "session", "value": "xxx-xxxx-xxxx"}]',
                            default: 'null'
                        },
                        {
                            name: 'http_headers',
                            required: false,
                            type: 'Object',
                            description: 'List of http headers that you can customize for a better end result.',
                            example: '{"Content-Type": "text/html; charset=utf-8"}, {"user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"}',
                            default: 'null'
                        },
                        {
                            name: 'header',
                            required: false,
                            type: 'Object',
                            description: 'Defines a custom header. See the "Header/Footer" section for more details.',
                            default: '{"source": "<div>Pages {{page}} of {{total}}</div>", "spacing": "150px"}'
                        },
                        {
                            name: 'footer',
                            required: false,
                            type: 'URL or String',
                            description: 'Same as header.',
                            default: 'null'
                        },
                        /*
                        {
                            name: 'paging_offset',
                            required: false,
                            type: 'Number',
                            description: 'Pagination starting number. Starts at 0 by default.',
                            example: '2',
                            default: '0'
                        },
                        {
                            name: 'bookmarks',
                            required: false,
                            type: 'Boolean',
                            description: 'Convert headers (h1 to h4) to clickable elements',
                            example: 'true',
                            default: 'false'
                        },
                        */
                        {
                            name: 'protection',
                            required: false,
                            type: 'Object',
                            description: 'Will add restrictions on the PDF document. See the #Protection part for more details',
                            default: 'null'
                        },
                        {
                            name: 'watermark',
                            required: false,
                            type: 'Object',
                            description: 'Add a watermark to the generated document. See the #Watermark part for more details.',
                            default: 'null'
                        }
                    ]
                },
                {
                    name: 'Cookies',
                    key: 'cookies',
                    description: 'List of accepted parameters for the Cookie object.',
                    parameters: [
                        {
                            name: 'name',
                            required: true,
                            type: 'String',
                            description: 'Name of the cookie',
                            example: 'session',
                            default: 'null'
                        },
                        {
                            name: 'value',
                            required: true,
                            type: 'String',
                            description: 'Value for the specified cookie',
                            example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
                            default: 'null'
                        },
                        {
                            name: 'secure',
                            required: false,
                            type: 'Boolean',
                            description: 'If set to true, This cookie will only be available for secure (https) connections.',
                            example: 'true',
                            default: 'false'
                        },
                        {
                            name: 'http_only',
                            required: false,
                            type: 'Boolean',
                            description: 'If set to true, this cookie will only be available to HTTP request only (no javascript).',
                            example: 'true',
                            default: 'false'
                        }
                    ]
                },
                {
                    name: 'Margin',
                    key: 'margin',
                    description: 'The margin of the document can be defined using the four parameters below:',
                    parameters: [
                        {
                            name: 'top',
                            required: false,
                            type: 'String',
                            description: 'Space between the top and the content.',
                            example: '15px',
                            default: 'null'
                        },
                        {
                            name: 'right',
                            required: false,
                            type: 'String',
                            description: 'Space between the right and the content.',
                            example: '15px',
                            default: 'null'
                        },
                        {
                            name: 'bottom',
                            required: false,
                            type: 'String',
                            description: 'Space between the bottom and the content.',
                            example: '15px',
                            default: 'null'
                        },
                        {
                            name: 'left',
                            required: false,
                            type: 'String',
                            description: 'Space between the left and the content.',
                            example: '15px',
                            default: 'null'
                        }
                    ]
                },
                {
                    name: 'Header/Footer',
                    key: 'headings',
                    description: 'You can configure the aspect of your header and footer document using the following values',
                    parameters: [
                        {
                            name: 'source',
                            required: true,
                            type: 'URL or string',
                            description: 'Element to add in the header/footer part of the document. You can use variables, indicated at the end of the document. PDFShift will automatically detect if it\'s an URL and load it, or an HTML data and charge it.',
                            example: '<h1>My awesome document!</h1>',
                            default: 'null'
                        },
                        {
                            name: 'spacing',
                            required: true,
                            type: 'String',
                            description: 'A spacing between the header or footer and the content. For header, it\'s the space between the header and the beginning of the document. For the footer, it\'s the space between the end of the document and the bottom of the page.',
                            default: 'null',
                            example: '150px'
                        }
                        /*
                        Not implemented yet ...
                        {
                            name: 'exclude',
                            required: false,
                            type: 'Array',
                            description: 'Array of page numbers on which the header/footer are not printed. Negatives values are possible and will indicate starding at the end of the document. [1, -1] means no header/footer on firts and last page.',
                            default: 'null',
                            example: '1024px'
                        }
                        */
                    ]
                },
                {
                    name: 'Protection',
                    key: 'protection',
                    description: 'You can restrict access to your generated document using the following rules. The encryption is made in 128bits.',
                    parameters: [
                        {
                            name: 'author',
                            required: false,
                            type: 'String',
                            description: 'Document\'s author name',
                            default: 'null',
                            example: 'Richard Hendricks'
                        },
                        {
                            name: 'user_password',
                            required: false,
                            type: 'String',
                            description: 'A user who has the password will be able to view the document and perform operations allowed by the permission options',
                            default: 'null',
                            example: 'super-user-password'
                        },
                        {
                            name: 'owner_password',
                            required: false,
                            type: 'String',
                            description: 'A user who has the password will have unlimited access to the PDF, including changing the passwords and permission options.',
                            default: 'null',
                            example: 'super-owner-password'
                        },
                        {
                            name: 'no_print',
                            required: false,
                            type: 'Boolean',
                            description: 'When set to true, printing will be disabled.',
                            default: 'false',
                            example: 'true'
                        },
                        {
                            name: 'no_copy',
                            required: false,
                            type: 'Boolean',
                            description: 'When set to true, the possibility to copy any text will be disabled.',
                            default: 'false',
                            example: 'true'
                        },
                        {
                            name: 'no_modify',
                            required: false,
                            type: 'Boolean',
                            description: 'When set to true, the possibility to modify the document will be disabled.',
                            default: 'false',
                            example: 'true'
                        }
                    ]
                },
                {
                    name: 'Watermark with Image',
                    key: 'watermark-image',
                    description: 'You can add an image as watermark to your document easily. Here\'s how:',
                    parameters: [
                        {
                            name: 'image',
                            required: false,
                            type: 'String',
                            description: 'Image file to add on top of the generated PDF. PDFShift will automatically detect if it\'s an URL or a data, and act accordingly. When sending as data, the value must be base64 encoded.',
                            example: 'http://www.website.com/images/logo.png',
                            default: 'null'
                        },
                        {
                            name: 'offset_x',
                            required: false,
                            type: 'Number/String',
                            description: 'Position starting from the left of the document. Accepted values are any number, "left", "right" or "center".',
                            default: 'null',
                            example: 'center'
                        },
                        {
                            name: 'offset_y',
                            required: false,
                            type: 'Number/String',
                            description: 'Position starting from the top of the document. Accepted values are any number, "top", "middle", "bottom".',
                            default: 'null',
                            example: 'middle'
                        },
                        {
                            name: 'rotate',
                            required: false,
                            type: 'Number',
                            description: 'Rotation of the image, in degrees',
                            default: 'null',
                            example: '90'
                        }
                    ]
                },
                {
                    name: 'Watermark with Text',
                    key: 'watermark',
                    description: 'You can add a text as a watermark on your document easily. Here\'s how:',
                    parameters: [
                        {
                            name: 'text',
                            required: false,
                            type: 'String',
                            description: 'Text to add on top of the generated PDF.',
                            example: 'My Awesome Service',
                            default: 'null'
                        },
                        {
                            name: 'offset_x',
                            required: false,
                            type: 'String',
                            description: 'Position starting from the left of the document. Accepted values are any number, "left", "right" or "center".',
                            default: 'null',
                            example: '150px'
                        },
                        {
                            name: 'offset_y',
                            required: false,
                            type: 'String',
                            description: 'Position starting from the top of the document. Accepted values are any number, "top", "middle", "bottom".',
                            default: 'null',
                            example: '240px'
                        },
                        {
                            name: 'rotate',
                            required: false,
                            type: 'Number',
                            description: 'Rotation of the text, in degrees',
                            default: 'null',
                            example: '90'
                        },
                        {
                            name: 'font_size',
                            required: false,
                            type: 'Number',
                            description: 'Size of the font, in points.',
                            default: '16',
                            example: '25'
                        },
                        {
                            name: 'font_family',
                            required: false,
                            type: 'String',
                            description: 'Font Family native to PDF. Allowed fonts are Helvetica, Times and Courier.',
                            default: 'null',
                            example: '90'
                        },
                        {
                            name: 'font_color',
                            required: false,
                            type: 'String',
                            description: 'Color of the font, in hexadecimal.',
                            default: '#000',
                            example: '#ccc'
                        },
                        {
                            name: 'font_opacity',
                            required: false,
                            type: 'Number',
                            description: 'Opacity of the font, between 0 (invisible) and 100.',
                            default: '100',
                            example: '50'
                        },
                        {
                            name: 'font_bold',
                            required: false,
                            type: 'Boolean',
                            description: 'Set the font in Bold.',
                            default: 'false',
                            example: 'true'
                        },
                        {
                            name: 'font_italic',
                            required: false,
                            type: 'Boolean',
                            description: 'Set the font in italic.',
                            default: 'false',
                            example: 'true'
                        }
                    ]
                },
                {
                    name: 'Watermark with PDF',
                    key: 'watermark',
                    description: 'You can also add a watermark to your document easily using an already existing PDF (one page) file.. Here\'s how:',
                    parameters: [
                        {
                            name: 'source',
                            required: false,
                            type: 'String',
                            description: 'PDF (single page) document to add on top of the generated PDF. PDFShift will automatically detect if it\'s an URL or a data, and act accordingly. When sending as data, the value must be base64 encoded.',
                            example: 'http://www.website.com/images/watermark.pdf',
                            default: 'null'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
