<template>
    <div>
      <addButton v-bind="addButtonPost"/>
    </div>
</template>

<script setup lang="ts" name="import">
const addButtonPost = {
  sym: true,
  obj: {
    num:0
  }
}
</script>

<style scoped>

</style>
