import RTooltip from './src/main';

/* istanbul ignore next */
RTooltip.install = function(Vue) {
  Vue.component(RTooltip.name, RTooltip);
};

export default RTooltip;
