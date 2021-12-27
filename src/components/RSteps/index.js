import RSteps from './src/steps';

/* istanbul ignore next */
RSteps.install = function(Vue) {
  Vue.component(RSteps.name, RSteps);
};

export default RSteps;
