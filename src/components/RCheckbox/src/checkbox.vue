<template>
  <label
    class="r-checkbox"
    :class="[
      border && checkboxSize ? 'r-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    :id="id"
  >
    <span
      class="r-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <!--span class="r-checkbox__inner" v-if="!isChecked"></span-->
      <span v-if="!unread" class="r-checkbox-icon__box">
        <span v-if="indeterminate">
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-selected-half"></use>
          </svg>
        </span>
        <span v-else-if="!isChecked">
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-select"></use>
          </svg>
        </span>
        <span v-else-if="isChecked && isDisabled">
          <i class="iconfont icon pointer icon-select2 r-checkbox__select2"></i>
        </span>
        <span v-else>
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-select2"></use>
          </svg>
        </span>
      </span>
      <span v-else>
        <span v-if="indeterminate">
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-unread-selected-half"></use>
          </svg>
        </span>
        <span v-else-if="!isChecked">
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-unread"></use>
          </svg>
        </span>
        <span v-else>
          <svg class="icon pointer" aria-hidden="true">
            <use xlink:href="#icon-unread-selected"></use>
          </svg>
        </span>
      </span>
      <input
        v-if="trueLabel || falseLabel"
        class="r-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="r-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="r-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
/*eslint-disable */
import Emitter from '@/components/RSrc/mixins/emitter';

export default {
  name: 'RCheckbox',

  mixins: [Emitter],

  inject: {
    rForm: {
      default: ''
    },
    rFormItem: {
      default: ''
    }
  },

  componentName: 'RCheckbox',

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },

  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel;
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true));

          this.isLimitExceeded === false &&
          this.dispatch('RCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'RCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min) &&
        (this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked);
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.rForm || {}).disabled || this.isLimitDisabled
        : this.disabled || (this.rForm || {}).disabled;
    },

    _elFormItemSize() {
      return (this.rFormItem || {}).elFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String,
    unread: Boolean
  },

  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('RCheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      });
    }
  },

  created() {
    this.checked && this.addToStore();
  },
  mounted() { // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },

  watch: {
    value(value) {
      this.dispatch('RFormItem', 'el.form.change', value);
    },
    unread(unread) {
      this.dispatch('RFormItem', 'el.form.change', unread);
    }
  }
};
</script>
