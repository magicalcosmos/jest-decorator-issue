<template>
  <transition name="r-zoom-in-top">
    <div
      class="r-table-filter"
      v-if="multiple"
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <div class="r-table-filter__content">
        <r-scrollbar wrap-class="r-table-filter__wrap">
          <r-checkbox-group class="r-table-filter__checkbox-group" v-model="filteredValue">
            <r-checkbox
              v-for="filter in filters"
              :key="filter.value"
              :title='filter.text'
              :label="filter.value">{{ filter.text }}</r-checkbox>
          </r-checkbox-group>
        </r-scrollbar>
      </div>
      <div class="r-table-filter__bottom">
        <button class='default' @click="handleReset">{{ t('el.table.resetFilter') }}</button>
        <button
          @click="handleConfirm"
          :class="{ 'is-disabled': filteredValue.length === 0 }"
          :disabled="filteredValue.length === 0">{{ t('el.table.confirmFilter') }}</button>
      </div>
    </div>
    <div
      class="r-table-filter"
      v-else
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <ul class="r-table-filter__list">
        <li
            class="r-table-filter__list-item"
            :class="{ 'is-active': filterValue === undefined || filterValue === null }"
            @click="handleSelect(null)">{{ t('el.table.clearFilter') }}</li>
        <li
            class="r-table-filter__list-item"
            v-for="filter in filters"
            :label="filter.value"
            :key="filter.value"
            :class="{ 'is-active': isActive(filter) }"
            @click="handleSelect(filter.value)" >{{ filter.text }}</li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popper from '@/components/RSrc/utils/vue-popper';
import { PopupManager } from '@/components/RSrc/utils/popup';
import Locale from '@/components/RSrc/mixins/locale';
import Clickoutside from '@/components/RSrc/utils/clickoutside';
import Dropdown from './dropdown';
import RCheckbox from '@/components/RCheckbox';
import RCheckboxGroup from '@/components/RCheckboxGroup';
import RScrollbar from '@/components/RScrollbar';

export default {
  name: 'RTableFilterPanel',

  mixins: [Popper, Locale],

  directives: {
    Clickoutside
  },

  components: {
    RCheckbox,
    RCheckboxGroup,
    RScrollbar
  },

  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },

  methods: {
    isActive(filter) {
      return filter.value === this.filterValue;
    },

    handleOutsideClick() {
      setTimeout(() => {
        this.showPopper = false;
      }, 16);
    },

    handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },

    handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },

    handleSelect(filterValue) {
      this.filterValue = filterValue;

      if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
        this.confirmFilter(this.filteredValue);
      } else {
        this.confirmFilter([]);
      }

      this.handleOutsideClick();
    },

    confirmFilter(filteredValue) {
      this.table.store.commit('filterChange', {
        column: this.column,
        values: filteredValue
      });
      this.table.store.updateAllSelected();
    }
  },

  data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },

  computed: {
    filters() {
      return this.column && this.column.filters;
    },

    filterValue: {
      get() {
        return (this.column.filteredValue || [])[0];
      },
      set(value) {
        if (this.filteredValue) {
          if ((typeof value !== 'undefined') && (value !== null)) {
            this.filteredValue.splice(0, 1, value);
          } else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },

    filteredValue: {
      get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },

    multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },

  mounted() {
    this.popperElm = this.$el;
    this.referenceElm = this.cell;
    this.table.bodyWrapper.addEventListener('scroll', () => {
      this.updatePopper();
    });

    this.$watch('showPopper', (value) => {
      if (this.column) this.column.filterOpened = value;
      if (value) {
        Dropdown.open(this);
      } else {
        Dropdown.close(this);
      }
    });
  },
  watch: {
    showPopper(val) {
      if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
        this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      }
    }
  }
};
</script>
