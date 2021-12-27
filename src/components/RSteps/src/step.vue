<template>
  <div
    class="r-step d-flex align-items-center"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
     ]">
    <!-- title & description -->
    <div class="r-step__main">
      <div
        class="r-step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <!-- icon & line -->
    <div
      class="r-step__head d-flex align-items-center justify-content-center"
      :class="`is-${currentStatus}`">
      <div
        class="r-step__line r-step__prefix"
      >
      </div>
      <div class="r-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon">
          <i v-if="icon" class="r-step__icon-inner" :class="[icon]"></i>
          <div class="r-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
        </slot>
        <i
          v-else
          :class="['r-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
          class="r-step__icon-inner is-status"
        >
        </i>
      </div>
      <div
        class="r-step__line r-step__suffix"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RStep',
  componentName: 'RStep',
  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },

  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ''
    };
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === 'vertical';
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const { isSimple, $parent: { space }} = this;
      return isSimple ? '' : space;
    }
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }
    }
  },

  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.$watch('$parent.processStatus', () => {
        const activeIndex = this.$parent.active;
        this.updateStatus(activeIndex);
      }, { immediate: true });
      unwatch();
    });
  }
};
</script>
