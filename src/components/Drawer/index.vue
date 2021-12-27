<!--
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-10-21 10:27:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/Drawer/index.vue
-->
<template>
  <section :class="drawer">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({})
class Drawer extends Vue {
  @Prop({ default: false }) visible!: boolean;
  private drawer: string = 'init-position';
  @Watch('visible')
  getVisible(val) {
    // this.drawer = 'animated drawer ' + (val ? 'fadeInLeft' : 'fadeOutLeft');
    this.drawer = 'animated drawer ' + (val ? 'in' : 'out');
  }
  handleAnimated() {
    const drawer = document.querySelector('.drawer');
    if (drawer) {
      drawer.addEventListener('animationend', () => {
        this.$emit('animationend');
      });
    }
  }
  mounted() {
    this.handleAnimated();
  }
}
export default Drawer;
</script>
