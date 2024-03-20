<template>
    <div>
      <addButton v-bind="addButtonPost" @change-number="changeNumberCallback"/>
    </div>
</template>

<script setup lang="ts" name="import">
import { ref } from 'vue'
const addButtonPost = ref({
  sym: true,
  obj: {
    num:0
  }
})

const changeNumberCallback = (addNum) => {
  addButtonPost.value.obj.num += addNum
}
</script>

<style scoped>

</style>
