import { Component, Vue } from 'vue-property-decorator';
@Component
class Assistant extends Vue {
  getMessage() {
    return 'assistant';
  }
}

export default Assistant;