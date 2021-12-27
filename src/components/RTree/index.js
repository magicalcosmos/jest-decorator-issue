import RTree from './src/tree.vue';

/* istanbul ignore next */
RTree.install = function(Vue) {
  Vue.component(RTree.name, RTree);
};

export default RTree;
