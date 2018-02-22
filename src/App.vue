<template>
  <div id="app">
    <router-view/>
    <footer>
        <div>
            <div>
                <ul>
                    <li><a href="javascript:;" title="Read our privacy policy (does someone do that?)">Privacy Policy</a></li>
                    <li><a href="javascript:;" title="Read our Terms of Use (again, do you really do that?)">Terms of Use</a></li>
                </ul>
            </div>
            <div>
                <a href="mailto:contact@pdfshift.io" title="Have a question? Want to say hi?">contact@pdfshift.io</a>
            </div>
            <div>
                <p>Made with ☃<br />in Belfort, France</p>
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
    background-color: fadeout(#5c62cd, 30%);
    border-top: solid 1px #5c62cd;
    padding: 20px 0;

    &>div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;

        &>div {
            color: #fff;
            text-align: center;
            line-height: 1.65em;

            a {
                color: #fff;
                text-decoration: none;
            }

            ul>li {text-align: left}
        }
    }
}
</style>
