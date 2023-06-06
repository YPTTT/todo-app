import Vue from 'vue'
import App from './App.vue'
import VueX from 'vuex'

Vue.use(VueX)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
