<template>
  <div class="r-page-header">
    <div class="r-page-header__left" @click="$emit('back')">
      <i class="iconfont icon-arrow-left"></i>
      <div class="r-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="r-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from '@/components/RSrc/locale';
export default {
  name: 'RPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title');
      }
    },
    content: String
  }
};
</script>
