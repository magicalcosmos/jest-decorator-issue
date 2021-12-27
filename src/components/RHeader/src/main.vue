<template>
  <header class="r-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'RHeader',

  componentName: 'RHeader',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
};
</script>
