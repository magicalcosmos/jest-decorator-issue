<template>
  <section class="r-edit r-edit-select">
      <div v-if="!isShowEdit">
        <input :value="currentLabel" class="project-name no-border" readonly/>
        <i class="iconfont icon-edit ml10 pointer" @click="handleEdit"></i>
      </div>
      <div v-else>
        <r-select ref="refSeleced" v-model="selectedValue" class="select-options" placeholder="">
          <r-option
            v-for="item in currentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </r-option>
        </r-select>
        <i class="r-icon-check pointer" @click="handleSave"></i>
        <i class="r-icon-close pointer" @click="isShowEdit = false"></i>
      </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
@Component
class REditSelect extends Vue {
  @Prop({ default: () => {
    return [];
  } }) options!: Array<any>;
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) dataName!: string; // 用于返回区分调用

  private currentLabel: string = '';
  private currentValue: string = '';

  private selectedValue: string = '';
  private selectedLabel: string = '';

  private isShowEdit: boolean = false;
  private currentOptions: Array<any> = this.options;

  @Watch('options')
  getOptions(val) {
    this.currentOptions = val;
  }
  @Watch('value')
  getValue(value) {
    this.setOptions(value);
  }
  setOptions(value) {
    this.options && this.options.forEach((item) => {
      if (item.value === value) {
        this.currentLabel = item.label;
        this.currentValue = item.value;
        return;
      }
    });
  }
  handleSave() {
    this.options && this.options.forEach((item) => {
      if (item.value === this.selectedValue) {
        this.selectedLabel = item.label;
        return;
      }
    });
    this.isShowEdit = false;
    this.$emit('save', {
      dataName: this.dataName,
      label: this.selectedLabel,
      value: this.selectedValue
    });
  }
  handleEdit() {
    this.isShowEdit = true;
    this.selectedValue = this.currentValue;
  }
  mounted() {
    this.setOptions(this.value);
  }
}
export default REditSelect;
</script>
<style lang="scss" scope>
  .r-edit-select {
   .icon-edit, .r-icon-check, .r-icon-close {
    color: #999;
    font-size: 16px;
   }
   input {
    border: 1px solid $borderColor;
    border-radius: 5px;
    padding: 0 5px;
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
       background: #FAFBFC !important;
       color: #C0C4CC;
       top: 5px;
     }
     .is-focus {
       .r-input__suffix {
         top: -5px;
       }
     }
   }
  }
  .pointer {
    vertical-align: baseline !important;
  }
</style>
