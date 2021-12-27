import RDialog from './RDialog/index.js';
import CascaderVirtualscroll from './CascaderVirtualscroll/index.js';
import RDropdown from './RDropdown/index.js';
import RDropdownMenu from './RDropdownMenu/index.js';
import RDropdownItem from './RDropdownItem/index.js';
import RButton from './RButton/index.js';
import RLoading from './RLoading/index.js';
import RButtonGroup from './RButtonGroup/index.js';
import RTag from './RTag/index.js';
import RTooltip from './RTooltip/index.js';
import RProgress from './RProgress/index.js';
import RInput from './RInput/index.js';
import RInputNumber from './RInputNumber/index.js';
import RRadio from './RRadio/index.js';
import RCheckbox from './RCheckbox/index.js';
import RCheckboxGroup from './RCheckboxGroup/index.js';
import RScrollbar from './RScrollbar/index.js';
import RSelect from './RSelect/index.js';
import ROption from './ROption/index.js';
import RCascader from './RCascader/index.js';
import RAutocomplete from './SelectInput/index.js';
import RCascaderPanel from './RCascaderPanel/index.js';
import RTable from './RTable/index.js';
import RTableColumn from './RTableColumn/index.js';
import RTree from './RTree/index.js';
import RUpload from './RUpload/index.js';
import RTabPane from './RTabPane/index.js';
import RTabs from './RTabs/index.js';
import RDatePicker from './RDatePicker/index.js';

import RFormItem from './RFormItem/index.js';
import RForm from './RForm/index.js';
import RHeader from './RHeader/index.js';
import RSpitPanes from './RSplitPanes/index.js';
import RPane from './RPane/index.js';
import RPageHeader from './RPageHeader/index.js';
import RPagination from './RPagination/index.js';
import RMenu from './RMenu/index.js';
import RMenuItem from './RMenuItem/index.js';
import RMenuItemGroup from './RMenuItemGroup/index.js';
import RSubmenu from './RSubmenu/index.js';
import RRadioGroup from './RRadioGroup/index.js';
import RStep from './RStep/index.js';
import RSteps from './RSteps/index.js';

import RMessage from './RMessage/index.js';
import RMessageBox from './RMessageBox/index.js';
import RPopconfirm from './RPopconfirm/index.js';
import RPopover from './RPopover/index.js';

import RSwitch from './RSwitch/index.js';
import RCollapseItem from './collapse-item/index.js';
import RCollapse from './collapse/index.js';
import NInput from './NInput/index.js';
import SRSelect from './SRSelect/index.js';
import SRInput from './SRInput/index.js';
import SRInputNumber from './SRInputNumber/index.js';

const components = [
  CascaderVirtualscroll,
  NInput,
  SRSelect,
  SRInput,
  SRInputNumber,
  RDialog,
  RDropdown,
  RDropdownMenu,
  RDropdownItem, 
  RHeader,
  RButton,
  RButtonGroup,
  RTag,
  RTooltip,
  RProgress,
  RInput,
  RInputNumber,
  RRadio,
  RCheckbox,
  RCheckboxGroup,
  RScrollbar,
  RSelect,
  ROption,
  RCascader,
  RAutocomplete,
  RCascaderPanel,
  RTable,
  RTableColumn,
  RTree,
  RUpload,
  RForm,
  RFormItem,
  RPane,
  RSpitPanes,
  RPageHeader,
  RPagination,
  RMenu,
  RMenuItem,
  RMenuItemGroup,
  RSubmenu,
  RRadioGroup,
  RMessageBox,
  RStep,
  RSteps,
  RPopconfirm,
  RPopover,
  RSwitch,
  RTabPane,
  RTabs,
  RCollapseItem,
  RCollapse,
  RDatePicker
];
const install = function(Vue, opts = {}) {
  components.forEach((component: any) => {
    Vue.component(component.name, component);
  });

  Vue.use(RLoading.directive);
  Vue.prototype.$msgbox = RMessageBox;
  Vue.prototype.$alert = RMessageBox.alert;
  Vue.prototype.$confirm = RMessageBox.confirm;
  Vue.prototype.$prompt = RMessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = RMessage;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '1.0.0',
  install,
  CascaderVirtualscroll,
  NInput,
  SRSelect,
  SRInput,
  SRInputNumber,
  RDialog,
  RDropdown,
  RDropdownMenu,
  RDropdownItem,
  RHeader,
  RButton,
  RButtonGroup,
  RTag,
  RTooltip,
  RProgress,
  RInput,
  RInputNumber,
  RRadio,
  RCheckbox,
  RCheckboxGroup,
  RScrollbar,
  RSelect,
  ROption,
  RCascader,
  RCascaderPanel,
  RTable,
  RTableColumn,
  RTree,
  RUpload,
  RForm,
  RFormItem,
  RPageHeader,
  RPagination,
  RMenu,
  RMenuItem,
  RMenuItemGroup,
  RSubmenu,
  RRadioGroup,
  RMessageBox,
  RStep,
  RSteps,
  RPopconfirm,
  RPopover,
  RSwitch,
  RTabPane,
  RTabs,
  RCollapseItem,
  RCollapse,
  RDatePicker
};
