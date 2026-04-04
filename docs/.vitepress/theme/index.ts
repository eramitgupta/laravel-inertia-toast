// https://vitepress.dev/guide/custom-theme
import { h, onBeforeUnmount, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroTechOrbit from './components/HeroTechOrbit.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    onMounted(() => {
      document.getElementById('VPContent')?.classList.remove('is-home')
    })

    onBeforeUnmount(() => {
      document.getElementById('VPContent')?.classList.remove('is-home')
    })

    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HeroTechOrbit)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
