// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  //fonts
  modules: [
    ['@nuxtjs/google-fonts', {
        families: {
          'Inter+Tight': [400, 500, 600, 700],
          'Familjen+Grotesk': [400, 500, 600],
        }
    },]
  ],
  plugins: [
    '~/plugins/highlight.js'
  ],
  //styles
  css: ['~/assets/scss/main.scss'],
  vite: {
    optimizeDeps: {
    },
  },
})
