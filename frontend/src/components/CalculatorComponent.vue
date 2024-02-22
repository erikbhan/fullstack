<script setup lang="ts">
import { ref, onUnmounted } from "vue"
import axios from 'axios';

const emit = defineEmits<{
  calculation: [firstValue: number, secondValue: number, result: number, operator: string]
}>()

const displayValue = ref('0')
const operator = ref('')
const firstValue = ref(0)
const secondValue = ref(0)
const shouldReset = ref(false)
axios.defaults.baseURL = 'http://localhost:8080';


const handleNumberClick = (value: string) => {
  if (displayValue.value === '0' || shouldReset.value) {
    displayValue.value = value
    shouldReset.value = false
  } else {
    displayValue.value += value
  }
}

const handleCommaClick = () => {
  if (!displayValue.value.includes(',')) {
    displayValue.value += ','
  }
}

const handleClearClick = () => {
  displayValue.value = '0'
  operator.value = ''
  firstValue.value = 0
  secondValue.value = 0
}

const handleOperatorClick = (value: string) => {
  if (value === 'invert') {
    displayValue.value = String(Number(displayValue.value) * -1)
    return
  } else if (value === '%') {
    displayValue.value = String(Number(displayValue.value) / 100)
    return
  }
  if (operator.value) {
    calculate()
  }
  operator.value = value
  firstValue.value = Number(displayValue.value)
  shouldReset.value = true
}

const calculate = async () => {
  if (operator.value.length === 0) {
    return
  }

  secondValue.value = Number(displayValue.value)

  await axios.post('/calculate', {
    num1: firstValue.value,
    num2: secondValue.value,
    operation: operator.value
  }).then(response => {
    displayValue.value = String(response.data)
  }).catch(error => {
    console.error(error)
  })

  emit("calculation", firstValue.value, secondValue.value, Number(displayValue.value), operator.value);

  operator.value = ''
  firstValue.value = 0
  secondValue.value = 0
  shouldReset.value = true
}

const handleKeyPress = (event: KeyboardEvent) => {
  const { key } = event
  if (key === 'Enter') {
    calculate()
  } else if (key === 'Escape') {
    handleClearClick()
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleOperatorClick(key)
  } else if (key === ',') {
    handleNumberClick(',')
  } else if (Number(key) >= 0 && Number(key) <= 9) {
    handleNumberClick(key)
  }
}

window.addEventListener('keydown', handleKeyPress)
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div v-if="false">
    <p>displayValue: {{ displayValue }}</p>
    <p>firstValue: {{ firstValue }}, secondValue: {{ secondValue }}</p>
    <p>operator: {{ operator }}, shouldReset: {{ shouldReset }}</p>
  </div>
  <div class="calculator">
    <div class="display">{{ displayValue }}</div>
    <div class="display">{{ displayValue }}</div>
    <div class="buttons">
      <div class="button top-row clear" @click="handleClearClick">AC</div>
      <div class="button top-row invert" @click="handleOperatorClick('invert')">+/-</div>
      <div class="button top-row percentage" @click="handleOperatorClick('%')">%</div>
      <div class="button right-row division" @click="handleOperatorClick('÷')">÷</div>
      <div class="button right-row multiplication" @click="handleOperatorClick('×')">×</div>
      <div class="button right-row subtraction" @click="handleOperatorClick('-')">-</div>
      <div class="button right-row addition" @click="handleOperatorClick('+')">+</div>
      <div class="button right-row equals" @click="calculate()">=</div>
      <div class="button comma" @click="handleCommaClick">,</div>
      <div class="button zero" @click="handleNumberClick('0')">0</div>
      <div class="button one" @click="handleNumberClick('1')">1</div>
      <div class="button two" @click="handleNumberClick('2')">2</div>
      <div class="button three" @click="handleNumberClick('3')">3</div>
      <div class="button four" @click="handleNumberClick('4')">4</div>
      <div class="button five" @click="handleNumberClick('5')">5</div>
      <div class="button six" @click="handleNumberClick('6')">6</div>
      <div class="button seven" @click="handleNumberClick('7')">7</div>
      <div class="button eight" @click="handleNumberClick('8')">8</div>
      <div class="button nine" @click="handleNumberClick('9')">9</div>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  display: grid;
  grid-template-rows: 8em 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'display'
    'buttons';
  gap: 1rem;
}

.display {
  grid-area: display;
  color: white;
  font-size: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 1rem;
  max-width: 429.5px;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  grid-template-areas:
    'clear invert percentage division'
    'seven eight nine multiplication'
    'four five six subtraction'
    'one two three addition'
    'zero zero comma equals';
  grid-area: buttons;
}

.button {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: #fff;
  background-color: #333;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #333;
  }
}

.right-row {
  background-color: #ff9f0a;
  &:hover {
    background-color: #fff;
    color: #ff9f0a;
  }
}

.top-row {
  background-color: #a5a5a5;
  color: #000;
  &:hover {
    background-color: #000;
    color: #a5a5a5;
  }
}

.zero {
  grid-area: zero;
  aspect-ratio: 2/1;
  border-radius: 25%/50%;
}

.clear {
  grid-area: clear;
}
.invert {
  grid-area: invert;
}
.percentage {
  grid-area: percentage;
}
.division {
  grid-area: division;
}
.multiplication {
  grid-area: multiplication;
}
.subtraction {
  grid-area: subtraction;
}
.addition {
  grid-area: addition;
}
.equals {
  grid-area: equals;
}
.comma {
  grid-area: comma;
}
.one {
  grid-area: one;
}
.two {
  grid-area: two;
}
.three {
  grid-area: three;
}
.four {
  grid-area: four;
}
.five {
  grid-area: five;
}
.six {
  grid-area: six;
}
.seven {
  grid-area: seven;
}
.eight {
  grid-area: eight;
}
.nine {
  grid-area: nine;
}
</style>
