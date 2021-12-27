global.WebSocket = require('ws');
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

const location = {
  href: {
    indexOf: jest.fn()
  }
};
global.window = {
  localStorage: localStorageMock,
  location,
  navigator: {
    userAgent: {
      indexOf: jest.fn(),
      toLowerCase: jest.fn()
    }
  }
};

global.localStorage = localStorageMock;
global.location = location;

global.navigator = {
  userAgent: 'node'
};


const Vue = require('vue');
const VueI18n = require('vue-i18n');
const zhEl = require('@/i18n/lib/locale/lang/zh-CN.js');
const enEl = require('@/i18n/lib/locale/lang/en.js');
const jaEl = require('@/i18n/lib/locale/lang/ja.js');
const messages = {
  'zh-CN': {
    ...zhEl
  },
  'en-US': {
    ...enEl
  },
  'ja-JP': {
    ...jaEl
  }
};
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
});
window['vm'] = {};
window['vm'].$i18n = i18n;
