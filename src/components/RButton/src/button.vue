<template>
  <button
    class="r-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type && !buttonDisabled ? 'r-button--' + type : '',
      buttonDisabled ? 'is-disabled' : '',
      loading ? 'is-loading' : '',
      plain ? 'is-plain' : '',
      round ? 'is-round' : '',
      circle ? 'is-circle' : ''
    ]"
    :style="{
      height: getWidthOrHeight(height),
      'line-height': getWidthOrHeight(height),
      width: getWidthOrHeight(width)
    }"
  >
    <i class="r-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
@Component({
  inject: {
    rForm: {
      default: ''
    },
    rFormItem: {
      default: ''
    }
  }
})
class RButton extends Vue {
  @Prop({ default: 'standard' })
  private type: string;

  @Prop({ default: '' })
  private icon: string;

  @Prop({ default: 'button' })
  private nativeType: string;

  @Prop({ default: false })
  private loading: boolean;

  @Prop({ default: false })
  private disabled: boolean;

  @Prop({ default: false })
  private plain: boolean;

  @Prop({ default: false })
  private autofocus: boolean;

  @Prop({ default: false })
  private round: boolean;

  @Prop({ default: false })
  private circle: boolean;

  @Prop({ default: '80' })
  private width: string;

  @Prop({ default: '30' })
  private height: string;

  @Watch('disabled')
  getDisabled(disabled: boolean) {
    this.buttonDisabled = disabled;
  }

  private buttonDisabled: boolean = this.disabled;

  getWidthOrHeight(width: string | number) {
    return width.toString().indexOf('%') !== -1 || width.toString().indexOf('auto') !== -1 ? width : `${width}px`;
  }
  handleClick(evt: any) {
    this.$emit('click', evt);
  }
}
export default RButton;
</script>
