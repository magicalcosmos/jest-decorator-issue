<template>
  <div
    class="n-input"
    :class="[
      type ? 'n-input-type-' + type : '',
      size ? 'n-input-size-' + size : '',
      dark ? 'is-dark' : '',
      textBorder ? 'has-text-border' : '',
      textBG ? 'has-text-bg' : '',
      hoverBG ? 'has-hover-bg' : '',
      currentPopup ? 'is-current-popup' : '',
      disabled ? 'is-disabled' : '',
      focused ? 'focused' : ''
    ]"
  >
    <div class="action">
      <i class="r-icon-check pointer n-input-save" @click.stop="handleSave"></i>
      <i class="r-icon-close pointer" @click.stop="handleClose"></i>
    </div>
    <div v-if="!currentPopup" class="hover-bg" @click.stop="handleFocus">
      <i class="iconfont icon-func-description"></i>
    </div>
    <input
      :tabindex="tabindex"
      class="n-input__inner d-inline-block"
      :class="[round ? 'is-round' : '']"
      v-bind="$attrs"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      ref="input"
      :title="title"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @focus="handleFocus"
      :aria-label="label"
    />
    <span v-if="currentPopup" class="more ml5 pointer" @click="handleMore">···</span>
  </div>
</template>
<script>
import emitter from '@/components/RSrc/mixins/emitter';
import Migrating from '@/components/RSrc/mixins/migrating';
import merge from '@/components/RSrc/utils/merge';
import { isKorean } from '@/components/RSrc/utils/shared';

export default {
  name: 'NInput',

  componentName: 'NInput',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false,
      currentPopup: this.popup
    };
  },
  props: {
    value: String,
    resize: String,
    form: String,
    dark: Boolean,
    round: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    title: String,
    dataName: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '32'
    },
    width: {
      type: String,
      default: '100%'
    },
    textBorder: {
      type: Boolean,
      default: true
    },
    textBG: {
      type: Boolean,
      default: true
    },
    hoverBG: {
      type: Boolean,
      default: true
    },
    popup: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    // 大小
    // huge big medium small mini
    size: {
      type: String,
      default: 'medium'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          );
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: 'r-icon-loading',
        success: 'r-icon-circle-check',
        error: 'r-icon-circle-close'
      }[this.validateState];
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      );
    },
    showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    }
  },

  watch: {
    focused: function(newval, oldval) {
      if (newval === false && this.value !== this.defaultValue) {
        this.handleSave();
      }
    },
    getPopup: function(newval, oldval) {
      this.currentPopup = newval;
    },
    value(val) {
      this.defaultValue = val;
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [val]);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue();
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.updateIconOffset();
      });
    }
  },

  methods: {
    handleMore() {
      this.$emit('handleMore', { value: this.value });
    },
    handleSave() {
      this.focused = false;
      const value = this.getInput() && this.getInput().value;
      if (this.defaultValue === value) {
        return;
      }
      this.$emit(
        'save',
        {
          dataName: this.dataName,
          value: value,
          defaultValue: this.defaultValue
        },
        this
      );
    },

    handleClose() {
      this.focused = false;
      this.setNativeInputValue();
    },
    
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          click: 'click is removed.'
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event, this);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return;

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    calcIconOffset(place) {
      const elList = [].slice.call(this.$el.querySelectorAll(`.n-input__${place}`) || []);
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.n-input-group__${pendant}`).offsetWidth
        }px)`;
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput() {
      return this.$refs.input;
    },
    getSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
      );
    },
    initEvents() {
      const that = this;
      document.addEventListener(
        'click',
        el => {
          if (that.$el !== el.target.parentNode && this.focused) {
            this.focused = false;
            this.handleSave();
          }
        },
        false
      );
    }
  },

  created() {
    this.$on('inputSelect', this.select);
  },
  updated() {
    this.$nextTick(this.updateIconOffset);
  },
  mounted() {
    this.defaultValue = this.value;
    this.initEvents();
    this.setNativeInputValue();
    this.updateIconOffset();
  }
};
</script>

