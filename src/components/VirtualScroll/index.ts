import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { common } from '@/utils';

@Component
class VirtualScroll extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  }) data!: Array<any>; // 数据
  @Prop({
    default: 10
  })
  scrollWidth!: number; // 滚动条宽度
  @Prop({
    default: true
  })
  showScrollbar!: boolean; // 显示滚动条
  @Prop({
    default: 100
  })
  containerHeight!: number;// 容器高度
  @Prop({
    default: 25
  }) size!: number;// 行高
  @Prop({
    default: 'ulClass'
  })
  ulClass!: string;// ul class
  @Prop({
    default: 'liClass'
  })
  liClass!: any;// li class
  @Prop({
    default: false
  })
  isTree!: boolean;// type of tree
  @Prop({
    default: 'icon-triangle-down'
  })
  expandIcon!: string;// expand icon
  @Prop({
    default: 'icon-triangle-fold'
  })
  foldIcon!: string;// fold icon
  @Prop({
    default: 'children'
  })
  childKey!: string;// child key
  @Prop({
    default: 'id'
  })
  dataId!: string;// id key
  @Prop({
    default: false
  })
  besideExpand!: string;// expand event in parent component
  private treeData: Array<any> = [];
  private containSize = 0;
  private startIndex = 0;
  private scrollDirty: boolean = false;
  @Watch('data')
  getData(data) {
    this.treeData = data;
    this.getContainSize();
  }

  get containerStyle() {
    const style = {
      maxHeight: `${this.containerHeight}px`,
      minHeight: `${this.size}px`
    };
    return style;
  }
  /**
   * get blank fill style for scroll
   */
  get blankFillStyle() {
    let startIndex = 0;
    if (this.startIndex <= this.containSize) {
      startIndex = 0;
    } else {
      startIndex = this.startIndex - this.containSize;
    }
    return {
      paddingTop: startIndex * this.size + 'px',
      paddingBottom: this.data.length - this.endIndex + 'px'
    };
  }
  /**
   * calculate end index of visible data list
   */
  get endIndex() {
    let endIndex = this.startIndex + this.containSize * 2;
    if (!this.data[endIndex] && this.data.length) {
      endIndex = this.data.length;
    }
    return endIndex;
  }
  /**
   * get visible data
   */
  get visibleData() {
    let startIndex = 0;
    if (this.startIndex <= this.containSize) {
      startIndex = 0;
    } else {
      startIndex = this.startIndex - this.containSize;
    }
    return this.data.slice(startIndex, this.endIndex);
  }

  // groupData(data) {
  //   const result = [];
  //   this.handleData(result, data, 0);
  //   console.log(result);
  //   this.treeData = this.treeData.concat(result);
  // }
  /**
   * assemble data
   * @param result
   * @param origin data
   * @param level
   */
  handleData(result: Array<any>, data: Array<any>, level: number) {
    for (let i = 0; i < data.length; ++i) {
      const newObj = data[i];
      newObj['level'] = level;
      for (const obj in data[i]) {
        const value = data[i][obj];
        if (obj === this.childKey) {
          if (value && value.length) {
            newObj['hasChildren'] = true;
          } else { // 没有children则不显示展开图标
            newObj['hasChildren'] = false;
          }
          newObj['expanded'] = false;
        }
      }
      result.push(newObj);
      // this.reDefineDataSet(newObj);
      if (newObj['expanded'] && data[i].hasOwnProperty(this.childKey)) { // 添加展开的children
        const children = data[i][this.childKey];
        if (children && children.length) {
          this.handleData(result, children, level + 1);
        }
      }
    }
  }

  /**
   * expand event
   * @param item
   */
  handleExpand(rowData: any) {
    if (this.besideExpand) {
      this.$emit('expandEvent', rowData);
    } else {
      rowData.expanded = !rowData.expanded;
      let rowIdx = -1; // 当前行的索引
      let childrenNum = 0; // 当前行的子节点数量
      for (let i = 0; i < this.data.length; ++i) {
        const item = this.data[i];
        if (item[this.dataId] === rowData[this.dataId]) {
          rowIdx = i;
          if (rowData.expanded) break;
        } else if (rowIdx !== -1 && i > rowIdx) {
          if (item.level > rowData.level) {
            childrenNum += 1;
          } else {
            break;
          }
        }
      }
      // this.expandMap[rowData.nodeId] = rowData.expanded;
      if (rowData.expanded) {
        const children = [];
        this.handleData(children, rowData[this.childKey], rowData.level + 1);
        this.treeData.splice(rowIdx + 1, 0, ...children);
      } else {
        this.treeData.splice(rowIdx + 1, childrenNum);
      }
    }

  }

  /**
   * get contain size
   */
  getContainSize() {
    this.containSize = ~~(((this.$refs.refScrollContainer as any).offsetHeight || this.containerHeight) / this.size) + 2;
  }

  /**
   * common scroll event
   * @param current
   * @param target
   */
  handleScroll() {
    if (!this.scrollDirty) {
      this.scrollDirty = true;
      window.requestAnimationFrame(() => {
        this.setDataStartIndex();
        this.$emit('virtualScroll');
        this.scrollDirty = false;
      });
    }
  }

  /**
   * calculate start index again
   */
  setDataStartIndex() {
    const currentIndex = Math.floor((this.$refs.refScrollContainer as any).scrollTop / this.size);
    if (this.startIndex === currentIndex) {
      return;
    }
    this.startIndex = currentIndex;
  }

  /**
   * reset container scroll
   */
  resetScroll(scrollTop?: number) {
    const refScrollContainer: any = this.$refs.refScrollContainer;
    refScrollContainer.scrollTop = scrollTop || 0;
    refScrollContainer.scrollLeft = 0;
    if (!scrollTop) {
      this.startIndex = 0;
    }
  }
  mounted() {
    this.getContainSize();
    window.addEventListener('resize', this.getContainSize);
    window.onorientationchange = this.getContainSize;
  }
  beforeDestroy() {
    window.removeEventListener('resize', this.getContainSize);
    window.onorientationchange = null;
  }
}

export default VirtualScroll;
