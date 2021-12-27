<!--
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-06-19 10:58:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/RUpload/src/upload-dragger.vue
-->
<template>
  <div
    class="r-upload-dragger"
    :class="{
      'is-dragover': dragover
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'RUploadDrag',
  props: {
    disabled: Boolean
  },
  inject: {
    uploader: {
      default: ''
    }
  },
  data() {
    return {
      dragover: false
    };
  },
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop(e) {
      if (this.disabled || !this.uploader) return;
      const accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
        const { type, name } = file;
        const extension = name.indexOf('.') > -1
          ? `.${name.split('.').pop()}`
          : '';
        const baseType = type.replace(/\/.*$/, '');
        return accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType;
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '');
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType;
            }
            return false;
          });
      }));
    }
  }
};
</script>
<style lang="scss" scoped>
  .r-upload-dragger {
    &:hover {
      background-color: #f9f6ff !important;
    }
  }
</style>

