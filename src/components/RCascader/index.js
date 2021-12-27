import RCascader from './src/cascader';

/* istanbul ignore next */
RCascader.install = function(Vue) {
  Vue.component(RCascader.name, RCascader);
};

export default RCascader;
