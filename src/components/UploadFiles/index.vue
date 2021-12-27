<!--
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-10-22 11:22:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/UploadFiles/index.vue
-->
<template>
  <div>
    <div class="upload-files">
      <r-upload
        ref="refUpload"
        :action="action"
        drag
        :multiple="multiple"
        :auto-upload="false"
        name="file"
        :file-list="fileList"
        :show-file-list="isShowSideFileList"
        :accept="accept"
        :http-request="upload"
        :on-change="onFileChange"
        :on-remove="onRemove"
        :before-upload="beforeAvatarUpload">
        <!-- <i class="iconfont icon-second-step-enable"></i> -->
        <div class="icon-style">
          <svg class="icon icon-edit pointer" aria-hidden="true">
            <use xlink:href="#icon-second-step-enable"></use>
          </svg>
        </div>
        <div class="r-upload__text">{{ $t('upload.drag_files_here') }}
          <em>{{ $t('upload.click_upload') }}</em>
        </div>

        <div slot="tip" class="r-upload__tip">{{ tips }}</div>
      </r-upload>
    </div>
  </div>

</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class UploadFiles extends Vue {
  @Prop({ default: '' }) accept!: string
  @Prop({ default: 'Only support zip' }) tips!: string
  @Prop({ default: '' }) action!: string
  @Prop({ default: true }) multiple!: string
  @Prop({ default: false }) isShowSideFileList!: boolean

  private fileList: Array<any> = [];
  beforeAvatarUpload(file: object) {
    this.$emit('beforeAvatarUpload', file);
  }
  onFileChange(file: object, fileList: object[]) {
    this.fileList = fileList;
    this.$emit('onFileChange', file, fileList);
  }
  onRemove(file: object, fileList: object[]) {
    this.fileList = fileList;
    this.$emit('onRemove', file, fileList);
  }
  upload(item: any): void {
    this.$emit('upload', item);
  }
  submit() {
    this.getRef().submit();
  }
  getRef(): any {
    return this.$refs.refUpload;
  }
  abort() {
    this.getRef().abort();
  }
  clear() {
    this.getRef().clearFiles();
  }
  pop() {
    this.getRef().uploadFiles.pop();
  }

}
export default UploadFiles;
</script>
