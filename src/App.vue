<script setup>
import Header from './layouts/Header/Header.vue'
import Calculator from './components/Calculator/Calculator.vue'
</script>

<template>
  <Header />

  <main>
    <div class="container">
      <Calculator />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: calc(100vh - 94.55px);
  display: flex;
  place-items: center;
}
.container {
  display: flex;
  // background: #000;
  justify-content: center;
  // align-items: center;
}
</style>
