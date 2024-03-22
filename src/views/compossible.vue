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
  </div>
</template>

<script setup lang="ts">
import {ref, Transition} from 'vue'
import { useMouse } from '../utils/mouse'
import Add from '../components/add.vue'
import InputComponent from '../components/input.vue'

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
