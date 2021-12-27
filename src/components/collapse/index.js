import RCollapse from './src/collapse';

/* istanbul ignore next */
RCollapse.install = function(Vue) {
  Vue.component(RCollapse.name, RCollapse);
};

export default RCollapse;
