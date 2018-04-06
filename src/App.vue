<template>
  <div id="app">
    <router-view/>
    <footer>
        <div>
            <div style="text-align: left">
                <ul>
                    <router-link :to="{name: 'Privacy'}" tag="li" active-class="active"><a title="Read our Privacy Policy">Privacy Policy</a></router-link>
                    <router-link :to="{name: 'Terms'}" tag="li" active-class="active"><a title="Read our Terms of Use">Terms of Use</a></router-link>
                </ul>
            </div>
            <div style="text-align: right">
                <a href="mailto:contact@pdfshift.io" title="Have a question? Want to say hi?">contact@pdfshift.io</a>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
require('normalize.css/normalize.css')
</script>

<style lang="less">
@import 'assets/styles/colors.less';
@import 'assets/styles/generals.less';

body {
    font-family: Roboto, "Helvetica Neue", "Calibri Light", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.02em;
}

#app>footer {
    background-color: #fff;
    /* border-top: solid 1px #5c62cd; */
    border-top: solid 1px #ddd;
    padding: 20px 0;

    &>div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;

        &>div {
            color: #555;
            line-height: 1.65em;
            flex-grow: 1;

            a {
                color: #555;
                text-decoration: none;
                transition: color 0.25s ease-in-out;

                &:hover {
                    color: #222
                }
            }

            ul>li {text-align: left}
        }
    }
}
</style>
