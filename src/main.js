import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {store} from './store/store';

Vue.config.productionTip = false

import routes from './components/routes';
import browserDetect from 'vue-browser-detect-plugin';
Vue.use(browserDetect);

const router = new VueRouter({mode: 'history',routes:  routes});
Vue.use(VueRouter)
const vm = new Vue({
  store: store,
  router,
  render: h => h(App)
  
}).$mount('#app')
global.vm = vm; 