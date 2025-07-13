// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: '學生自治法規整理平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '台灣各級學校學生自治組織法規整理平台' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    // For GitHub Pages deployment, change to your repo name, e.g., '/student-regulations/'
    baseURL: '/', // Set base URL for deployment, e.g., for GitHub Pages: '/your-repo-name/'
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  plugins: [
    '~/plugins/ga4.client.ts', // Google Analytics 4
  ],
  css: [
    '~/assets/css/main.css', // Ensure your main CSS is included
  ],
  runtimeConfig: {
    public: {
      ga4MeasurementId: process.env.NUXT_PUBLIC_GA4_MEASUREMENT_ID || '', // GA4 ID
    },
  },
})