/*
 * @Author: your name
 * @Date: 2020-10-29 16:37:41
 * @LastEditTime: 2020-10-29 16:39:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/SREditInputValue/index.ts
 */
import SRInput from './src/index.vue';
/* istanbul ignore next */
SRInput.install = function(Vue) {
  Vue.component(SRInput.name, SRInput);
};

export default SRInput;
