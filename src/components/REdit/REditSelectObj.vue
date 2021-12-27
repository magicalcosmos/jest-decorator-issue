<template>
  <section class="r-edit r-edit-selects">
      <div>
        <r-select ref="refSeleced" v-model="selectedValue" class="select-options" :placeholder="placeholder" @change="compileChange" v-if="dataName == 'projectType'">
          <r-option
            v-for="(item, key) in currentOptions"
            :key="key"
            :label="key"
            :value="key">
          </r-option>
        </r-select>

        <r-select @change="handleSave" ref="refSeleced" v-model="selectedValue" class="select-options" :placeholder="placeholder" v-else-if="dataName == 'languages2' || dataName == 'cAddlanguages2'">
          <r-option
            v-for="(item, index) in currentOptions"
            :key="index"
            :label="item"
            :value="item">
          </r-option>
        </r-select>


        <r-select @change="handleSave" ref="refSeleced" v-model="selectedValue" class="select-options" :placeholder="placeholder" v-else-if="dataName == 'environmentId' || dataName.indexOf('analyzeTemplate') !== -1">
          <r-option
            v-for="(item, index) in currentOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </r-option>
        </r-select>

        <r-select @change="handleSave" ref="refSeleced" v-model="selectedValue" class="select-options" :placeholder="placeholder" v-else>
          <r-option
            v-for="(item, key) in currentOptions"
            :key="key"
            :label="key"
            :value="key">
          </r-option>
        </r-select>
      </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import common from '@/utils/common';
@Component
class REditSelect extends Vue {
  @Prop({ default: () => {
    return [];
  } }) options!: Array<any>;
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) dataName!: string; // 用于返回区分调用
  @Prop({ default: common.i18n('select.select_please') }) placeholder!: string;

  private currentLabel: string = '';
  private currentValue: string = '';

  private selectedValue: string = '';
  private selectedLabel: string = '';

  private isShowEdit: boolean = false;
  private currentOptions: Array<any> = this.options;
  private content: string = '';

  @Watch('options')
  getOptions(val) {
    this.currentOptions = val;
  }
  @Watch('value')
  getValue(value) {
    this.setOptions(value);
  }

  setOptions(value) {
    if (this.dataName === 'environmentId' || this.dataName.indexOf('analyzeTemplate') !== -1) {
      this.selectedValue = value;
    } else if (this.dataName === 'languages2') {
      this.options && this.options.forEach((item) => {
        if (item === value) {
          this.currentLabel = item;
          this.currentValue = item;
          this.selectedValue = this.currentValue;
          return;
        }
      });
    } else if (this.dataName === 'cAddlanguages2') {
      this.options && this.options.forEach((item) => {
        if (item === value) {
          this.currentLabel = item;
          this.currentValue = item;
          this.selectedValue = value;
          return;
        }
      });
    } else {
      this.options && Object.keys(this.options).forEach((item) => {
        if (item === value) {
          this.currentLabel = item;
          this.currentValue = item;
          this.selectedValue = this.currentValue;
          return;
        }
      });
    }
  }
  handleSave() {
    if (this.dataName === 'languages2') {
      this.options && this.options.forEach((item) => {
        if (item === this.selectedValue) {
          this.selectedLabel = item;
          return;
        }
      });
    } else {
      this.options && Object.keys(this.options).forEach((item) => {
        if (item === this.selectedValue) {
          this.selectedLabel = item;
          return;
        }
      });
    }

    this.isShowEdit = false;
    this.$emit('save', {
      dataName: this.dataName,
      label: this.selectedLabel,
      value: this.selectedValue,
      defaultValue: this.value
    },
    this);
  }
  handleEdit() {
    this.isShowEdit = true;
    this.selectedValue = this.currentValue;
  }
  compileChange(value) {
    this.$emit('changeSelect', value);
    this.handleSave();
  }
  handleCancel() {
    this.isShowEdit = false;
    if (this.dataName === 'projectType') {
      this.$emit('reset');
    }
  }
  mounted() {
    this.setOptions(this.value);
    if (this.dataName === 'languages2' || this.dataName === 'cAddlanguages2') {
      this.content = common.i18n('message.choose_stand');
    }
  }
}
export default REditSelect;
</script>
<style lang="scss" scope>
  .r-edit-selects {
   .icon-edit, .r-icon-check, .r-icon-close {
    color: #999;
    font-size: 16px;
   }
   .no-border {
     width: 106px !important;
     padding-left: 10px;
   }
   input {
    border: 1px solid $borderColor;
    border-radius: 2px;
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
     width: 100%;
     .r-input__inner {
       @include setWHL(120px, 30px);
     }
     .r-input__suffix {
      position: absolute;
      top: 0 !important;
      right: 0;
      color: #c0c4cc;
      z-index: 2;
      background-color: transparent !important;
     }
     .is-focus {
       .r-input__suffix {
         top: -5px;
       }
     }
     input {
      position: relative;
      height: 20px !important;
      line-height: 20px !important;
      border-radius: 2px !important;
      font-size: 12px;
      padding: 0 5px !important;
      margin: 2px;
      z-index: 2;
      border: none;
      background-color: #5b5e77 !important;
      color: #fff !important;
      width: 100%;
     }
   }
  }
  .pointers {
    vertical-align: baseline !important;
    position: relative;
    top: 2px;
  }
</style>
