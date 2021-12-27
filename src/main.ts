// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import i18n from '@/i18n';
import App from '@/App.vue';

window['vm'] = new Vue({
  i18n,
  render: create => create(App)
}).$mount('#app');
