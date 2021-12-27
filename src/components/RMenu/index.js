import RMenu from './src/menu';

/* istanbul ignore next */
RMenu.install = function(Vue) {
  Vue.component(RMenu.name, RMenu);
};

export default RMenu;
