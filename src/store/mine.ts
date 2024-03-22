import { defineStore } from "pinia";
import {ref, computed} from 'vue'

// export const useMineStore = defineStore('mine', {
//   state: () => ({
//     count: 0
//   }),
//   getters: {
//     getCount: (state) => state.count
//   },
//   actions: {
//     increment() {
//       this.count++
//     }
//   }
// })

export const useMineStore = defineStore('mine', () => {
  const count = ref(0)
  const getCount = computed(() => count.value)
  const increment = () => {
    count.value++
  }

  return {count, getCount, increment}
})