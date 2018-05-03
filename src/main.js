// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* global window */

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import Highlight from 'highlightjs'
import 'highlightjs/styles/atom-one-dark.css'
import Moment from 'moment'

Vue.config.productionTip = false

Vue.use(VueResource)
if (window.document.location.hostname === 'pdfshift.io') {
    Vue.http.options.root = 'https://api.pdfshift.io/v2/'
    // window.stripe_instance = window.Stripe('pk_test_Cb3MgX6F1hv4WVNgVUX3QHG3')
} else {
    Vue.http.options.root = 'http://127.0.0.1:5000/v2/'
    // window.stripe_instance = window.Stripe('pk_test_Cb3MgX6F1hv4WVNgVUX3QHG3')
}

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

Vue.filter('datetime', (date) => {
    return Moment.utc(date).format('DD/MM/YYYY')
})
