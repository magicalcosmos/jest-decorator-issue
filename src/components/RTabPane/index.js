import RTabPane from '../RTabs/src/tab-pane.vue';

/* istanbul ignore next */
RTabPane.install = function(Vue) {
  Vue.component(RTabPane.name, RTabPane);
};

export default RTabPane;
