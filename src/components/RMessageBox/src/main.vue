<template>
  <transition name="msgbox-fade">
    <div
      class="r-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="r-message-box" :class="[customClass, center && 'r-message-box--center']">
        <div class="r-message-box__header" v-if="title !== null">
          <div class="r-message-box__title">
            <svg-icon icon-class="icon-warning"/>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="r-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="r-message-box__close r-icon-close"></i>
          </button>
        </div>
        <div class="r-message-box__content">
          <div class="r-message-box__container">
            <div
              :class="['r-message-box__status', icon]"
              v-if="icon && !center && message !== ''">
            </div>
            <div class="r-message-box__message" v-if="message !== ''">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
          </div>
          <div class="r-message-box__input" v-show="showInput">
            <r-input
              v-model="inputValue"
              :type="inputType"
              @keydown.enter.native="handleInputEnter"
              :placeholder="inputPlaceholder"
              ref="input"></r-input>
            <div class="r-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="r-message-box__btns">
          <r-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </r-button>
          <r-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </r-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '@/components/RSrc/utils/popup';
import Locale from '@/components/RSrc/mixins/locale';
import RInput from '@/components/RInput';
import RButton from '@/components/RButton';
import { addClass, removeClass } from '@/components/RSrc/utils/dom';
import { t } from '@/components/RSrc/locale';
import Dialog from '@/components/RSrc/utils/aria-dialog';

let messageBox;
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};

export default {
  mixins: [Popup, Locale],

  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },

  components: {
    RInput,
    RButton
  },

  computed: {
    icon() {
      const { type, iconClass } = this;
      return iconClass || (type && typeMap[type] ? `r-icon-${typeMap[type]}` : '');
    },

    confirmButtonClasses() {
      return `r-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    }
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();
      messageBox.closeDialog(); // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    },

    handleInputEnter() {
      if (this.inputType !== 'textarea') {
        return this.handleAction('confirm');
      }
    },

    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === 'prompt') {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
          addClass(this.getInputElement(), 'invalid');
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      removeClass(this.getInputElement(), 'invalid');
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector('.r-message-box__btns .r-button');
      const title = this.$el.querySelector('.r-message-box__btns .r-message-box__title');
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction('close');
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate();
          }
        });
      }
    },

    visible(val) {
      if (val) {
        this.uid++;
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus();
          });
        }
        this.focusAfterClosed = document.activeElement;
        messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
      }

      // prompt
      if (this.$type !== 'prompt') return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputElement().focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close);
      }
    });
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  },

  data() {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      iconClass: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false
    };
  }
};
</script>
