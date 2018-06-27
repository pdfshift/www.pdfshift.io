<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Get more free conversions
                    <small>You can do these points to get more free credits</small>
                </h1>
            </div>
        </header>

        <div class="container">
            <div class="description">
                <p>
                    You can do the following options to get more free credits.<br />
                    For each actions, please <strong>send us either a screenshot or a link</strong> and we will update your account accordingly.
                </p>
            </div>
            <ul class="options">
                <li>
                    <input type="checkbox" name="twitter" id="option-twitter" />
                    <div>
                        <i></i>
                        <label for="option-twitter">
                            Talk about us on Twitter (<a href="http://bit.ly/pdfshift-on-twitter" target="_blank">Here's a quick tweet if you like</a>)
                        </label>
                        <strong>+50 credits</strong>
                    </div>
                </li>
                <li>
                    <input type="checkbox" name="rate_alternative" id="option-rate_alternative" />
                    <div>
                        <i></i>
                        <label for="option-rate_alternative">
                            Review us on <a href="https://alternativeto.net/software/pdfshift/" target="_blank">AlternativeTo</a>
                        </label>
                        <strong>+100 credits</strong>
                    </div>
                </li>
                <li>
                    <input type="checkbox" name="g2crowd" id="option-g2crowd" />
                    <div>
                        <i></i>
                        <label for="option-g2crowd">
                            Add your review on <a href="https://www.g2crowd.com/products/pdfshift/reviews" target="_blank">G2Crowd</a>
                        </label>
                        <strong>+100 credits</strong>
                    </div>
                </li>
                <li>
                    <input type="checkbox" name="blog" id="option-blog" />
                    <div>
                        <i></i>
                        <label for="option-blog">
                            Write a blog post talking about PDFShift
                        </label>
                        <strong>+350 credits</strong>
                    </div>
                </li>
                <li>
                    <input type="checkbox" name="footer" id="option-footer" />
                    <div>
                        <i></i>
                        <label for="option-footer">
                            Mention PDFShift in the footer of your website
                        </label>
                        <strong>+150 credits</strong>
                    </div>
                </li>
            </ul>
            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>

<style lang="less" scoped>
    @import '../assets/styles/generals.less';
    @import '../assets/styles/colors.less';
    .container {
        max-width: 640px;
    }

    .container>div {
        margin-top: 40px;
    }

    .container>div.cta {
        margin: 80px 0;
        text-align: center;
        a {
            padding: 20px 150px;
        }
    }

    .description {
        color: #444;
        font-style: italic
    }

    ul.options {
        >li{
            display: flex;
            flex-direction: column;

            input[type='checkbox']{ height: 0; width: 0; }

            input[type='checkbox'] + div {
                position: relative;
                display: flex;
                margin: .6em 0;
                align-items: center;
                color: #3a3a3a;
                transition: color 250ms cubic-bezier(.4,.0,.23,1);
            }

            input[type='checkbox'] + div > i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 1em;
                width: 20px;
                height: 20px;
                background: transparent;
                border: 2px solid #9E9E9E;
                border-radius: 2px;
                transition: all 250ms cubic-bezier(.4,.0,.23,1);
            }

            input[type='checkbox'] + div > label:hover, input[type='checkbox']:checked + div {
                color: #222;
            }
            input[type='checkbox'] + div > i {
                background: #eee;
            }

            input[type='checkbox']:checked + div > i:before {
                content: "";
                position: absolute;
                top: 7px;
                left: 3px;
                border-right: 3px solid transparent;
                border-bottom: 3px solid transparent;
                transform: rotate(45deg);
                transform-origin: 0% 100%;
                animation: checkbox-check 125ms cubic-bezier(.4,.0,.23,1) forwards;
            }

            div > strong { margin-left: auto; }
            div > label { cursor: pointer; }
        }
    }

    @keyframes checkbox-check{
        0%{
            width: 0;
            height: 0;
            border-color: #212121;
            transform: translate3d(0,0,0) rotate(45deg);
        }
        33%{
            width: 4px;
            height: 0;
            transform: translate3d(0,0,0) rotate(45deg);
        }
        100%{
            width: 10px;
            height: 20px;
            border-color: #212121;
            transform: translate3d(0,-18px,0) rotate(45deg);
        }
    }
</style>
