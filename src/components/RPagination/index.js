import RPagination from './src/pagination';

/* istanbul ignore next */
RPagination.install = function(Vue) {
  Vue.component(RPagination.name, RPagination);
};

export default RPagination;
