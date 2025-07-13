import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const ga4MeasurementId = config.public.ga4MeasurementId

  if (ga4MeasurementId) {
    // Add Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    // @ts-ignore
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', ga4MeasurementId)

    // Track page views with Nuxt Router
    nuxtApp.hook('page:finish', () => {
      gtag('event', 'page_view', {
        page_path: nuxtApp.$router.currentRoute.value.fullPath,
        page_title: document.title,
      })
    })
  }
})
