// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jsonpAdapter from 'axios-jsonp'
// import VueLocalStorage from 'vue-localstorage'



Vue.use(VueAxios, axios)
Vue.use(Buefy)
// Vue.use(VueLocalStorage)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
