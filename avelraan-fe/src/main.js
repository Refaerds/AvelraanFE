import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import router from "./router/router";

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue';
import './assets/styles/custom.scss';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  beforeCreate() { this.$store.dispatch('playerData/initializeFromStorage') },
  render: h => h(App),
}).$mount('#app')
