import RRadio from './src/radio';

/* istanbul ignore next */
RRadio.install = function(Vue) {
  Vue.component(RRadio.name, RRadio);
};

export default RRadio;
