import RCascaderPanel from './src/cascader-panel';

/* istanbul ignore next */
RCascaderPanel.install = function(Vue) {
  Vue.component(RCascaderPanel.name, RCascaderPanel);
};

export default RCascaderPanel;
