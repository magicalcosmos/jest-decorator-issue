import RStep from '../RSteps/src/step';

/* istanbul ignore next */
RStep.install = function(Vue) {
  Vue.component(RStep.name, RStep);
};

export default RStep;
