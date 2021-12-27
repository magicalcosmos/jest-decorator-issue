<!--
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-10-15 11:24:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/REdit/REditInput.vue
-->
<template>
  <section class="r-edit">
      <div v-if="!isShowEdit">
        <input v-if="type === 'input'" :value="value" class="no-border" readonly/>
        <textarea v-if="type === 'textarea'" :value="value" class="no-border" readonly></textarea>
        <r-tooltip class="item" effect="dark" :content="content" placement="right" v-if="dataName === 'headers' || dataName === 'languages1' || dataName === 'cAddlanguages'">
          <i class="iconfont icon-edit ml10 pointer" @click="isShowEdits"></i>
        </r-tooltip>
        <i class="iconfont icon-edit ml10 pointer" @click="isShowEdit = true" v-else></i>

        <span v-if="currentPopup" class="more ml5 pointer" @click="handleMore">...</span>
      </div>
      <div v-else>
        <input   v-if="type === 'input'" v-model="currentValue" />
        <textarea v-if="type === 'textarea'" v-model="currentValue" class="textarea-input"></textarea>
        <i class="r-icon-check pointer" @click="handleSave"></i>
        <i class="r-icon-close pointer" @click="isShowEdit = false"></i>
      </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import common from '@/utils/common';
@Component
class REditInput extends Vue {
  @Prop({ default: false }) popup!: boolean;
  @Prop({ default: '' }) dataName!: string;
  @Prop({ default: '' }) value!: string;
  @Prop({ default: 'input' }) type!: string;


  // @Model('change', { type: String }) value!: string;
  private currentValue: string = this.value;
  private isShowEdit: boolean = false;
  private currentPopup: boolean = this.popup;
  private content: string = '';

  @Watch('popup')
  getPopup(val) {
    this.currentPopup = val;
  }
  @Watch('value')
  getValue(val) {
    this.currentValue = val;
  }

  handleSave() {
    this.isShowEdit = false;
    this.$emit('save', {
      dataName: this.dataName,
      value: this.currentValue
    });
  }
  handleMore() {
    this.$emit('handleMore', { value: this.value });
  }
  isShowEdits() {
    this.isShowEdit = true;
    this.currentValue = this.value;
  }
  mounted() {
    if (this.dataName === 'headers' || this.dataName === 'languages1' || this.dataName === 'cAddlanguages') {
      this.content = common.i18n('message.edit_name');
    }
  }
}
export default REditInput;
</script>
<style lang="scss" scope>
  .r-edit {
   .icon-edit, .r-icon-check, .r-icon-close {
     color: $light-grey;
    font-size: 16px;
    vertical-align: top;
   }
   input, textarea {
     color: $light-grey;
     width: 150px;
   }
   input {
    border: 1px solid $borderColor;
    border-radius: 5px;
    padding: 0 5px;
   }
   textarea {
    padding: 0 5px;
    outline: none;
    &.textarea-input {
      border: 1px solid $borderColor;
      border-radius: 5px;
    }
   }
   .more {
    @include setWH(18px, 18px);
    border: 1px solid $light-grey;
    border-radius: 5px;
    color: $light-grey;
    display: inline-block;
    text-align: center;
    line-height: 10px;
    overflow: hidden;
    vertical-align: top;
    position: relative;
    top: 3px
   }
  }
</style>
