import RDatePicker from './src/picker/date-picker';

/* istanbul ignore next */
RDatePicker.install = function install(Vue) {
  Vue.component(RDatePicker.name, RDatePicker);
};

export default RDatePicker;
