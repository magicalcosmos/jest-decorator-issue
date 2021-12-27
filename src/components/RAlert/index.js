import RAlert from './src/main';

/* istanbul ignore next */
RAlert.install = function(Vue) {
  Vue.component(RAlert.name, RAlert);
};

export default RAlert;
