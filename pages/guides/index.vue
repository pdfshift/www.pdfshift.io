<template>
    <section class="guides">
        <div class="container">
            <ul class="guides__breadcrumbs">
                <li><a href="/">Home</a></li>
                <li>Guides</li>
            </ul>
            <h1 class="guides__heading">Our Guides</h1>
            <p>Here's the list of all our guides that might help you integrate PDFSHift into your service.</p>

            <div class="guides__cards">
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-node/" title="Using Node.js">
                    <div class="guides__card__img">
                        <img src="/images/guides/node.svg" alt="NodeJS's logo" />
                    </div>
                    <p>Convert HTML to PDF using Node.js</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-python/" title="Using Python">
                    <div class="guides__card__img">
                        <img src="/images/guides/python-requests.svg" alt="Python's logo" />
                    </div>
                    <p>Convert HTML to PDF using Python and `requests` package</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-php/" title="Using PHP">
                    <div class="guides__card__img">
                        <img src="/images/guides/php.svg" alt="PHP's logo" />
                    </div>
                    <p>Convert HTML to PDF using PHP</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-ruby/" title="Using Ruby">
                    <div class="guides__card__img">
                        <img src="/images/guides/ruby.svg" alt="Ruby's logo" />
                    </div>
                    <p>Convert HTML to PDF using Ruby</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-java/" title="Using Java">
                    <div class="guides__card__img">
                        <img src="/images/guides/java.svg" alt="Java's logo" />
                    </div>
                    <p>Convert HTML to PDF using Java</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-csharp/" title="Using C#">
                    <div class="guides__card__img">
                        <img src="/images/guides/csharp.svg" alt="C#'s logo" />
                    </div>
                    <p>Convert HTML to PDF using C#</p>
                    <div class="guides__more">Read Guide</div>
                </a>
                <a class="column guides__card" href="/guides/convert-html-to-pdf-with-go/" title="Using GO">
                    <div class="guides__card__img">
                        <img src="/images/guides/go.svg" alt="GO's logo" />
                    </div>
                    <p>Convert HTML to PDF using GO</p>
                    <div class="guides__more">Read Guide</div>
                </a>
            </div>
        </div>
    </section>
</template>

<script>
const seoTitle = 'List of our guides'
const seoDescription = 'Here are a list of all our guides that might help you integrate PDFSHift to your service.'

export default {
    head: {
        title: seoTitle + ' — PDFShift',
        meta: [
            { hid: 'description', name: 'description', content: seoDescription },
            { hid: 'twitter:title', name: 'twitter:title', content: seoTitle },
            { hid: 'og:title', name: 'og:title', content: seoTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: seoDescription },
            { hid: 'og:description', name: 'og:description', content: seoDescription }
        ]
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/_common';

$purple-shadow: 0px 8px 25px rgba(130, 96, 182, 0.15);

.guides {
    background-color: rgba($color-light-grey, 0.2);
    color: $color-text-grey;
    padding: 4em 0;
    line-height: 1.8;
    margin-bottom: -100px;
    p {
        line-height: inherit;
    }
    &__breadcrumbs {
        list-style: none;
        color: $color-text-grey;
        font-size: 0.9em;
        font-weight: 500;
        margin: -2em 0 4em;
        li {
            display: inline-block;
            margin-left: 0 !important;
            margin-right: 1em !important;
            a {
                color: $color-grey;
                border-bottom-width: 0;
                font-weight: 500;
            }

            &:not(:last-child) {
                &:after {
                    content: "";
                    display: inline-block;
                    width: 0.7em;
                    height: 0.7em;
                    background-image: url('/images/guides/angle-right.svg');
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    margin-left: 1em;
                }
            }
        }
    }
    &__heading {
        color: $color-black !important;
        margin: 0.5em 0 !important;
        font-size: 2.4em;
        font-weight: 600 !important;
    }
    &__cards {
        margin-top: 2em;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
    &__card {
        flex: 0 1 23%;
        border: 1px solid $color-light-grey;
        border-radius: 5px;
        margin: 1.5em;
        box-shadow: $purple-shadow;
        background-color: $color-white;
        padding: 1.5em 1.5em 3.5em;
        display: inline-block;
        position: relative;
        transition: all 150ms ease-in-out;
        color: $color-black;
        font-weight: 300;
        &:hover {
            transform: scale(1.05);
            border-color: $color-primary;
        }
        &__img {
            margin: 2em;
            text-align: center;
        }
    }
    &__more {
        color: $color-primary;
        position: absolute;
        bottom: 1em;
        font-weight: 500;
        &:after {
            content: url('/images/guides/arrow-right-purple.svg');
            position: absolute;
            margin-left: 0.5em;
            top: 0.1em;
        }
    }
}
</style>
