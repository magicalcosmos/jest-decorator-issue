<template>
  <section class="sr-input-number">
    <span :class="`input-number${isFocus ? ' focus' : ''}`" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <input ref="refInput" :value="value" type="number" @input="handleInput" @focus="handleFocus" @blur="handleBlur" :min="min" :max="max">
      <span class="up">
        <i class="iconfont icon-triangle-up" @click="handleIncrease"/>
      </span>
      <span class="down">
        <i class="iconfont icon-triangle-down" @click="handleDecrease"/>
      </span>
    </span>
    <span class="reset" v-if="reset">
      <i class="iconfont icon-reset" @click="handleReset" :title="$t('common.set_default')"></i>
    </span>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class SrInputNumber extends Vue {
  @Prop() value!: number;
  @Prop({
    default: 1
  }) min!: number;
  @Prop({
    default: 9999999999
  }) max!: number;
  @Prop({
    default: false
  }) reset!: Boolean;
  private isFocus: Boolean = false;
  handleInput(evt: Event) {
    this.$emit('input', evt.target.value);
  }
  /**
   * mouse enter
   * @param evt event of mouse
   */
  handleMouseEnter(evt: Event) {
  }
  /**
   * mouse leave
   * @param evt event of mouse
   */
  handleMouseLeave(evt: Event) {
    !this.isFocus && this.$emit('change', this.value);
  }
  /**
   * mouse focus
   */
  handleFocus() {
    this.isFocus = true; 
  }
  /**
   * mouse blur
   */
  handleBlur(evt: Event) {
    this.isFocus = false;
    let value = evt.target.value;
    if (value !== '') {
      if (value < this.min) {
        value = this.min;
      }
      if (value > this.max) {
        value = this.max;
      }
      value = Math.ceil(parseFloat(value));
    }
    this.$emit('input', value);
    this.$emit('blur', value);
  }

  /**
   * increase
   */
  handleIncrease() {
    const val = this.$refs.refInput.value;
    let covertedValue = parseFloat(val);
    if (covertedValue.toString === NaN.toString()) {
      covertedValue = 1;
    }
    const latestVal = covertedValue + 1;
    this.$emit('input', latestVal);
  }
  /**
   * decrease
   */
  handleDecrease() {
    const val = this.$refs.refInput.value;
    let covertedValue = parseFloat(val);
    if (covertedValue.toString() === NaN.toString()) {
      covertedValue = 1;
    }
    let latestVal = covertedValue - 1;
    if (latestVal < this.min) {
      latestVal = this.min;
    }
    this.$emit('input', latestVal);
  }
  /**
   * reset
   */
  handleReset() {
    this.$emit('reset');
  }
}
export default SrInputNumber;
</script>


