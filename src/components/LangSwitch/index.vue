<template>
  <div :class="`${lsClass} lang-switch-temp`">
    <span class='lang-desc'>{{currentDesc}}:</span>
    <r-select
      v-model="currentLang"
      class="select-options">
      <r-option v-for="(item, key) in langKeys" :key="key" :label="langOptionDesc(item)" :value="item"></r-option>
    </r-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { setLang, getLang } from '@/utils/auth';
import i18n from '@/i18n';
import common from '@/utils/common';

@Component()
class LangSwitch extends Vue {
  @Prop({ default: '' }) lsClass!: String;

  private langKeys: Array<String> = Object.keys(i18n.messages);
  private currentLang: String = getLang() || i18n.fallbackLocale;

  @Watch('currentLang')
  getCurrentLang(lang) {
    setLang(lang);
    window['vm'].$i18n.locale = getLang();
  }

  get currentDesc() {
    return common.i18n('common.lang');
  }
  langOptionDesc(langType) {
    // 返回最近使用项目并监听
    return i18n.messages[langType].common.lang_desc;
  }

  mounted() {
    // this.$store.dispatch('GET_RECENT_PROJECT', this);
  }

}
export default LangSwitch;
</script>
