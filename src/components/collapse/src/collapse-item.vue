<template>
  <div 
    class="r-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`r-collapse-content-${id}`"
      :aria-describedby ="`r-collapse-content-${id}`"
    >
      <div
        class="r-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`r-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="r-collapse-item__arrow r-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <r-collapse-transition>
      <div
        class="r-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`r-collapse-head-${id}`"
        :id="`r-collapse-content-${id}`"
      >
        <div class="r-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </r-collapse-transition>
  </div>
</template>
<script>
import RCollapseTransition from '@/components/RSrc/transitions/collapse-transition';
import Emitter from '@/components/RSrc/mixins/emitter';
import { generateId } from '@/components/RSrc/utils/util';

export default {
  name: 'RCollapseItem',

  componentName: 'RCollapseItem',

  mixins: [Emitter],

  components: { RCollapseTransition },

  data() {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    };
  },

  inject: ['collapse'],

  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      }
    },
    disabled: Boolean
  },

  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1;
    }
  },

  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true;
        } else {
          this.isClick = false;
        }
      }, 50);
    },
    handleHeaderClick() {
      if (this.disabled) return;
      this.dispatch('RCollapse', 'item-click', this);
      this.focusing = false;
      this.isClick = true;
    },
    handleEnterClick() {
      this.dispatch('RCollapse', 'item-click', this);
    }
  }
};
</script>

