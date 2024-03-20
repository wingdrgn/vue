<template>
    <div>
      <div>{{ currentTodoItem }}</div>

      <addButton 
      class="addButton"
      v-bind="addButtonPost" @change-number="changeNumberCallback"
      v-model:todo.capitalize="currentTodoItem"/>
    </div>
</template>

<script setup lang="ts" name="import">
import { ref } from 'vue'
const addButtonPost = ref({
  sym: true,
  obj: {
    num:0
  },
  aaa: 1
})
const currentTodoItem = ref('')

const changeNumberCallback = (addNum) => {
  addButtonPost.value.obj.num += addNum
}
</script>

<style scoped>
.addButton {
  text-align: center;
}
</style>
