export default defineNuxtPlugin({
    /**
     * This code is done as a plugin because it needs to be run only once when the page is loaded.
     */
    name: 'campaign',
    hooks: {
        // You can directly register Nuxt app runtime hooks here
        'app:beforeMount' () {
            const route = useRoute()
            try {
                const storage = useStorage()
                let campaign = null

                if (storage.get('pdfshift-campaign')) {
                    storage.set('campaign', storage.get('pdfshift-campaign'))
                    storage.remove('pdfshift-campaign')
                }

                campaign = storage.get('campaign', null)
                if (campaign) return

                campaign = {} // We init one
                if (!campaign.referrer && document.referrer) {
                    campaign.referrer = document.referrer
                }

                if (!campaign.source && 'ref' in route.query && route.query.ref) {
                    campaign.source = route.query.ref
                }

                ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'].forEach((key) => {
                    if (key in route.query && route.query[key]) {
                        if (key.substring(0, 4) === 'utm_') {
                            if (!('utm' in campaign)) {
                                campaign.utm = {}
                            }

                            campaign.utm[key.substring(4)] = route.query[key]
                            if (Array.isArray(campaign.utm[key.substring(4)])) {
                                campaign.utm[key.substring(4)] = campaign.utm[key.substring(4)][0]
                            }
                        } else {
                            campaign[key] = route.query[key]
                        }
                    }
                })

                if ('utm' in campaign) {
                    if (!campaign.source && 'source' in campaign.utm) {
                        campaign.source = campaign.utm.source
                    }
                }

                if (Object.keys(campaign).length > 0) {
                    storage.set('campaign', campaign)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
})