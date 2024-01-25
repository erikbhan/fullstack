<script setup lang="ts">

import { ref } from 'vue';
import Calculator from '../components/CalculatorComponent.vue'
import Log from '../components/LogComponent.vue'

let calculations = ref<string[]>([]);
const logCalculation = (firstValue: number, secondValue: number, result: number, operator: string) => {
  if (!operator) {
    calculations.value.push(String(result));
    return;
  }
  calculations.value.push(String(firstValue) + " " + operator + " " + String(secondValue) + " = " + String(result));
}

</script>

<template>
<div class="container">
  <div class="calculator"><Calculator @calculation="logCalculation" /></div>
  <div class="log"><Log :calculationStrings="calculations" /></div>
  <div class="leftside"></div>
  <div class="rightside"></div>
</div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    "leftside log calculator rightside";
}

.leftside { grid-area: leftside; }
.rightside { grid-area: rightside; }
.calculator {
  grid-area: calculator;
}
.log {
  padding: 1em;
  margin-top: 2em;
  grid-area: log;
  max-height: 700px;
  overflow: scroll;
}
</style>