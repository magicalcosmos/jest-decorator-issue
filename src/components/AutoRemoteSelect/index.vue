<template>
  <div class='auto-remote-select position-relative'>
    <r-select
      v-if='showSelect'
      v-model="currentValue"
      :ref="selectRef"
      :loading='loading'
      :popperClass="`${popperClass}`"
      height="22"
      filterable
      remote
      reserve-keyword
      @focus='selectFocusCallback()'
      @blur='selectBlurCallback()'
      @visible-change="setOptionVisible($event)"
      :remote-method="handleRemoteMethod()"
      @change="handleSelectChange()">
      <r-option v-for="item in options" :key="item[keyName]" :label="item[labelName]" :value="item[valueName]"></r-option>
    </r-select>
    <div
      class='before-async position-absolute d-flex justify-content-between'
      :class="{'current-focus': showSelect, 'pointer': !readonly}"
      :title='defaultLabel'
      @click='handleSelectFocus()'>
      <div class='text-truncate'>{{defaultLabel}}</div>
      <span class='iconfont' :class="loading ? 'icon-loading' : icon" v-if='showIcon'></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import common from '../../utils/common';
@Component
class AutoRemoteSelect extends Vue {
  @Prop({ default: 'fileSelect' }) selectRef!: string;
  @Prop({ default: '' }) popperClass!: string;
  @Prop({ default: true }) showIcon!: boolean;
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ default: 'icon-triangle-down' }) icon!: string;
  @Prop({ default: () => {
    return [];
  } }) options!: Array<any>;
  @Prop({ default: 'id' }) keyName!: string;
  @Prop({ default: 'label' }) labelName!: string;
  @Prop({ default: 'value' }) valueName!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) defaultLabel!: string;

  private showSelect: boolean = false; // 显示下拉框
  private loading: boolean = false; // 下拉框loading
  private currentValue: string = this.value;

  @Watch('value')
  getValue(value) {
    this.currentValue = value;
  }

  handleSelectChange() {
    this.$emit('handleSelectChange', this.currentValue);
  }
  selectBlurCallback() {
    this.$emit('selectBlurCallback');
  }
  selectFocusCallback() {
    this.$emit('selectFocusCallback');
  }
  handleRemoteMethod() {
    this.$emit('handleRemoteMethod', () => {
      this.loading = false;
    });
  }
  setOptionVisible(show) {
    this.showSelect = show;
  }
  /**
  * 点击label显示下拉框
  */
  handleSelectFocus() {
    if (this.readonly) return;
    this.$emit('handleToFocus');
    if (this.showSelect) {
      this.showSelect = false;
    } else {
      this.loading = true;
      this.showSelect = true;
      this.$nextTick(() => {
        this.$refs[this.selectRef].focus();
      });
    }
  }
}
export default AutoRemoteSelect;
</script>
