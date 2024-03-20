<template>
	<div class="tags">
		<ElButton @click="localNumberPlus">
      {{localSym}}
    </ElButton>
    {{ localNumber }}
	</div>
  <div>
    <ElButton @click="buttonClick">{{localSym}}</ElButton>
    number from above is: {{ props.obj.num }}
  </div>
  <div>
    <input v-model="todoItemModel"/>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ref, computed } from 'vue';
// const props = defineProps(['sym'])
// defineProps({
//   sym: Boolean
// })
interface addButtonObj {
  num: number
}
const props = defineProps<{
  sym?: boolean,
  obj?: addButtonObj
}>()

const localSym = computed(() => props.sym ? '+' : '-')

const localNumber = ref(props.obj.num)
const localNumberPlus = () => {
  localNumber.value++
}

const emit = defineEmits(['update:changeNumber'])
const buttonClick = () => {
  emit('update:changeNumber', 6)
}

const [todoItemModel, modifiers] = defineModel('todo', {
  default: '',
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

console.log(modifiers)

</script>

<style>

</style>
