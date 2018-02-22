import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pricing from '@/components/Pricing'
import Features from '@/components/Features'
import Documentation from '@/components/Documentation'
import FAQ from '@/components/FAQ'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/pricing',
            name: 'Pricing',
            component: Pricing
        },
        {
            path: '/features',
            name: 'Features',
            component: Features
        },
        {
            path: '/documentation',
            name: 'Documentation',
            component: Documentation
        },
        {
            path: '/faq',
            name: 'FAQ',
            component: FAQ
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})
