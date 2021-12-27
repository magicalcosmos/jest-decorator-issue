<template>
  <div
    @click="handleClick"
    class="n-button"
    :class="[
      type ? 'n-button-type-' + type : '',
      size ? 'n-button-size-' + size : '',
      disabled ? 'is-disabled' : '',
      round ? 'is-round' : '',
      gray ? 'is-gray' : ''
    ]"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'NButton',

  props: {
    // 类型
    // primary success info warning danger
    type: {
      type: String,
      default: 'primary'
    },
    // 大小
    // huge big medium small mini
    size: {
      type: String,
      default: 'medium'
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 圆角
    round: {
      type: Boolean,
      default: false
    },
    // 灰色
    gray: {
      type: Boolean,
      default: false
    },
    // 图标
    icon: {
      type: String,
      default: null
    }
  },

  data() {
    return {};
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>

<style lang="scss" scoped>
.n-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.2s all;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 12px;
  font-weight: normal;
  padding: 9px 14px;
  border-radius: 4px;
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.is-gray {
    background: #F8F8F8;
  }
  &.is-round {
    border-radius: 999px;
  }
  &-size-huge {
    font-size: 16px;
    padding: 15px 24px;
  }
  &-size-big {
    font-size: 14px;
    padding: 12px 20px;
  }
  &-size-small {
    font-size: 10px;
    padding: 8px 10px;
    font-weight: normal;
  }
  &-size-mini {
    font-size: 8px;
    padding: 4px 6px;
    font-weight: lighter;
  }
  // 设定根据色调改变颜色的规则
  @mixin typeColor($color: #409eff) {
    color: $color;
    background: rgba($color, 0.12);
    border-color: rgba($color, 0.35);
    &:active {
      background: rgba($color, 0.35);
    }
  }
  // 套用规则
  &-type-primary:hover {
    color: #ecf5ff !important;
    border-color: #8995a1 !important;
    background-color: #3269F6 !important;
    border: none;
    box-shadow: 0px 4px 20px -3px rgba(50, 105, 246, 0.5);
  }
  &-type-success:hover {
    @include typeColor(#67c23a);
  }
  &-type-info:hover {
    @include typeColor(#909399);
  }
  &-type-warning:hover {
    @include typeColor(#e6a23c);
  }
  &-type-danger:hover {
    @include typeColor(#f56c6c);
  }
  .iconfont {
    top: 0 !important;
    margin: 0 !important;
  }
}
</style>
