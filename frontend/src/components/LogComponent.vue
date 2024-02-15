<script setup lang="ts">
const props = defineProps<{
  calculationStrings: string[]
}>()
</script>

<template>
  <div>
    <ul v-if="calculationStrings.length > 0">
      <li v-for="(calculation, index) in props.calculationStrings" :key="index">
        {{ calculation }}
      </li>
    </ul>
    <p v-else>No calculations yet</p>
  </div>
</template>

<style scoped>
div {
  max-height: object-fit;
  overflow: scroll;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
</style>
