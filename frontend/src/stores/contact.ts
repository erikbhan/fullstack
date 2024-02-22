import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useContactStore = defineStore('Contact', () => {
  const name = ref('')
  const email = ref('')
  const message = ref('')

  return {
    name: computed({
      get: () => name.value,
      set: (n) => (name.value = n)
    }),
    email: computed({
      get: () => email.value,
      set: (n) => (email.value = n)
    }),
    message: computed({
      get: () => message.value,
      set: (n) => (message.value = n)
    })
  }
})
