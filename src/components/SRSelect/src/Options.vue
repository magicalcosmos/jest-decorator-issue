<template>
  <section :class="`${tagClass} sr-options`" v-show="isShow" :style="width ? `width:${width};` : ''">
    <ul :class="`${tagClass} sr-options-list`" id="firstScrollId">
      <li v-for="(data, index) in currentOptions" :class="'sr-options-20201028001 sr-options-item ' + (currentValue === data.value ? 'selected' : '')" :key="data + index" @click.stop="handleClick(data)">
        <span class="option-label" :title="data['label']">
          {{data['label']}}
        </span>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class Options extends Vue {
    @Prop({ default: '' }) value!: any;
    @Prop({ default: () => {
      return [];
    } }) options!: Array<any>
    @Prop({ default: false }) visible!: boolean;
    @Prop() tagClass!: string;
    @Prop() width!: string;
    @Prop() diffValue!: string;

    private currentOptions: Array<any> = this.options;
    private isShow: boolean = this.visible;
    private currentValue: string = this.diffValue || this.value;

    @Watch('value')
    getValue(value: string) {
      this.currentValue = this.diffValue || value;
    }

    @Watch('diffValue')
    getDiffValue(diffValue: string) {
      this.currentValue = diffValue;
    }


    @Watch('options')
    getOptions(options: any) {
      this.currentOptions = options;
    }

    @Watch('visible')
    getVisible(visible: any) {
      this.isShow = visible;
    }
    /**
     * 动态滚动显示到选中值
     * @param { id }
     * @param { index }
     */
    handleScroll(id: string, index: number) {
      const scrollIndex = index - 5;
      if (scrollIndex > 0) {
        document.getElementById(id).scrollTop = scrollIndex * 34;
      }
    }
    /**
     * click event
     * @param { data }
     */
    handleClick(data: any) {
      this.$set(data, 'selected', true);
      this.$emit('selected', data, this.currentOptions);
    }
    reset() {
      if (document.getElementById('firstScrollId')) {
        document.getElementById('firstScrollId').scrollTop = 0;
      }
    }
    hide() {
      this.isShow = false;
    }
    show() {
      this.isShow = true;
      if (this.$el.parentNode !== document.body) {
        document.body.append(this.$el);
      }
    }
    mounted() {
    }
}
export default Options;
</script>

