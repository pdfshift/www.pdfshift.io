<template>
    <div class="language-switch">
        <ul>
            <router-link :to="{name: 'Features', query: {'lang': 'javascript'}}" tag="li" active-class="active" exact replace><a>Javascript</a></router-link>
            <router-link :to="{name: 'Features', query: {'lang': 'python'}}" tag="li" active-class="active" exact replace><a>Python</a></router-link>
            <router-link :to="{name: 'Features', query: {'lang': 'php'}}" tag="li" active-class="active" exact replace><a>PHP</a></router-link>
            <router-link :to="{name: 'Features', query: {'lang': 'curl'}}" tag="li" active-class="active" exact replace><a>cURL</a></router-link>
        </ul>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/colors.less';
@import '../../assets/styles/generals.less';

.language-switch {
    ul {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: baseline;

        li {
            margin: 0 10px;
            padding: 0;
            flex-grow: 1;

            &:first-child {
                margin-left: 0;
            }

            a {
                padding: 10px 5px 2px;
                color: lighten(@primary_color, 20%);
                text-decoration: none;
                transition: border-color 0.35s ease, color 0.35s ease;
                border-color: #fff;

                &:hover {
                    color: darken(@primary_color, 10%);
                }
            }

            &.active a {
                color: darken(@primary_color, 10%);
                border-bottom: solid 2px lighten(@primary_color, 10%);
            }
        }
    }
}
</style>
