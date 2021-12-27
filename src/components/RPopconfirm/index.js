import RPopconfirm from './src/main';

/* istanbul ignore next */
RPopconfirm.install = function(Vue) {
  Vue.component(RPopconfirm.name, RPopconfirm);
};

export default RPopconfirm;
