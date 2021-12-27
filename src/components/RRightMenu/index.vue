<template>
  <ul class="r-right-menu" :style="`left:${currentLeft}px;top:${currentTop}px`" @mouseleave="handleMouseLeave">
    <header class="r-right-menu-title">{{ currentTitle }}</header>
    <li class="r-right-menu-item" v-for="(item, index) in data" :key="index" @click="item.callback">
      <span class="cycle"></span>{{item.label}}
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
@Component
class RRightMenu extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: () => { return {}; } }) data!: Array<any>;
  @Prop({ default: 0 }) left!: number;
  @Prop({ default: 0 }) top!: number;
  private currentTitle: string = this.title;
  private currentData: Array<any> = this.data;
  private currentLeft: number = this.left;
  private currentTop: number = this.top
  @Watch('data')
  getData(data) {
    this.currentData = data;
  }
  @Watch('left')
  getLeft(left) {
    this.currentLeft = left;
  }
  @Watch('top')
  getTop(top) {
    this.currentTop = top;
  }
  @Watch('title')
  getTitle(title) {
    this.currentTitle = title;
  }
  handleMouseLeave() {
    this.$emit('handleMouseLeave');
  }
}
export default RRightMenu;
</script>

<style lang="scss">
  .r-right-menu {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 6px rgba(60, 64, 67, 0.3);
    padding: 10px;
    position: fixed;
    z-index: 999;
    .r-right-menu-title {
      color: #979797;
    }
    .r-right-menu-item {
      @include setWHL(100px, 30px);
      cursor: pointer;
      padding-left: 10px;
      &:hover {
        font-weight: bold;
      }
    .cycle {
      @include setWH(5px, 5px);
      border: 1px solid #999;
      border-radius: 50%;
      display: inline-block;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
    }
  }
</style>
