<template>
  <section
    class="r-edit r-edit-select-obj-new"
    :class="[
      dark ? 'is-dark' : '',
      isShowEdit ? 'focused' : '',
      textBorder ? 'has-text-border' : '',
      textBG ? 'has-text-bg' : '',
      hoverBG ? 'has-hover-bg' : ''
    ]"
  >
    <div class="hover-bg"><i class="iconfont icon-func-description"></i></div>
    <div v-show="!isShowEdit" class="input-box">
      <input :value="currentLabel" class="" readonly />

      <i class="iconfont icon-edit pointer" @click="handleEdit" ></i>
      <span class="input-bg"></span>
    </div>
    <div class="input-box" v-show="isShowEdit">
      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-if="dataName == 'projectType' || dataName == 'environment' || dataName == 'system'"
      >
        <r-option v-for="(item, key) in currentOptions" :key="key" :label="key" :value="key"> </r-option>
      </r-select>

      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-else-if="dataName == 'languages2'"
      >
        <r-option v-for="(item, index) in currentOptions" :key="index" :label="item" :value="item"> </r-option>
      </r-select>

      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-else-if="dataName == 'strictOutputCheck' || dataName == 'caseSensitive' || dataName == 'ignoreAsm'"
      >
        <r-option v-for="item in currentOptions" :key="item.value" :label="item.label" :value="item.value"> </r-option>
      </r-select>

      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-else-if="dataName === 'enums'"
      >
        <r-option v-for="(item, key) in currentOptions" :key="key" :label="item" :value="key"> </r-option>
      </r-select>

      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-else-if="dataName === 'fixedAddress'"
      >
        <r-option v-for="item in currentOptions" :key="item.name" :label="item.name" :value="item.name"> </r-option>
      </r-select>

      <!-- @blur="handleSave" -->
      <r-select
        ref="refSeleced"
        v-model="selectedValue"
        class="select-options"
        placeholder=""
        @change="compileChange"
        v-else
      >
        <r-option v-for="item in currentOptions" :key="item.value" :label="item.label" :value="item.value"> </r-option>
      </r-select>
      <div class="action">
        <i class="r-icon-check pointer" @click="handleSave"></i>
        <i class="r-icon-close pointer" @click="handleCancel"></i>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import common from '@/utils/common';
