import RAutocomplete from './src/autocomplete';

/* istanbul ignore next */
RAutocomplete.install = function(Vue) {
  Vue.component(RAutocomplete.name, RAutocomplete);
};

export default RAutocomplete;
