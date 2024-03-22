<template>
  <div>
    amount is {{count}}
    <button @click="countPlus">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('it is active')
})

onDeactivated(() => {
  console.log('it is deactive')
})

const count = ref(0)

const countPlus = () => {
  count.value++
}

</script>
