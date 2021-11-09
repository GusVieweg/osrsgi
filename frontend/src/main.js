import Vue from "vue"
import App from "./App.vue"
import NewApp from "./apps/NewApp.vue"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import _ from "lodash"

Vue.config.productionTip = false

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_HOST_URL,
})

Vue.prototype.$_ = _

function deployVueApp(component, id) {
  if (document.getElementById(id)) {
    new Vue({
      vuetify,
      render: (h) => h(component),
    }).$mount(`#${id}`)
  }
}

deployVueApp(App, "app")
deployVueApp(NewApp, "new-app")
