<template>
  <div class="loading bg">
    <div class="loading-pop">
      <div class="loading-pop-wrap">
        <img src="@img/ticpsh_loading.gif" class="loading-img" />
        <br/>
        <span class="loading">{{$t('loading')}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class Loading extends Vue {}
export default Loading;
</script>
