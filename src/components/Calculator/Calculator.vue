<script setup>
import { useCalculatorStore } from '@/stores/calculatorStore'
import { ref, watch, nextTick } from 'vue'

const calculatorStore = useCalculatorStore()
const currentInputRef = ref(null)
const resultElevation = ref(false)

function appendInput(value, type) {
  const lastInput = calculatorStore.currentInput[calculatorStore.currentInput.length - 1];

  if (type == 'sym') {
    // Prevent adding "*" or "/" at the beginning
    if (calculatorStore.currentInput.length === 0 && (value == "*" || value == "/")) {
      return;
    }

    if (!isNaN(Number(lastInput))) {
      // Append the symbol if the last input is a number
      calculatorStore.appendInput(value);
    } else if (value !== lastInput && (value == "+" || value == "-" || value == "*" || value == "/")) {
      // Replace the last symbol if it's different from the current one
      calculatorStore.changeLastSym(value);
    }
  } else {
    calculatorStore.appendInput(value);
  }

  scrollToEnd();
}


// function appendInput(value, type) {
//   const lastInput = calculatorStore.currentInput[calculatorStore.currentInput.length - 1]
//   const preLastInput = calculatorStore.currentInput[calculatorStore.currentInput.length - 2]

//   if (type === 'sym') {
//     if (!isNaN(Number(lastInput))) {
//       // Append the symbol if the last input is a number
//       calculatorStore.appendInput(value)
//     } else {
//       if (
//         value !== lastInput &&
//         (value === '+' || value === '-' || value === '*' || value === '/')
//       ) {
//         // Replace the last symbol if it's different from the current one
//         calculatorStore.changeLastSym(value)
//       } else if ((lastInput === '*' || lastInput === '/') && value === '-') {
//         calculatorStore.appendInput(value)
//       }
//     }

//     // Specifically allow "-" to be appended after "*" or "/"
//   } else {
//     // Ensure the first character is not a symbol
//     if (calculatorStore.currentInput.length === 0 && isNaN(Number(value))) {
//       return
//     }
//     calculatorStore.appendInput(value)
//   }

//   scrollToEnd()
// }

function clearInput() {
  calculatorStore.clearInput()
}

function calculateResult(type) {
  if (type == 'auto') {
    calculatorStore.calculateResult()
    resultElevation.value = false
  } else if (type == 'btn') {
    calculatorStore.calculateResult()
    resultElevation.value = true
    calculateResult.addToHistory()
  }
}

function delite() {
  calculatorStore.delite()
  scrollToEnd()
}

function scrollToEnd() {
  // Use nextTick to ensure the DOM is updated before scrolling
  nextTick(() => {
    const inputElement = currentInputRef.value
    inputElement.scrollLeft = inputElement.scrollWidth
  })
}

watch(
  () => calculatorStore.currentInput,
  () => {
    calculateResult('auto')
    scrollToEnd()
  }
)
</script>

<template>
  <div class="calculator">
    <div class="calculator__display">
      <div ref="currentInputRef" class="calculator__input" :class="{ notActive: resultElevation }">
        {{ calculatorStore.currentInput }}
      </div>
      <div class="calculator__result" :class="{ active: resultElevation }">
        {{ calculatorStore.result ? '=' : '' }} {{ calculatorStore.result }}
      </div>
    </div>

    <div class="calculator__controll">
      <div class="calculator__buttons">
        <button class="btn" @click="appendInput(`7`)">7</button>
        <button class="btn" @click="appendInput(`8`)">8</button>
        <button class="btn" @click="appendInput(`9`)">9</button>
        <button class="btn" @click="delite()">DEL</button>
        <button class="btn" @click="appendInput(`4`)">4</button>
        <button class="btn" @click="appendInput(`5`)">5</button>
        <button class="btn" @click="appendInput(`6`)">6</button>
        <button class="btn" @click="appendInput(`+`, 'sym')">+</button>
        <button class="btn" @click="appendInput(`1`)">1</button>
        <button class="btn" @click="appendInput(`2`)">2</button>
        <button class="btn" @click="appendInput(`3`)">3</button>
        <button class="btn" @click="appendInput(`-`, 'sym')">-</button>
        <button class="btn" @click="appendInput(`.`, 'sym')">.</button>
        <button class="btn" @click="appendInput(`0`)">0</button>
        <button class="btn" @click="appendInput(`/`, 'sym')">/</button>
        <button class="btn" @click="appendInput(`*`, 'sym')">*</button>
        <button class="btn reset" @click="clearInput()">C</button>
        <button class="btn equal" @click="calculateResult('btn')">=</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calculator {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__display {
    min-height: 130px;
    border-radius: 20px;
    background: #000435;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 25px;
    color: #dad7e0;
    gap: 20px;
  }

  &__input {
    font-size: 40px;
    overflow-x: auto;
    max-width: 100%;
    white-space: nowrap;
    transition: 300ms;

    &.notActive {
      font-size: 25px;
    }

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f141;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  &__result {
    font-size: 25px;
    color: #ffffff91;
    overflow-x: auto;
    max-width: 100%;
    white-space: nowrap;
    transition: 300ms;

    &.active {
      font-size: 40px;
    }

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f141;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  &__controll {
    background: #000435;
    border-radius: 20px;
    padding: 25px;
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .btn {
    background-color: #dad7e0;
    border: none;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.5em;
    color: #333b62;
    cursor: pointer;

    &:active {
      background-color: #b8b7c1;
    }
  }
  .reset {
    grid-column: span 2;
    background-color: #7a7dc2;
    color: #fff;
  }

  .equal {
    grid-column: span 2;
    background-color: #e05252;
    color: #fff;
  }
}
</style>
