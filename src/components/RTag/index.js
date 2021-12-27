import RTag from './src/tag';
/* istanbul ignore next */
RTag.install = function(Vue) {
  Vue.component(RTag.name, RTag);
};

export default RTag;
