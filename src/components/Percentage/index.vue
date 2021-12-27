<template>
  <span class="percentage">
    <span class="minus" @click="handleAction('in')">
      <svg class="iconfont">
        <use xlink:href="#icon-minus1"></use>
      </svg>
    </span>
    <span class="rate">{{currentPercent}}</span>
    <span class="plus" @click="handleAction('out')">
      <svg class="iconfont">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </span>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class Percentage extends Vue {
  @Prop() percent!: string;
  @Prop({
    default: 0.1
  }) rate!: string;

  private currentPercent: string = this.percent;

  private rangePercent = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

  @Watch('percent')
  getPercent(percent: string) {
    this.currentPercent = percent;
  }
  handleAction(action: string) {
    const index = this.rangePercent.indexOf(parseInt(this.currentPercent));

    if (action === 'in') {
      if (index > 0) {
        this.currentPercent = this.rangePercent[index - 1] + '%';
      } else if (parseInt(this.currentPercent) === this.rangePercent[index]) {
        return;
      }
    } else {
      if (index < this.rangePercent.length - 1) {
        this.currentPercent = this.rangePercent[index + 1] + '%';
      } else if (parseInt(this.currentPercent) === this.rangePercent[index]) {
        return;
      }
    }
    this.$emit('click', { action, percent: this.currentPercent }, this);
  }
}
export default Percentage;
</script>
