import RTable from './src/table';

/* istanbul ignore next */
RTable.install = function(Vue) {
  Vue.component(RTable.name, RTable);
};

export default RTable;
