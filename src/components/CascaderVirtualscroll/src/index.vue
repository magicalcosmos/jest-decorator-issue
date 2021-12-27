<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <ul>
        <li
          ref="items"
          :class="`${tagClass} cascader-item infinite-list-item ${data.isSelected ? 'selected' : ''}`"
          v-for="(data,index) in visibleData"
          :data='data.isSelected'
          :key="index"
          :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
          @click.stop="handleClick(data, 'second')">
              <i v-if="order === 'rightToLeft' && data.children && data.children.length" class="r-icon-arrow-left"></i>
              <i :class="'r-icon-check' + (!thirdOptions.length && data.isSelected ? '' : ' v-hide')" ></i><span>{{ data.label }}</span>
              <i v-if="order === 'leftToRight' && data.children && data.children.length" class="r-icon-arrow-right"></i>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CascaderVirtualscroll',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    tagClass: {
      type: String
    },
    order: {
      type: String
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 34
    }
  },
  computed: {
    //所有列表数据
    listData() {
      return this.$store.state.cascader.secondOptionsMap;
    },
    //列表总高度
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    //可显示的列表项数
    visibleCount() {
      return this.listData.length > 20 ? 15 : Math.ceil((this.screenHeight / this.itemSize) + 2);
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
    }
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
      thirdOptions: this.options,
      timer: null
    };
  },
  methods: {
    debounce() {
    // 维护一个 timer
      return () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.scrollEvents();
        }, 100); // 简化写法
      };
    },
    scrollEvent() {
      if (this.listData.length > 100000) {
        this.debounce()();
      } else {
        this.scrollEvents();
      }
    },
    scrollEvents() {
      //当前滚动位置
      const scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = Math.ceil(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    },
    scrollView(index) {
      const parentHeight = this.$parent.$el.clientHeight; // 除掉边框的高度
      const offsetHeight = (index + 1) * this.itemSize;
      const scrollY = offsetHeight > parentHeight ? (offsetHeight - parentHeight) : 0;
      //此时的开始索引
      this.start = offsetHeight > parentHeight ? index : 0;
      //此时的结束索引
      this.end = this.start + this.visibleCount;

      this.$refs.list.scrollTop = scrollY;
    },
    scrollToTop() {
      this.$refs.list.scrollTop = 0;
    },
    handleClick(data, type) {
      this.$emit('handleListClick', data, type);
    }
  }
};
</script>
