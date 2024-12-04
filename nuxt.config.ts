export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'admin',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      backBaseUrl: process.env.NUXT_PUBLIC_BACK_BASE_URL || 'http://localhost:3000', // Default fallback
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '', // Removes suffix so classes are `dark` or `light`
    preference: 'system', // Default theme based on the user's system preference
    fallback: 'light', // Fallback theme if no preference is set
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
});
