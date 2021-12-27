import RSplitPanes from './src/splitpanes';

/* istanbul ignore next */
RSplitPanes.install = function(Vue) {
  Vue.component(RSplitPanes.name, RSplitPanes);
};

export default RSplitPanes;
