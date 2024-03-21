<template>
  <div>
    {{ $translate('greeting.hello')}}
    Mouse position is at {{ x }}, {{ y }}
  </div> 
</template>

<script setup lang="ts">
import { useMouse } from '../utils/mouse'

const {x, y} = useMouse()

</script>
