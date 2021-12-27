import { Component, Vue, Mixins, Prop} from 'vue-property-decorator';
import Checkbox from './Checkbox';
@Component
class CFG extends Mixins(Checkbox) {
 @Prop() data !: Array<string>

 private currentData: Array<string> = this.data;
 private message: string = '';
 mounted() {
   this.message = this.getMessage();
 }
}

export default CFG;