<template>
  <r-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="r-popconfirm">
    <p class="r-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="r-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="r-popconfirm__action">
      <r-button 
        size="mini" 
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{cancelButtonText}}
      </r-button>
      <r-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
      >
        {{confirmButtonText}}
      </r-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</r-popover>
</template>

<script>
import RPopover from '@/components/RPopover';
import RButton from '@/components/RButton';
import { t } from '@/components/RSrc/locale';

export default {
  name: 'RPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String,
      default: t('el.popconfirm.confirmButtonText')
    },
    cancelButtonText: {
      type: String,
      default: t('el.popconfirm.cancelButtonText')
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'r-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    RPopover,
    RButton
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('onConfirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('onCancel');
    }
  }
};
</script>
