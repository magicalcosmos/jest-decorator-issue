<template>
  <ul class="r-tab">
    <li 
    v-for="(value, index) in currentOptions" 
    :class="'r-tab-list pointer ' + (index === currentIndex ? 'selected' : '')" 
    :index="index"
    :key="index" 
    :style="`width:${width};height:${currentHeight}; line-height:${currentHeight}`"
    @click="handleSelected($event, index)">
      <slot :name="`tab${index}`" :value="value"></slot>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
@Component
class RTab extends Vue {
  @Prop({ default: [] }) data!: Array<any>;
  @Prop({ default: 42 }) height!: number;
  @Prop({ default: 0 }) selectedIndex!: number;
  private currentOptions = this.data;
  private currentHeight: string = `${this.height}px`;
  private width: string = (100 / this.data.length) + '%';
  private currentIndex = this.selectedIndex;
  @Watch('data')
  getData(data) {
    this.currentOptions = data;
    this.width = (100 / data.length) + '%';
  }
  @Watch('height')
  getHeight(height) {
    this.currentHeight = height;
  }
  @Watch('selectedIndex')
  getSelectedIndex(selectedIndex) {
    this.currentIndex = selectedIndex;
  }
  
  handleSelected(e, index) {
    if (e.target.className.indexOf('selected') === -1) { 
      this.currentIndex = index;
    }
    this.$emit('click', this.currentIndex);
  }
}
export default RTab;
</script>
