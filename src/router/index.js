import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pricing from '@/components/Pricing'
import Features from '@/components/Features'
import Documentation from '@/components/Documentation'
import FAQ from '@/components/FAQ'
import Register from '@/components/Register'
import Login from '@/components/Login'

import AccountParent from '@/components/account/Parent'
import AccountDetails from '@/components/account/Details'
import AccountEdit from '@/components/account/Edit'
import UpgradePlans from '@/components/account/upgrade/Plans'
import UpgradeStripe from '@/components/account/upgrade/Stripe'
import UpgradeFinished from '@/components/account/upgrade/Finished'

import Terms from '@/components/laws/Terms'
import Privacy from '@/components/laws/Privacy'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    mode: 'history', // (window.location.hostname === 'pdfshift.io' ? 'history' : 'hash'),
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
            component: AccountParent,
            children: [
                {
                    path: '',
                    name: 'account',
                    component: AccountDetails
                },
                {
                    path: 'edit',
                    name: 'account-edit',
                    component: AccountEdit
                },
                {
                    path: 'upgrade',
                    name: 'upgrade-plans',
                    component: UpgradePlans
                },
                {
                    path: 'upgrade/:plan',
                    name: 'upgrade-stripe',
                    component: UpgradeStripe
                },
                {
                    path: 'upgrade/:plan/success',
                    name: 'upgrade-finished',
                    component: UpgradeFinished
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
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})