<style lang="scss" scoped>
// 变量
$px-huge: 28px;
$px-big: 24px;
$px-medium: 20px;
$px-small: 20px;
$px-mini: 20px;
// 背景框颜色
$border-color: #cdcdcd;
// 样式开始
.n-input {
  display: inline-block;
  position: relative;
  z-index: 1;
  .hover-bg {
    cursor: default;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-radius: 2px;
    opacity: 0;
    z-index: 1;
    transition: 0.3s opacity;
    i {
      font-weight: normal;
      float: right;
      text-align: center;
      color: #666666;
      font-size: 22px;
    }
  }
  &.has-hover-bg .hover-bg {
    background-color: $border-color;
    border-color: $border-color;
  }
  .action {
    position: absolute;
    top: 2px;
    right: 0;
    opacity: 0;
    z-index: 0;
    background-color: #fff;
    border-top: none;
    border-radius: 0 0 3px 3px;
    outline: none;
    padding: 3px;
    box-shadow: 0 3px 6px rgba(111, 111, 111, 0.2);
    transition: 0.2s all;
    i {
      border-radius: 3px;
      font-weight: normal;
      background-color: $border-color;
      color: black;
      padding: 2px;
    }
  }
  input {
    position: relative;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 2px;
    font-size: 12px;
    padding: 2px 10px;
    margin: 2px;
    z-index: 2;
    transition: 0.3s width;
    &.is-round {
      border-radius: 999px;
    }
  }
  &.has-text-border {
    input {
      border-color: #e3e3e3;
    }
  }
  &.has-text-bg {
    input {
      background-color: white;
    }
  }
  .more {
    background: $deep-button-bg;
    position: absolute;
    top: 2px;
    right: -2px;
    border: 1px solid #666;
    border-radius: 2px;
    color: #999;
    text-align: center;
    line-height: 15px;
    font-size: 17px;
    font-weight: 900;
    overflow: hidden;
  }
  // 有更多按钮时
  &.is-current-popup {
    .action {
      //   right: 24px;
    }
  }
  // 不同尺寸
  &-size-huge {
    input,
    .hover-bg i {
      @include setHL($px-huge);
    }
    &.focused .action {
      top: calc(#{$px-huge} + 3px);
    }
    .hover-bg i {
      width: $px-huge;
    }
    .more {
      @include setWH($px-huge, $px-huge);
    }
    input {
      width: calc(100% - #{$px-huge} - 4px);
      font-size: 16px;
      padding: 4px 14px;
    }
  }
  &-size-big {
    input,
    .hover-bg i {
      @include setHL($px-big);
    }
    &.focused .action {
      top: calc(#{$px-big} + 3px);
    }
    .hover-bg i {
      width: $px-big;
    }
    .more {
      @include setWH($px-big, $px-big);
    }
    input {
      width: calc(100% - #{$px-big} - 4px);
      font-size: 14px;
      padding: 3px 12px;
    }
  }
  &-size-medium {
    input,
    .hover-bg i {
      @include setHL($px-medium);
    }
    &.focused .action {
      top: calc(#{$px-medium} + 3px);
    }
    .hover-bg i {
      width: $px-medium;
    }
    .more {
      @include setWH($px-medium, $px-medium);
    }
    input {
      width: calc(100% - #{$px-medium} - 4px);
    }
  }
  &-size-small {
    input,
    .hover-bg i {
      @include setHL($px-small);
    }
    &.focused .action {
      top: calc(#{$px-small} + 3px);
    }
    .hover-bg i {
      width: $px-small;
    }
    .more {
      @include setWH($px-small, $px-small);
    }
    input {
      width: calc(100% - #{$px-small} - 4px);
      font-size: 10px;
      padding: 2px 5px;
      font-weight: normal;
    }
  }
  &-size-mini {
    input,
    .hover-bg i {
      @include setHL($px-mini);
    }
    &.focused .action {
      top: calc(#{$px-mini} + 3px);
    }
    .hover-bg i {
      width: $px-mini;
    }
    .more {
      @include setWH($px-mini, $px-mini);
    }
    input {
      width: calc(100% - #{$px-mini} - 4px);
      font-size: 8px;
      padding: 2px 3px;
      font-weight: lighter;
    }
  }
  // 悬浮/选中
  &:hover,
  &.focused {
    z-index: 4;
    input {
      border-color: #e3e3e3;
    }
  }
  // 悬浮
  &:hover:not(.focused) {
    .hover-bg {
      opacity: 1;
    }
  }
  &.has-hover-bg:hover:not(.focused) {
    input {
      border-color: transparent;
    }
  }
  // 选中
  &.focused {
    input {
      width: 100%;
    }
    .action {
      transition: 0.5s all;
      opacity: 1;
    }
  }
  // 不同样式
  &.is-dark {
    .hover-bg {
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    }
    .action {
      background-color: #434d6a;
      border: 1px solid #434d6a;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      i {
        background: $deep-button-bg;
        color: white;
      }
    }
    input {
      border: 1px solid #656566;
      color: white;
    }
    &.has-text-bg {
      input {
        background-color: #5b5e77;
      }
    }
  }
}
</style>
