// https://vitepress.dev/guide/custom-theme
import { h, onBeforeUnmount, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoVideoPlayer from './components/DemoVideoPlayer.vue'
import HeroTechOrbit from './components/HeroTechOrbit.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoVideoPlayer', DemoVideoPlayer)
  },
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
  }
} satisfies Theme
