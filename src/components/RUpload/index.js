import RUpload from './src';
/* istanbul ignore next */
RUpload.install = function(Vue) {
  Vue.component(RUpload.name, RUpload);
};

export default RUpload;
