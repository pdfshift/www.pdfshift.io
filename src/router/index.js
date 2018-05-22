import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pricing from '@/components/Pricing'
import Features from '@/components/Features'
import Documentation from '@/components/Documentation'
import FAQ from '@/components/FAQ'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Account from '@/components/Account'
import UpgradeParent from '@/components/upgrade/Parent'
import UpgradePlans from '@/components/upgrade/Plans'
import UpgradeStripe from '@/components/upgrade/Stripe'

import Terms from '@/components/laws/Terms'
import Privacy from '@/components/laws/Privacy'
import Gdpr from '@/components/laws/Gdpr'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    mode: (window.location.hostname === 'pdfshift.io' ? 'history' : 'hash'),
    scrollBehavior (to, from, savedPosition) {
        if (to.name === from.name) return false
        return { x: 0, y: 0 }
    },
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
            path: '/demo',
            name: 'Demo',
            component: Pricing // TODO
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
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/account/:token',
            name: 'Account',
            component: Account
        },
        {
            path: '/account/:token/upgrade',
            component: UpgradeParent,
            children: [
                {
                    path: '',
                    name: 'upgrade-plans',
                    meta: {hideMenu: true},
                    component: UpgradePlans
                },
                {
                    path: ':plan',
                    name: 'upgrade-stripe',
                    meta: {hideMenu: true},
                    component: UpgradeStripe
                }
            ]
        },
        {
            path: '/terms',
            name: 'Terms',
            component: Terms
        },
        {
            path: '/privacy',
            name: 'Privacy',
            component: Privacy
        },
        {
            path: '/gdpr',
            name: 'GDPR',
            component: Gdpr
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})
