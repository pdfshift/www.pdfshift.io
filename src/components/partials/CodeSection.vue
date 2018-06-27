<template>
    <div class="code-section" v-bind:class="{'visible': visible}">
        <span style="display: none"><slot></slot></span>
        <pre><code :class="lang" v-hljs ref="code" class="hljs"></code></pre>
        <div class="buttons">
            <a href="javascript:;" title="Click here to copy to clipoard" class="button" ref="copy" v-if="clipboard">{{ copyMessage }}</a>
        </div>
    </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
    props: {
        lang: String,
        visible: Boolean
    },
    data () {
        return {
            'clipboard': ClipboardJS.isSupported(),
            'copyMessage': 'Copy to clipboard'
        }
    },
    mounted () {
        /* eslint-disable no-new */
        this.clipboard = new ClipboardJS(this.$refs.copy, {
            text: (trigger) => {
                return this.$refs.code.innerText
            }
        })

        this.clipboard.on('success', (e) => {
            this.resetCopyMessage('Copied!')
            e.clearSelection()
        })

        this.clipboard.on('error', (e) => {
            this.setCopyMessage('An error occured!')
        })
    },
    beforeDestroy () {
        this.clipboard.destroy()
    },
    methods: {
        resetCopyMessage (message) {
            this.copyMessage = message
            setTimeout(() => {
                this.copyMessage = 'Copy to clipboard'
            }, 2500)
        }
    }
}

</script>

<style lang="less" scoped>
div.code-section {
    display: none;
    position: relative;

    &.visible {
        display: block
    }

    .buttons {
        display: block;
        position: absolute;
        top: 10px;
        right: 30px;

        &>a {
            display: block;
            width: 180px;
            text-align: center;
            padding: 10px 20px;
            background-color: #c7c7c7;
            color: #333;
            opacity: 0.25;
            transition: opacity 0.25s ease-in-out;

            &:hover {
                opacity: 1;
            }

            &:first-child {
                margin-bottom: 10px
            }
        }
    }
}

pre,code {margin: 0; padding: 0}

code {
    padding: 20px;
    font-size: 18px;
    line-height: 1.5em;
    letter-spacing: 0.0625em;
    word-spacing: 0.0625em;
    overflow: scroll
}
</style>
