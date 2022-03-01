<template>
    <div class="guide-page">
        <div class="container">
            <div class="page">
                <ul class="guides__breadcrumbs">
                    <li><a href="/">Home</a></li>
                    <li><a href="/guides/">Guides</a></li>
                    <li>{{ seo_title }}</li>
                </ul>

                <div class="guide-page__wrap">
                    <div>
                        <ul class='guide-page__navi'>
                            <li v-for="link in document.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class='guide-page__content'>
                        <nuxt-content :document="document" />
                    </div>
                </div>
            </div>
            <p class="small guide-page__docs">(Read our <a href="https://docs.pdfshift.io" target="_blank" title="PDFShift's API Reference.">API documentation</a> for more, in depth, details.)</p>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData ({ $content, route }) {
        const document = await $content(`guides/${route.params.slug}`).fetch()

        return { document }
    },
    head () {
        if (!this.document?.title) {
            return
        }

        return {
            title: this.document.title + ' — PDFShift',
            meta: [
                { hid: 'description', name: 'description', content: this.document.description },
                { hid: 'twitter:title', name: 'twitter:title', content: this.document.title },
                { hid: 'og:title', name: 'og:title', content: this.document.title },
                { hid: 'twitter:description', name: 'twitter:description', content: this.document.description },
                { hid: 'og:description', name: 'og:description', content: this.document.description }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/_common';

.guides {
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
                    background-image: url('/static/images/press/angle-right.svg');
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    margin-left: 1em;
                }
            }
        }
    }
}

.guide-page {
    background-color: rgba($color-light-grey, 0.2);
    padding: 4em 0;
    margin-bottom: -100px;
    &__wrap {
        display: flex;
    }
    &__navi {
        list-style: none;
        padding-right: 2em;
        margin: 0;
        position: sticky;
        top: 100px;
        li {
            margin: 1em 0 0.5em !important;
            padding: 0;
            font-weight: 600;
            > a {
                padding: 0.5em;
                border: 0;
                color: $color-black;
                opacity: 0.7;
                &:hover {
                    opacity: 1;
                }
            }
        }
        > ul {
            list-style: none;
            > li {
                font-size: 0.8em;
                margin: 0.1em 0 !important;
                padding-left: 2em;
                &:before {
                    content: "-";
                    opacity: 0.5;
                    margin-left: -1em;
                }
                a {
                    font-weight: 300;
                }
            }
        }
    }
    &__content {
        background-color: $color-white;
        border: 1px solid $color-light-grey;
        padding: 2em;
        width: 70%;
        & > p {
            line-height: 1.8;
        }
        pre {
            overflow-x: scroll;
            border: 1px solid $color-light-grey;
            border-radius: 10px;
            font-size: 0.8em;
            font-family: monospace;
            margin: 1.5em 0;
        }
        h1 {
            margin: 0.5em 0;
            font-size: 2.5em;
            color: $color-black
        }
        h2, h3 {
            line-height: 1.4;
            margin-top: 0;
            padding-top: 1.7em;
            a {
                color: $color-black;
                border: 0;
                display: flex;
                align-items: center;
                &:hover {
                    &:after {
                        content: '';
                        height: 0.8em;
                        width: 1em;
                        display: inline-block;
                        background: url('/static/images/guides/link.svg') no-repeat center center;
                        margin-top: 0.2em;
                    }
                }
            }
        }
        ul {
            margin: 1em 0 !important;
        }
    }
    &__docs {
        text-align: right;
        margin-top: 1em;
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ Responsive ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@include media-tablets {
    .guides {
        padding: 2em 1em;
        &__card {
            display: flex;
            align-content: center;
            align-items: center;
            padding: 1em;
            &__img {
                min-width: 150px;
            }
            p {
                margin: 1em 0;
            }
            &:hover {
                transform: scale(1);
            }
        }
        &__more {
            right: 2.5em;
        }
    }
}

@include media-mobiles {
    .guides {
        padding: 2em 1em;
        &__heading {
            margin: 0.5em 0 !important;
        }
        &__breadcrumbs {
            margin: 0 0 2em;
        }
        &__card {
            margin: 0.5em;
            &:hover {
                transform: scale(1);
            }
        }
    }

    .guide-page {
        &__wrap {
            display: flex;
            flex-flow: column;
        }
        &__navi {
            padding-right: 0;
            padding-bottom: 2em;
        }
        &__content {
            width: 100%;
        }
        &__docs {
            text-align: center;
        }
    }
}
</style>
