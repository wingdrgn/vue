<template>
	<div class="tags">
		<ElButton @click="localNumberPlus">
      {{localSym}}
    </ElButton>
    {{ localNumber }}
	</div>
  <div>
    <ElButton @click="$emit('changeNumber', 6)">{{localSym}}</ElButton>
    number from above is: {{ props.obj.num }}
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

// const emit = defineEmits(['changeNumber'])
// const buttonClick = () => {
//   emit('changeNumber', 6)
// }

</script>

<style>

</style>
