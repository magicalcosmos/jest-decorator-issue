import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CascaderOptions from './CascaderOptions.vue';
import common from '@/utils/common';
import Popper from '@/utils/popper';
@Component({
  components: {
    CascaderOptions
  }
})
class Cascader extends Vue {
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) displayValue!: string;
  @Prop({ default: '' }) path!: string; // If there is compared sign
  @Prop({ default: '["-"]' }) except!: string; // If there is compared sign
  @Prop({ default: '200px' }) width!: string; // If there is compared sign
  @Prop({ default: '-' }) defaultValue!: string; // If there is compared sign
  @Prop() selector!: Element; // If there is compared sign

  private isClose: boolean = true;
  private currentValue: string = this.value;
  private currentDisplayValue: string = this.displayValue;
  private isShowEdit: boolean = false;
  private currentExcept: string = this.except;
  // 是显示级联选择
  private isShowOptons: boolean = false;
  // 级联样式
  private cascaderStyle: any = {};
  // 级联打开时的数据状态
  private selectedData: any;
  // 级联默认值
  private cascaderValue: string = '';
  // 用于标记
  private tagClass: string = 'cascader-20201028001';
  private isEditing: boolean = false;
  private originValue: string = this.value;
  // this for scroll event
  private currentNode: any;
  private timeout: number = 0;
  private popper: any;
  @Watch('value')
  getValue(value: string) {
    this.currentValue = value;
  }
  @Watch('displayValue')
  getDisplayValue(displayValue: string) {
    this.currentDisplayValue = displayValue;
  }
  @Watch('except')
  getExcept(except: string) {
    this.currentExcept = except;
  }
  bindEnterKey(e: any) {
    if (e.keyCode === 13) {
      (this.$refs.refInput as any).blur(() => {
        if (!this.isClose) {
          this.handleClose();
        }
      });
    }
  }
  handleBlur() {
    this.isEditing = false;
    this.currentValue !== this.originValue && this.$emit('blur', this.currentValue);
    common.bindGlobalEvents('keypress', this.bindEnterKey, true);
  }
  handleClick(evt: any) {
    if (this.isClose) {
      const cascaderId = document.getElementById('cascaderId20201028001');
      if (!this.popper) {
        this.popper = new Popper(this.selector ? this.selector : this.$el, this.calOptionsPos);
        this.popper.addScrollEvent();
      }
      this.isEditing = true;
      this.currentNode = evt.currentTarget.parentNode;
      this.calOptionsPos();
      this.isClose = false;
      (this.$refs.refCascaderOptions as any).show();
      this.$emit('click', { thisObject: this });
    } else {
      this.handleClose();
    }
  }
  // calculated options postion
  calOptionsPos() {
    if (!this.currentNode) {
      return;
    }
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const clientRect = this.currentNode.getBoundingClientRect();
    const clientHeight = clientRect.height;
    const right = window.innerWidth - clientRect.right;
    const top = clientRect.top + clientRect.height;
    let topHeight = 204;
    try {
      const options = this.$store.state.cascader.optionsMap[this.path] || [];
      if (options.length < 6) {
        topHeight = 34 * options.length;
      }
    } catch (e) {
      this.$log.error('Function calOptionsPos occur error: ', e);
    }
    this.cascaderStyle = {
      right: right + 'px',
      top: (top + topHeight > height ? top - topHeight - 4 - clientHeight : top) + 'px'
    };
  }
  handleMouseEnter() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isShowEdit = true;
    }, this['$var'].SCROLLDELAY);
  }
  handleMouseLeave() {
    this.timeout && clearTimeout(this.timeout);
    if (this.isClose) {
      this.isShowEdit = false;
    }
  }
  handleCascaderSelected(data: any) {
    this.handleClose();
    this.$emit('selected', data);
  }
  handleClose() {
    (this.$refs.refCascaderOptions as any).hide();
    this.isClose = true;
    this.isEditing = false;
    this.isShowEdit = false;
    this.popper && this.popper.removeScrollEvent();
    this.popper = null;
  }
  handleFocus() {
    this.handleClose();
    this.isEditing = true;
    common.bindGlobalEvents('keypress', this.bindEnterKey, false);
    this.$emit('focus', this);
  }
  initEvent(evt: any) {
    if (!this.$el.contains(evt.target)) {
      if (this.$refs.refCascaderOptions) {
        (this.$refs.refCascaderOptions as any).reset();
        this.handleClose();
      }
    }
  }
  mounted() {
    document.addEventListener('click', this.initEvent);
  }

  beforeDestroy() {
    const options = document.querySelectorAll('.cascader-options');
    options &&
      options.forEach((item: any) => {
        item.style.display = 'none';
      });
  }
}
export default Cascader;
