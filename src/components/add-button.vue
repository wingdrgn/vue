<template>
  <div>
      <slot name="header" message="hello"></slot>
    </div>
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

  <slot name="footer">footer</slot>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
import { ElButton } from 'element-plus';
import { ref, computed, useAttrs, inject } from 'vue';
const { helloMessage, updateMessage } = inject('helloMessage', {} as helloMessage)
// const props = defineProps(['sym'])
// defineProps({
//   sym: Boolean
// })
const attrs = useAttrs()
console.log(attrs)
interface addButtonObj {
  num: number
}
interface helloMessage {
  helloMessage: string,
  updateMessage: () => {}
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

const emit = defineEmits(['changeNumber'])
const buttonClick = () => {
  emit('changeNumber', 6)
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
