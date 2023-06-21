import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import CommonSwitch from '../../Common/CommonSwitch.vue';

describe('CommonSwitchVue', () => {
  it('renders properly', async () => {
    const wrapper = mount(
      CommonSwitch, 
      {props: {
        checked: false
      }}
    );

    expect(wrapper.attributes('checked')).toBeFalsy();

    expect(wrapper.classes()).toContain('container');

    wrapper.vm.$emit('change', true);

    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted().toggle[0]).toEqual([true]);
  })
})