import DefaultTheme from 'vitepress/theme'
import ProfileCard from './components/ProfileCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProfileCard', ProfileCard)
  },
}
