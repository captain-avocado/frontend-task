import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store as keywords } from '@/components/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    keywords
  }
})
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
