<template>
  <section
    v-show="isShow"
    id="progress_srt_2020798"
    class="progress_srt_2020798_circle"
    :style="'width:' + width + ';height:' + height"
  >
    <div class="progress_srt_2020798_wave">
      <span
        id="progress_srt_2020798_percent"
        :style="'width:' + width + ';height:' + height + ';line-height:' + height"
      >
        {{ currentPercentage }}
      </span>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Drag from '@/utils/drag';
@Component
class FloatingBall extends Vue {
  @Prop({ default: false }) visible!: boolean
  @Prop({ default: '0%' }) percentage!: string
  @Prop({ default: '50px' }) width!: string
  @Prop({ default: '50px' }) height!: string

  private currentPercentage = this.percentage;
  private styleNode: any = null;
  private isShow: boolean = this.visible;

  @Watch('visible')
  getVisible(visible: boolean) {
    this.isShow = visible;
  }
  @Watch('percentage')
  getPercentage(percentage: string) {
    this.currentPercentage = percentage;
    this.change();
  }

  initStyle() {
    const headArray = document.head.childNodes;
    let node: any;
    headArray.forEach(item => {
      if (item.id === 'dynamicStyle') {
        this.styleNode = node = item;
      }
    });
    if (!node) {
      const dynamicStyle = document.createElement('style');
      dynamicStyle.type = 'text/css';
      dynamicStyle.id = 'dynamicStyle';
      this.styleNode = dynamicStyle;
      document.head.append(dynamicStyle);
    }
  }
  appendToBody() {
    if (!document.getElementById('body>section.progress_srt_2020798_circle')) {
      document.body.append(this.$el);
    }
  }
  change() {
    if (!this.styleNode) {
      this.initStyle();
    }
    if (this.styleNode) {
      this.styleNode.innerHTML = `
        .progress_srt_2020798_wave:after,
        .progress_srt_2020798_wave:before {
          top: ${50 - parseFloat(this.currentPercentage)}% !important;
        }`;
    }
  }
  mounted() {
    this.$nextTick(() => {
      new Drag('#progress_srt_2020798', () => {
        this.$emit('click', this);
      });
    });
    this.change();
  }
}
export default FloatingBall;
</script>
