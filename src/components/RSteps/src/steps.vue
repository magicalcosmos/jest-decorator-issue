<template>
  <div
    class="r-steps"
    :class="[
       !simple && 'r-steps--' + direction,
       simple && 'r-steps--simple'
     ]">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from '@/components/RSrc/mixins/migrating';

export default {
  name: 'RSteps',
  componentName: 'RSteps',
  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
