import ROption from '../RSelect/src/option';

/* istanbul ignore next */
ROption.install = function(Vue) {
  Vue.component(ROption.name, ROption);
};

export default ROption;
