<!--
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-10-30 17:47:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/REdit/REditInput.vue
-->
<template>
  <section :class="'sr-input ' + className">
      <div class="sr-input-item over" v-if="type === 'over'" @mouseenter="handleCellMouseEnter" @mouseleave="handleMenuMouseLeave">
        <span v-if="!isShow && !isEditing" v-html="currentDisplayValue"></span>
        <input ref="refInput" v-model="currentValue" v-if="isShow || isEditing" @focus="handleFocus($event)" @blur.prevent="handleBlur()"/>
      </div>
      <div class="sr-input-item" v-else>
        <input ref="refInput" v-model="currentValue" @focus="handleFocus($event)" @blur.prevent="handleBlur()" />
      </div>
      <slot></slot>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import common from '@/utils/common';
@Component
class SrInput extends Vue {
  @Prop({ default: false }) popup!: boolean;
  @Prop({ default: false }) isCancel!: boolean;
  @Prop({ default: false }) dark!: boolean;
  @Prop({ default: '' }) dataName!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '-' }) defaultValue!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) className!: string;
  @Prop({ default: '' }) displayValue!: string;


  // @Model('change', { type: String }) value!: string;
  private currentValue: string = this.value;
  private isShow: boolean = false;
  private currentPopup: boolean = this.popup;
  private currentDisplayValue: string = this.displayValue;
  private content: string = '';
  private originValue: string = this.value; // for compare
  private isEditing: boolean = false;
  private timeout: number = 0;
  @Watch('popup')
  getPopup(val: any) {
    this.currentPopup = val;
  }

  @Watch('value')
  getValue(val: string) {
    this.currentValue = val;
  }

  @Watch('isCancel')
  getIsCancel(isCancel: boolean) {
    if (isCancel) {
      this.currentValue = this.value;
    }
  }

  @Watch('displayValue')
  getDisplayValue(displayValue: string) {
    this.currentDisplayValue = displayValue;
  }

  handleSave() {
    this.isShow = false;
    this.isEditing = false;
    if (this.currentValue !== this.originValue) {
      this.$emit('save', {
        dataName: this.dataName,
        value: this.currentValue
      }, this);
    }
  }

  handleMore() {
    this.$emit('handleMore', { value: this.value });
  }

  isShowEdits() {
    this.$nextTick(() => {
      this.$refs.refInput.focus();
      this.$emit('isEdit', true);
    });
    this.currentValue = this.value;
  }

  bindEnterKey(e: any) {
    if (e.keyCode === 13) {
      this.$refs.refInput.blur();
    }
  }

  handleBlur() {
    this.handleSave();
    this.$emit('isEdit', false);
    common.bindGlobalEvents('keypress', this.bindEnterKey, true); // Remove keypress event
  }
  handleFocus() {
    this.isEditing = true;
    this.originValue = this.currentValue;
    common.bindGlobalEvents('keypress', this.bindEnterKey);
  }
  handleCellMouseEnter() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isShow = true;
    }, this.$var.SCROLLDELAY);
  }
  handleMenuMouseLeave() {
    this.timeout && clearTimeout(this.timeout);
    this.isShow = false;
  }
}
export default SrInput;
</script>
