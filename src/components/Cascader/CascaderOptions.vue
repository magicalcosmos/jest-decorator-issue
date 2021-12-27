<template>
  <section :class="`${tagClass} cascader cascader-options ${order === 'rightToLeft' ? 'right-to-left' : ''}`" v-show="isShow">
    <ul :class="`${tagClass} cascader-list`" ref="firstScrollId">
      <li v-for="(data, index) in currentOptions" :class="'cascader-20201028001 cascader-item ' + (data.selected ? 'selected' : '')" :key="index" @click.stop="handleClick(data, 'first')">
          <i v-if="order === 'rightToLeft' && data.children && data.children.length" class="r-icon-arrow-left"></i>
          <i :class="'r-icon-check' + (!secondOptionsLen && data.selected ? '' : ' v-hide')" ></i><span>{{ data.label }}</span>
          <i v-if="order === 'leftToRight' && data.children && data.children.length" class="r-icon-arrow-right"></i>
      </li>
    </ul>
    <ul :class="`${tagClass} cascader-list cascader-lists`" v-if="secondOptionsLen" ref="secondScrollId">
<!--      <li v-for="(data, index) in secondOptions" :class="`${tagClass} cascader-item ${data.selected ? 'selected' : ''}`" :key="index" @click.stop="handleClick(data, 'second')">-->
<!--          <i v-if="order === 'rightToLeft' && data.children && data.children.length" class="r-icon-arrow-left"></i>-->
<!--          <i :class="'r-icon-check' + (!thirdOptions.length && data.selected ? '' : ' v-hide')" ></i><span>{{ data.label }}</span>-->
<!--          <i v-if="order === 'leftToRight' && data.children && data.children.length" class="r-icon-arrow-right"></i>-->
<!--      </li>-->
<!--      <cascader-virtualscroll ref="virtualScroll" :options="thirdOptions" :listData="secondOptions" :order="order" :tagClass="tagClass" @handleListClick="handleClick"></cascader-virtualscroll>-->
      <cascader-virtualscroll ref="virtualScroll" :options="thirdOptions" :order="order" :tagClass="tagClass" @handleListClick="handleClick"></cascader-virtualscroll>
    </ul>
    <ul :class="`${tagClass} cascader-list`" v-if="thirdOptions.length" id="thirdScrollId">
      <li v-for="(data, index) in thirdOptions" :class="`${tagClass} cascader-item ${data.selected ? 'selected' : ''}`" :key="index" @click.stop="handleClick(data, 'third')">
          <i v-show="data.selected " class="r-icon-check" ></i><span>{{ data.label }}</span>
      </li>
    </ul>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class CascaderOptions extends Vue {
  @Prop({ default: 'leftToRight' }) order!: string;
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) path!: string;
  @Prop({ default: false }) visible!: boolean;
  @Prop({ default: '[]' }) operator!: string;
  @Prop() tagClass!: string;

  private currentOptions: Array<any> = [];
  private isShow: boolean = this.visible;
  private thirdOptions: Array<any> = [];
  private currentPath: string = this.path;
  @Watch('value')
  getValue(value: any) {
    this.filterValue(value);
  }

  @Watch('visible')
  getVisible(visible: any) {
    this.isShow = visible;
    this.filterValue(this.value);
  }
  get secondOptionsLen() {
    return this.$store.state.cascader.secondOptionsMap && this.$store.state.cascader.secondOptionsMap.length > 0;
  }
  /**
    * add parent for options
    * @param data
    * @param parent
    */
  handleOptions(data: any, parent?: any) {
    data && data.forEach((element: any) => {
      if (parent) {
        element.parent = parent;
      }
      if (element.children && element.children.length) {
        this.handleOptions(element.children, element);
      }

    });
  }
  /**
    * filter special character
    * @param value
    */
  filterValue(value: any) {
    this.reset();// 重置选中
    if (this.operator === '[]') { // 是否是数组
      if (value.contains('[')) {
        let name = '';
        let index: any;
        // 匹配文指针目标中的数组 如 &sum[0]
        const arrMatch = value.match(/\[(\d*)\]/);
        if (arrMatch) {
          index = arrMatch[1];
        }
        if (value.contains('&')) {
          name = value.match(/\&(\S*)\[/)[1];
        } else if (value.contains('@')) {
          name = value.match(/\@(\S*)\[/)[1];
        } else {
          name = value.split('[')[0];
        }
        this.setSelectedValue(name, index);
      } else {
        this.setSelectedValue(value.replace('&', '').replace('@', ''), '');
      }
    }
  }
  /**
    *set selected value, highlight
    * @param name
    * @param index
    */
  setSelectedValue(name: string, index: string) {
    for (let i = 0; this.currentOptions && i < this.currentOptions.length; ++i) {
      this.deselectAll();
      if (this.currentOptions[i].value === name) { // eslint-disable-line
        const children = this.currentOptions[i].children;
        if (children && children.length) {
          this.$set(this.currentOptions[i], 'selected', !!index);
          for (let j = 0; j < children.length; ++j) {
            if (children[j].value == index) { // eslint-disable-line
              this.$set(children[j], 'selected', true);
              this.$set(children[j], 'isSelected', true);
              this.handleScroll('secondScrollId', j);
            }
          }
          this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(children));
          this.$nextTick(() => {
            this.handleScroll('firstScrollId', i);
            this.$nextTick(() => {
              this.$refs.virtualScroll.scrollView(parseInt(index));
            });
          });
        } else {
          this.$set(this.currentOptions[i], 'selected', true);
        }
      }
    }
    this.$forceUpdate();
  }
  /**
    * deselect all
    * @date 2021-10-26
    * @return {any}
    */
  deselectAll() {
    for (let i = 0; this.currentOptions && i < this.currentOptions.length; ++i) {
      const children = this.currentOptions[i].children;
      if (children && children.length) {
        for (let j = 0; j < children.length; ++j) {
          this.$set(children[j], 'isSelected', false);
          this.$set(children[j], 'selected', false);
        }
      }
    }
  }
  /**
    * scroll events
    * @param id
    * @param index
    */
  handleScroll(id: string, index: number) {
    const scrollIndex = index - 5;
    const el: any = this.$refs[id];
    if (el && scrollIndex > 0) {
      el.scrollTop = scrollIndex * 34;
    }
  }
  /**
    * select option
    * @param data
    * @param layer
    */
  handleClick(data: any, layer: string) {
    let secondOptions = this.$store.state.cascader.secondOptionsMap;
    if (layer === 'first') {
      this.clearSelected(this.currentOptions);
      if (!data.children || (data.children && data.children.length < 1)) {
        this.$set(this, 'thirdOptions', []);
        secondOptions = [];
        this.$store.dispatch('SET_SECOND_OPTIONS_MAP', []);
      }
      secondOptions.length ? this.$refs.virtualScroll.scrollToTop() : '';
    } else if (layer === 'second') {
      this.clearSelected(secondOptions);
      this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(secondOptions));
      this.$set(this, 'thirdOptions', []);
    } else {
      this.clearSelected(this.thirdOptions);
    }

    this.$set(data, 'selected', true);
    if (data.children && data.children.length) {
      if (layer === 'first') {
        this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(data.children));
      } else {
        this.$set(this, 'thirdOptions', data.children);
      }
    } else {
      this.$emit('update:visible', false);
      const selectedData = [data];
      while (data.parent) {
        selectedData.unshift(data.parent);
        data = data.parent;
      }
      this.$emit('selected', selectedData);
    }
  }
  /**
    * clear selected option
    * @param data
    */
  clearSelected(data: Array<any>) {
    for (let i = 0; data && i < data.length; ++i) {
      if (data[i].selected) {
        delete data[i].selected;
      }
      this.clearSelected(data[i].children);
    }
  }
  reset() {
    if (document.getElementById('firstScrollId')) {
      document.getElementById('firstScrollId').scrollTop = 0;
    }
    if (document.getElementById('secondScrollId')) {
      document.getElementById('secondScrollId').scrollTop = 0;
    }
    if (document.getElementById('thirdScrollId')) {
      document.getElementById('thirdScrollId').scrollTop = 0;
    }
    this.clearSelected(this.currentOptions);
    this.$store.dispatch('SET_SECOND_OPTIONS_MAP', []);
    this.thirdOptions = [];
  }
  hide() {
    this.isShow = false;
  }
  show() {
    this.filterValue(this.value);
    if (this.$el.parentNode !== document.body) {
      document.body.append(this.$el);
    }
    this.isShow = true;
  }
  mounted() {
    try {
      const options = this.$store.state.cascader.optionsMap[this.currentPath];
      this.handleOptions(options);
      this.currentOptions = Object.freeze(options) || [];
    } catch (e) {
      this.$log.error('Cascader options get data from stroe occur error: ', e);
    }
  }
}
export default CascaderOptions;
</script>

