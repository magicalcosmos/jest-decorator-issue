<template>
  <div class="select-directory">
    <div>
      <input ref="refSelectedInput" type="text" class="selected-input" name="directoryPath" readonly @click="handleSelect" />
      <span class="btn-select" @click="handleSelect">选择</span>
    </div>
    <div v-show="isShowTree" class="directory-list">
      <r-tree
        ref="refSelectedTree"
        default-expand-all
        class="directory-tree"
        :data="data"
        node-key="id"
        highlight-current
        :props="defaultProps"
        @node-click="handleNodeClick">
      </r-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class SelectDirectory extends Vue {
  @Prop({ default() { return []; } }) directoryTree!: object[];
  @Prop({ default() { return []; } }) dirs!: object[];
  @Prop() filter!: boolean;
  @Prop() filterNoFuncs!: boolean;

    defaultProps = {
      children: 'children',
      label: 'name'
    };

  isShowTree = false;
  data = this.addData(this.directoryTree);
  currentDir = this.dirs;

  addData(data): object[] {
    var treeData = JSON.parse(JSON.stringify(data));
    var newData = [];
    this.filter && this.filterNode(treeData, newData);
    this.filterNoFuncs && this.removeFuncsNode(treeData, newData);
    //   for (let i = 0; this.filter && i < treeData.length; i++) {
    //     this.formatNode(treeData[i])
    //   }
    return [{
      label: './',
      name: './',
      path: './',
      children: this.filter || this.filterNoFuncs ? newData : treeData
    }];
  }
  /**
   * 过滤所有节点 type: 0: 函数, 1: 文件, 2: 头文件, 3:文件夹
   */
  filterNode(data, newData) {
    var i = 0;
    for (; data && i < data.length; i++) {
      if (data[i].children && data[i].children.length > 0 && data[i].type === 3) {
        var tempData = Object.assign({}, {
          id: data[i].id,
          name: data[i].name,
          path: data[i].path,
          children: []
        });
        data[i].children && this.filterNode(data[i].children, tempData.children);
        newData.push(tempData);
      }
    }
  }
  removeFuncsNode(data, newData) {
    var i = 0;
    for (; data && i < data.length; ++i) {

      if (data[i].type === 3 || data[i].type === 1 || data[i].type === 2) {
        var tempData = Object.assign({}, {
          id: data[i].id,
          name: data[i].name,
          path: data[i].path,
          children: []
        });
        data[i].children && this.removeFuncsNode(data[i].children, tempData.children);
        newData.push(tempData);
      }
    }
  }
  formatNode(node) {
    if (node.name.indexOf('.') !== -1) {
      node.disabled = !0;
    }
    if (node.children != null) {
      for (let n = 0; n < node.children.length; ++n) {
        this.formatNode(node.children[n]);
      }
    } else {
      node.disabled = !0;
    }
  }
  handleSelect() {
    this.isShowTree = !this.isShowTree;
  }
  getInputRef(): any {
    return this.$refs.refSelectedInput;
  }
  handleNodeClick(data) {
    if (data.disabled) {
      return;
    }
    this.getInputRef().value = data.path;
    this.isShowTree = false;
  }
  val() {
    return this.getInputRef().value;
  }
  reset() {
    this.getInputRef().value = '';
  }
}
export default SelectDirectory;
// export default {
//   name: 'SelectDirectory',
//   props: {
//     directoryTree: {
//       type: Array,
//       default: function() {
//         return [];
//       }
//     },
//     dirs: {
//       type: Array,
//       default: function() {
//         return [];
//       }
//     },
//     filter: {
//       type: Boolean
//     },
//     filterNoFuncs: {
//       type: Boolean
//     }
//   }, // 选择目录
//   data: function() {
//     var data = {
//       defaultProps: {
//         children: 'children',
//         label: 'name'
//       },
//       isShowTree: false,
//       data: this.addData(this.directoryTree),
//       currentDir: this.dirs
//     };
//     return data;
//   },
//   watch: {
//     directoryTree(val) {
//       this.data = this.addData(val);
//     },
//     dirs(val) {
//       this.currentDir = val;
//     }
//   },
//   methods: {
//     removeFuncsNode: function(data, newData) {
//       var i = 0;
//       for (; data && i < data.length; ++i) {

//         if (data[i].type === 3 || data[i].type === 1 || data[i].type === 2) {
//           var tempData = Object.assign({}, {
//             id: data[i].id,
//             name: data[i].name,
//             path: data[i].path,
//             children: []
//           });
//           data[i].children && this.removeFuncsNode(data[i].children, tempData.children);
//           newData.push(tempData);
//         }
//       }
//     },
//     /**
//          * 过滤所有节点 type: 0: 函数, 1: 文件, 2: 头文件, 3:文件夹
//          */
//     filterNode: function(data, newData) {
//       var i = 0;
//       for (; data && i < data.length; i++) {
//         if (data[i].children && data[i].children.length > 0 && data[i].type === 3) {
//           var tempData = Object.assign({}, {
//             id: data[i].id,
//             name: data[i].name,
//             path: data[i].path,
//             children: []
//           });
//           data[i].children && this.filterNode(data[i].children, tempData.children);
//           newData.push(tempData);
//         }
//       }
//     },
//     addData: function(data) {
//       var treeData = JSON.parse(JSON.stringify(data));
//       var newData = [];
//       this.filter && this.filterNode(treeData, newData);
//       this.filterNoFuncs && this.removeFuncsNode(treeData, newData);
//       //   for (let i = 0; this.filter && i < treeData.length; i++) {
//       //     this.formatNode(treeData[i])
//       //   }
//       return [{
//         label: './',
//         name: './',
//         path: './',
//         children: this.filter || this.filterNoFuncs ? newData : treeData
//       }];
//     },
//     formatNode: function(node) {
//       if (node.name.indexOf('.') !== -1) {
//         node.disabled = !0;
//       }
//       if (node.children != null) {
//         for (let n = 0; n < node.children.length; ++n) {
//           this.formatNode(node.children[n]);
//         }
//       } else {
//         node.disabled = !0;
//       }
//     },
//     handleSelect: function() {
//       this.isShowTree = !this.isShowTree;
//     },
//     handleNodeClick: function(data) {
//       if (data.disabled) {
//         return;
//       }
//       this.$refs.refSelectedInput.value = data.path;

//       this.isShowTree = false;
//     },
//     val: function() {
//       return this.$refs.refSelectedInput.value;
//     },
//     reset: function() {
//       this.$refs.refSelectedInput.value = '';
//     }
//   }
// };
</script>
