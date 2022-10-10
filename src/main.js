import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import mitt from 'mitt'

loadFonts()
const emitter = mitt()


const app = createApp(App)
  .use(router)
  .use(vuetify);
  app.mount('#app')
  app.config.globalProperties.emitter = emitter
