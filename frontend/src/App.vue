<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </header>
    <div class="main">
      <RouterView />
    </div>
    <div class="footer"><small>This is the footer</small></div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8em 1fr 8em;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
</style>
