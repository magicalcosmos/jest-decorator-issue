import { Component, Mixins, Prop } from 'vue-property-decorator';
import { CFG } from '@/views/components';
import Assistant from './assistant';
@Component({
  components: {
    'cfg': CFG
  }
})
class Testing extends Mixins(Assistant) {
  @Prop() data!: string
  private currentData = this.data;
  private assistant: string = '';
  mounted() {
    this.assistant = this.getMessage();
  }
}

export default Testing;