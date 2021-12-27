import Testing from '@/views/Testing/index.vue';
import { mount } from '@vue/test-utils';

describe('Testing component', () => {
  test('should be exist', () => {
    const wrapper = mount(Testing);
  });
});