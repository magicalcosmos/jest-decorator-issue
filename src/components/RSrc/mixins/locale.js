import { t } from '@/components/RSrc/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
