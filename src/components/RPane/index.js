import RPane from '../RSplitPanes/src/pane';

/* istanbul ignore next */
RPane.install = function(Vue) {
  Vue.component(RPane.name, RPane);
};

export default RPane;
