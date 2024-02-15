<script setup lang="ts">
import { ref, watch } from 'vue';

const name = ref("")
const email = ref("")
const message = ref("")
const errors = ref({ name: "", email: "", message: "" })

function onSubmit(event: Event) {
    console.log(event)
}

function validateEmail(email: string) {
    if (!email) {
        errors.value.email = "E-mail is required"
    }
    
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return errors.value.email = "Invalid e-mail."
    }

    return errors.value.email = ""
}

watch(email, (newEmail) => {
    validateEmail(newEmail)
});
</script>

<template>
    <form @submit="onSubmit">
        <div>
            <label for="name">Name</label>
            <input v-model="name" placeholder="Name" required />
        </div>
        <div>
            <label for="email">E-mail</label>
            <input v-model="email" placeholder="E-mail" required type="email"/>
        </div>
        <div>
            <label for="message">Message</label>
            <textarea v-model="message" placeholder="Message" required></textarea> 
        </div>
        <input type="submit" value="Submit" />
    </form>
</template>

<style>
</style>
