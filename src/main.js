// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './_store'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io';
import  config from '../config';
import moment from 'moment'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
 


Vue.component('datetime', Datetime);
Vue.use(VueSocketio, `${config.apiUrl}:8001/rte`)
Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
