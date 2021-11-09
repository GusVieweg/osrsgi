import Vue from 'vue'
import App from './App.vue'
import NewApp from './apps/NewApp.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

function deployVueApp(component, id) {
  if (document.getElementById(id)) {
    new Vue({
      vuetify,
      render: h => h(component)
    }).$mount(`#${id}`)
  }
}

deployVueApp(App, 'app')
deployVueApp(NewApp, 'new-app')
