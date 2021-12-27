import RDialog from './src/component';

/* istanbul ignore next */
RDialog.install = function(Vue) {
  Vue.component(RDialog.name, RDialog);
};

export default RDialog;
