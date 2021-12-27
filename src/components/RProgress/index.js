import RProgress from './src/progress';

/* istanbul ignore next */
RProgress.install = function(Vue) {
  Vue.component(RProgress.name, RProgress);
};

export default RProgress;
