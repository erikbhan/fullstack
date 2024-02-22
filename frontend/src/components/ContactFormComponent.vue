<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()
const { name, email, message } = storeToRefs(contactStore)

const isSubmitDisabled = ref(true)
const errors = ref({
  name: 'Name is required',
  email: 'E-mail is required.',
  message: 'Message is required'
})

const successMessage = ref('')

function validateName(name: string) {
  if (!name) {
    errors.value.name = 'Name is required.'
  } else {
    errors.value.name = ''
  }
}

function validateEmail(email: string) {
  if (!email) {
    errors.value.email = 'E-mail is required.'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.value.email = 'Invalid e-mail.'
  } else {
    errors.value.email = ''
  }
}

function validateMessage(message: string) {
  if (!message) {
    errors.value.message = 'Message is required.'
  } else {
    errors.value.message = ''
  }
}

function onSubmit(event: Event) {
  event.preventDefault()

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
  }

  fetch('http://localhost:3000/contactForms', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))

  successMessage.value = 'Form submitted successfully!'
}

watch(errors.value, (newValue) => {
  successMessage.value = ''
  if (newValue.name || newValue.email || newValue.message) {
    isSubmitDisabled.value = true
  } else {
    isSubmitDisabled.value = false
  }
})

watch(name, (newName) => {
  validateName(newName)
})
watch(email, (newEmail) => {
  validateEmail(newEmail)
})
watch(message, (newMessage) => {
  validateMessage(newMessage)
})
</script>

<template>
  <form @submit="onSubmit">
    <div>
      <label for="name">Name</label>
      <input data-test-id="name-input" v-model="name" placeholder="Name" required />
    </div>
    <div>
      <label for="email">E-mail</label>
      <input
        data-test-id="email-input"
        v-model="email"
        placeholder="E-mail"
        required
        type="email"
      />
    </div>
    <div>
      <label for="message">Message</label>
      <textarea
        data-test-id="message-input"
        v-model="message"
        placeholder="Message"
        required
      ></textarea>
    </div>
    <input data-test-id="submit-button" type="submit" value="Submit" :disabled="isSubmitDisabled" />
  </form>
  <p data-test-id="success-message" id="success-message" v-if="successMessage">
    {{ successMessage }}
  </p>
  <p data-test-id="error-name" v-if="errors.name">{{ errors.name }}</p>
  <p data-test-id="error-email" v-if="errors.email">{{ errors.email }}</p>
  <p data-test-id="error-message" v-if="errors.message">{{ errors.message }}</p>
</template>

<style scoped>
p {
  color: red;
}

#success-message {
  color: green;
}
</style>
