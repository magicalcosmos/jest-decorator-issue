<script>
import Emitter from '@/components/RSrc/mixins/emitter';

export default {
  name: 'RCheckboxGroup',

  componentName: 'RCheckboxGroup',

  mixins: [Emitter],

  inject: {
    rFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _elFormItemSize() {
      return (this.rFormItem || {}).elFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    value(value) {
      this.dispatch('RFormItem', 'el.form.change', [value]);
    }
  }
};
</script>

<template>
  <div class="r-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
