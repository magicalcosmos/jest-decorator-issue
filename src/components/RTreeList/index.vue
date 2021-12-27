<template>
  <ul class="r-tree-list">
    <li 
    class="r-tree-item" 
    v-for="(item, index) in currentData" 
    :key="index">
      <div class='bg mb5'>
        <slot :data="item"></slot>
      </div>
      <r-tree-list v-if="item.childNodes && item.childNodes.length" :data="item.childNodes">
        <slot :data="item"></slot>
      </r-tree-list>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
@Component
class RTreeList extends Vue {
  @Prop({ default: () => { return []; } }) data!: Array<any>;
  private currentData: Array<any> = this.data;
  @Watch('data')
  getData(data: Array<any>) {
    this.currentData = data;
  }
}
export default RTreeList;
</script>
<style lang="scss">
 .r-tree-list {
   .r-tree-item {
     .bg {
      background: $testCaseFileItem;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 2px 0 1px 0;
     }
   }
 }
</style>
