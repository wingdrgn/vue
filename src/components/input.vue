<template>
  <div>
    message is {{ message }}
    <input type="text" @input="updateMessage">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const updateMessage = (e: Event) => {
  message.value = (e.target as HTMLInputElement).value
}

</script>
