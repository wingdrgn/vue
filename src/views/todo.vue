<template>
    <div>
      <addButton 
      class="addButton"
      v-bind="addButtonPost" @change-number="changeNumberCallback"
      v-model:todo.capitalize="currentTodoItem">
      <template #header="{message}">
        {{ message }}
      </template>
      <template #footer>
        {{ currentTodoItem }}
      </template>
      </addButton>
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
