import { mount } from '@vue/test-utils'
import ContactFormComponent from '@/components/ContactFormComponent.vue'
import { describe, it, expect, vi } from "vitest"
import { createTestingPinia } from '@pinia/testing'

describe('ContactFormComponent', () => {
  it('should validate name field', async () => {
    const wrapper = mount(ContactFormComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn(),
          }),
        ],
      },
    })
    const nameInput = wrapper.find('[data-test-id="name-input"]')

    // Set an invalid name
    await nameInput.setValue('')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-name"]').text()).toBe('Name is required')

    // Set a valid name
    await nameInput.setValue('John Doe')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-name"]').exists()).toBe(false)
  })

  it('should validate email field', async () => {
    const wrapper = mount(ContactFormComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn(),
          }),
        ],
      },
    })
    const emailInput = wrapper.find('[data-test-id="email-input"]')

    // Set an invalid email
    await emailInput.setValue('invalid-email')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-email"]').text()).toBe('Invalid e-mail.')

    // Set a valid email
    await emailInput.setValue('john@example.com')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-email"]').exists()).toBe(false)
  })

  it('should validate message field', async () => {
    const wrapper = mount(ContactFormComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn(),
          }),
        ],
      },
    })
    const messageInput = wrapper.find('[data-test-id="message-input"]')

    // Set an invalid message
    await messageInput.setValue('')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-message"]').text()).toBe('Message is required')

    // Set a valid message
    await messageInput.setValue('Hello, world!')
    await wrapper.trigger('submit')
    expect(wrapper.find('[data-test-id="error-message"]').exists()).toBe(false)
  })
})