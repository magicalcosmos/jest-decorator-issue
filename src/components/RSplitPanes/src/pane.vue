<template>
<div class="splitpanes__pane" :style="style">
  <slot/>
</div>
</template>

<script>
export default {
  name: 'RPane',
  componentName: 'RPane',
  props: {
    size: { type: [Number, String], default: null },
    minSize: { type: [Number, String], default: 0 },
    maxSize: { type: [Number, String], default: 100 },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    html: { type: String, default: '' },
    callback: { type: Function, default: null }

  },

  data: () => ({
    style: {}
  }),

  mounted() {
    this.$parent.onPaneAdd(this);
  },

  beforeDestroy() {
    this.$parent.onPaneRemove(this);
  },

  methods: {
    // Called from the splitpanes component.
    update(style) {
      this.style = style;
    }
  },

  computed: {
    sizeNumber() {
      return this.size ? parseFloat(this.size) : null;
    },
    minSizeNumber() {
      return parseFloat(this.minSize);
    },
    maxSizeNumber() {
      return parseFloat(this.maxSize);
    }
  },

  watch: {
    sizeNumber(size) {
      this.$parent.requestUpdate({ target: this, size });
    },
    minSizeNumber(min) {
      this.$parent.requestUpdate({ target: this, min });
    },
    maxSizeNumber(max) {
      this.$parent.requestUpdate({ target: this, max });
    }
  }
};
</script>
