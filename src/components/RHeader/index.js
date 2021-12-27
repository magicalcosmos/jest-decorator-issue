import RHeader from './src/main';

/* istanbul ignore next */
RHeader.install = function(Vue) {
  Vue.component(RHeader.name, RHeader);
};

export default RHeader;
