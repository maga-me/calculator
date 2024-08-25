// stores/calculatorStore.js
import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    currentInput: '',
    result: '',
    history: []
  }),
  actions: {
    appendInput(value) {
      this.currentInput += value;
    },
    clearInput() {
      this.currentInput = '';
      this.result = '';
    },
    calculateResult() {
      try {
        this.result = eval(this.currentInput);
      } catch (error) {
          this.result = error.message;
      }
    },
    addToHistory() {
      this.history.push(this.currentInput + " = " + this.result)
    },
    setInput(value) {
      this.currentInput = value;
    },
    delite() {
      this.currentInput = this.currentInput.slice(0, -1)
    },
    changeLastSym(value) {
      this.currentInput = this.currentInput.slice(0, -1) + value;

    }
  },
});
