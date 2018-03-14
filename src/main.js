// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import Highlight from 'highlightjs'
import 'highlightjs/styles/atom-one-dark.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.http.options.root = 'http://127.0.0.1:5000/v2/'

Vue.directive('hljs', {
    inserted: function (el) {
        Highlight.highlightBlock(el)
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
