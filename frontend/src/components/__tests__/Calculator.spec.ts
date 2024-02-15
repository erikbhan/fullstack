import { mount } from '@vue/test-utils'
import CalculatorComponent from '@/components/CalculatorComponent.vue'
import { describe, it, expect } from "vitest"

describe('CalculatorComponent', () => {
  it('displays the correct initial value', () => {
    const wrapper = mount(CalculatorComponent)
    expect(wrapper.find('.display').text()).toBe('0')
  })

  it('handles number clicks correctly', async () => {
    const wrapper = mount(CalculatorComponent)
    await wrapper.find('.button.one').trigger('click')
    await wrapper.find('.button.two').trigger('click')
    await wrapper.find('.button.three').trigger('click')
    expect(wrapper.find('.display').text()).toBe('123')
  })

  it('handles operator clicks correctly', async () => {
    const wrapper = mount(CalculatorComponent)
    await wrapper.find('.button.one').trigger('click')
    await wrapper.find('.button.two').trigger('click')
    await wrapper.find('.button.addition').trigger('click')
    await wrapper.find('.button.three').trigger('click')
    await wrapper.find('.button.four').trigger('click')
    await wrapper.find('.button.equals').trigger('click')
    expect(wrapper.find('.display').text()).toBe('46')
  })

  it('handles clear click correctly', async () => {
    const wrapper = mount(CalculatorComponent)
    await wrapper.find('.button.one').trigger('click')
    await wrapper.find('.button.two').trigger('click')
    await wrapper.find('.button.clear').trigger('click')
    expect(wrapper.find('.display').text()).toBe('0')
  })

})