@Component()
class REditSelectObjNew extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  options!: Array<any>;
  @Prop({ default: true }) textBorder!: boolean;
  @Prop({ default: true }) textBG!: boolean;
  @Prop({ default: true }) hoverBG!: boolean;
  @Prop({ default: false }) dark!: boolean;
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) dataName!: string; // 用于返回区分调用

  private rsDom: any = '';
  private currentLabel: string = '';
  private currentValue: string = '';

  private selectedValue: string = '';
  private selectedLabel: string = '';

  private isShowEdit: boolean = false;
  private currentOptions: Array<any> = this.options;
  private content: string = '';

  @Watch('isShowEdit')
  getIsShowEdit(val) {
    if (val === true) {
      this.$nextTick(() => {
        this.$refs.refSeleced.focus();
      });
    }
  }
  @Watch('options')
  getOptions(val) {
    this.currentOptions = val;
  }
  @Watch('value')
  getValue(value) {
    this.setOptions(value);
  }

  setOptions(value) {
    if (this.dataName === 'languages2') {
      this.options &&
        this.options.forEach(item => {
          if (item === value) {
            this.currentLabel = item;
            this.currentValue = item;
            return;
          }
        });
    } else if (
      (this.dataName === 'strictOutputCheck' || this.dataName === 'caseSensitive' || this.dataName === 'ignoreAsm',
      this.dataName === 'common')
    ) {
      this.options &&
        this.options.forEach(item => {
          if (item.value === value) {
            this.currentLabel = item.label;
            this.currentValue = item.value;
            return;
          }
        });
    } else {
      this.options &&
        Object.keys(this.options).forEach(item => {
          if (item === value) {
            this.currentLabel = item;
            this.currentValue = item;
            return;
          }
        });
    }
  }
  handleSave() {
    if (this.dataName === 'languages2') {
      this.options &&
        this.options.forEach(item => {
          if (item === this.selectedValue) {
            this.selectedLabel = item;
            return;
          }
        });
    } else if (this.dataName === 'strictOutputCheck' || this.dataName === 'caseSensitive' || this.dataName === 'ignoreAsm') {
      this.options &&
        this.options.forEach(item => {
          if (item.value === this.selectedValue) {
            this.currentLabel = item.label;
            this.currentValue = item.value;
            return;
          }
        });
    } else {
      this.options &&
        Object.keys(this.options).forEach(item => {
          if (item === this.selectedValue) {
            this.selectedLabel = item;
            return;
          }
        });
    }

    if (this.currentValue === this.selectedValue) {
      this.isShowEdit = false;
      return false;
    }
    this.$emit(
      'save',
      {
        dataName: this.dataName,
        label: this.selectedLabel,
        value: this.selectedValue,
        defaultValue: this.currentValue
      },
      this
    );
  }
  handleEdit() {
    this.isShowEdit = true;
    this.selectedValue = this.currentValue;
  }
  compileChange(value) {
    //this.handleSave();
    this.$emit('changeSelect', value);
  }
  handleCancel() {
    this.isShowEdit = false;
    if (this.dataName === 'projectType') {
      this.$emit('reset');
    }
  }
  handleClick() {}
  initEvents() {
    const that = this;
    document.addEventListener(
      'click',
      el => {
        const target = el.target;

        if (target.parentNode && target.parentNode.parentNode !== that.$el && target.parentNode.parentNode.parentNode !== that.$el && target.className.indexOf('r-message-box') === -1 &&
          target.className.indexOf('r-button') === -1 && target.parentNode.className.indexOf('r-button') === -1 &&
          that.isShowEdit
        ) {
          that.$el.className = that.$el.className.replace('focused', '');
          that.isShowEdit = false;
          this.handleSave();
        }
      },
      false
    );
  }
  mounted() {
    this.setOptions(this.value);
    if (this.dataName === 'languages2') {
      this.content = common.i18n('message.choose_stand');
    }
    this.initEvents();
  }
}
export default REditSelectObjNew;
</script>
<style lang="scss" scope>
// 背景框颜色
$border-color: #cdcdcd;
.r-edit-select-obj-new {
  position: relative;
  > div {
    position: relative;
  }
  .r-select.select-options {
    width: calc(100% - 4px);
  }
  .icon-edit,
  .r-icon-check,
  .r-icon-close {
    color: #999;
    font-size: 16px;
  }
  .icon-edit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 3;
  }
  input {
    position: relative;
    width: calc(100% - 20px - 4px) !important;
    height: 20px !important;
    line-height: 20px !important;
    border-radius: 2px !important;
    font-size: 12px;
    padding: 2px 10px !important;
    margin: 2px;
    z-index: 2;
  }
  .input-bg {
    background-color: transparent;
    border: 1px solid transparent;
    width: calc(100% - 20px - 4px);
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    font-size: 12px;
    padding: 2px 10px;
    margin: 2px;
    position: absolute;
    top: 0;
    left: 0;
  }
  &.has-text-bg {
    .input-bg {
      background-color: white;
    }
    input {
      color: $font-color-important;
    }
  }
  &.has-text-border {
    .input-bg {
      border-color: #d1d1d1;
    }
  }
  &.is-dark {
    &.has-text-bg {
      .input-bg {
        background-color: #5b5e77;
      }
      input {
        color: white;
      }
    }
    &.has-text-border {
      .input-bg {
        border-color: #656566;
      }
    }
  }
  .r-input .input-bg {
    width: 100%;
  }
  .r-select .r-input .r-input__inner,
  .input-box input {
    position: relative;
    z-index: 3;
    background: transparent;
    border-color: transparent;
    text-align: left;
  }
  .input-box {
    z-index: 2;
    height: 24px;
  }
  .hover-bg {
    cursor: default;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
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
      width: 20px;
      height: 20px;
      line-height: 20px;
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
    z-index: 0;
    background-color: #fff;
    border: 1px solid #dfe1e5;
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
      font-size: 12px;
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
      background-color: #5b5e77;
      color: white;
    }
  }
  // 悬浮/选中
  &:hover,
  &.focused {
    z-index: 4;
    .input-bg {
      border-color: #d1d1d1;
    }
  }

  // 悬浮
  &:hover:not(.focused) {
    .hover-bg {
      opacity: 1;
    }
    input {
      border-color: transparent;
    }
  }
  // 选中
  &.focused {
    .action {
      top: 23px;
    }
    .r-input input {
      width: 100% !important;
      padding-right: 24px !important;
    }
  }
  .more {
    @include setWHC(20px, 20px);
    border: 1px solid $iconColor;
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    .r-icon-more {
      color: $iconColor;
    }
  }
  .select-options {
    .r-input__inner {
      @include setWHL(120px, 30px);
    }
    .r-input__suffix {
      position: absolute;
      top: 0;
      right: 0px;
      color: #c0c4cc;
      z-index: 2;
      //   top: 5px;
    }
    .is-focus {
      .r-input__suffix {
        // top: -5px;
      }
    }
  }
}
.pointer {
  vertical-align: baseline !important;
}
</style>
