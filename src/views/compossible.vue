<template>
  <div>
    <div>
      <h2>Transition</h2>
      <button @click="show = !show">toggle</button>
      <Transition>
        <p v-show="show">
          {{ $translate('greeting.hello') }}
          Mouse position is at {{ x }}, {{ y }}
        </p>
      </Transition>
    </div>
    <div>
      <h2>KeepAlive</h2>
      <label><input type="radio" v-model="current" :value="Add" /> A</label>
      <label><input type="radio" v-model="current" :value="InputComponent" /> B</label>
      <KeepAlive include="add" :max="10">
        <component :is="current"></component>
      </KeepAlive>
    </div>
    <dir>
      <div class="outer">
        <h2>Vue Teleport Example</h2>
        <div>
          <MyModal />
        </div>
      </div>
    </dir>
  </div>
</template>

<script setup lang="ts">
import { ref, Transition } from 'vue'
import { storeToRefs } from 'pinia'
import { useMouse } from '../utils/mouse'
import Add from '../components/add.vue'
import InputComponent from '../components/input.vue'
import { useMineStore } from '../store/mine'

const mineStore = useMineStore()
console.log(mineStore.count)

//store是reactive包裹的 不需要.value
//不能解构 破坏响应性 ❌const {count} = mineStore

//可以用storeToRefs解构
//const {getCount} = storeToRefs(mineStore)
const { x, y } = useMouse()

const show = ref(true)
const current = ref()

</script>

<style>
    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s ease;
    }
  
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
</style>
