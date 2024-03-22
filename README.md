# 这是Vue-manage-system模版 我正在边学习边添加新的知识

## 全局组件
在main文件中
```js
import addButton from './components/add-button.vue'
app.component('addButton', addButton)
```
缺点：
1. 不利于treeshaking
2. 依赖关系不明确

## Props
驼峰命名props
使用对象绑定多个属性
```js
<addButton v-bind="addButtonPost"/>
const addButtonPost = {
  sym: true,
  obj: {
    num:0
  }
}
//<addButton :sym="addButtonPost.sym" :obj="addButtonPost.obj"/>
```
单向数据流
**子组件能改变props的对象 js特性**
```js
//改变props 用ref或computed
const localSym = computed(() => props.sym ? '+' : '-')
const localNumber = ref(props.obj.num)
```

## 事件
子组件可以用@发布自定义事件
```js
<ElButton @click="$emit('changeNumber', 6)">{{localSym}}</ElButton>
```
父组件监听
```js
<addButton v-bind="addButtonPost" @change-number="changeNumberCallback"/>
```
参数
```js
const changeNumberCallback = (addNum) => {
  addButtonPost.value.obj.num += addNum
}
```
声明事件
**$emit不能在template中使用**
```js
const emit = defineEmits(['changeNumber'])
const buttonClick = () => {
  emit('changeNumber', 6)
}
```

## v-model
推荐使用defineModel
```js
<addButton v-bind="addButtonPost" @change-number="changeNumberCallback"
v-model="currentTodoItem"/>
//child
const todoItemModel = defineModel({ default: '' })
```
等价于
```js
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

 <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
```

v-model参数
```js
v-model:todo="currentTodoItem"

const todoItemModel = defineModel('todo',{ default: '' })
```

model modifier
```js
v-model:todo.capitalize="currentTodoItem"

const [todoItemModel, modifiers] = defineModel('todo', {
  default: '',
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
```

## fallthrough
是传递给组件的属性或监听器 但未在props显式声明 例如class，style等

```js
<MyButton @click="onClick" />
// 监听click器将被添加到 的根元素<MyButton>，即本机<button>元素。当点击native时<button>，会触发onClick父组件的方法。如果本机<button>已经有一个click与 绑定的侦听器v-on，则两个侦听器都会触发
```
嵌套组件转发属性不包括props，或v-on

禁用属性继承
```js
defineOptions({
  inheritAttrs: false
})
```

\$attrs
可以在模版通过$attrs获取所有fallthrough属性
如果有多个跟节点，则需要显式绑定&attrs
```js
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

js中访问fallthrough
```js
import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs)
//包括未使用的
//Proxy(Object) {class: 'addButton', aaa: 1, __vInternal: 1}
```

## slot
组件可以接受js的props、模版内容要通过slot渲染
包括：文本，元素，其他组件
```js
<addButton>
  <h1>this is a slot</h1>//slot
</addButton>

<slot></slot>//等于
<h1>this is a slot</h1>
```

默认内容
```js
<slot name="footer">footer</slot>
```

具名slot
```js
//没有name 默认是default
<template #footer>
  //<template v-slot:footer>
  {{ currentTodoItem }}
</template>
//动态slot
<template #[dynamicSlotName]>

<slot name="footer">footer</slot>
```

范围slot
槽内容访问子组件属性
```js
//child template
<slot name="header" message="hello"></slot>

<template #header="{message}">
  {{ message }}
</template>
```


## provide inject
```js
provide(/* key */'message', /* value */'hello')
//key可以是string或者symbol
//value可以是任意类型

const helloMessage = inject('helloMessage', 'default hello')
```

更新provide数据
provide提供更新函数
```js
provide(/* key */'helloMessage', /* value */{
  helloMessage,
  updateMessage
})

const { helloMessage, updateMessage } = inject('helloMessage', {} as helloMessage)
interface helloMessage {
  helloMessage: string,
  updateMessage: () => {}
}
```

异步组件
需要时才加载，提高初始化速度
```js
const AsyncComp = defineAsyncComponent(() =>
  //defineAsyncComponent接受一个返回 Promise 的加载器函数
  import('./components/MyComponent.vue')
)
```

## Composables
类似于react hook

如果有参数，变化需要重新use 用ref
```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// this should trigger a re-fetch
url.value = '/new-url'
```
或者用getter函数
```js
const { data, error } = useFetch(() => `/posts/${props.id}`)
```


## 定制指令
v开头驼峰命名
```js
const vFocus = {
  mounted: (el) => el.focus()
}
```

参数
```js
mounted(el, binding, vnode, prevVnode) {}
//el 元素
//binding{args, modifiers, value, oldValue}
```


## plugin
plugin用于添加程序级功能
```js
app.use(myPlugin, {
  //options
})

const myPlugin = {
  install(app, options) {
    // configure the app
     app.config.globalProperties.$translate = () => {

     }
  }
}
```

## transition
元素进入或离开时的动画，**仅支持单个根元素**
```js
<Transition>
  <p v-if="show">hello</p>
</Transition>
```
```css
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
//active 用于定义过度时间，延迟，曲线
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

命名转换 通过name
```js
<Transition name="fade">
//[name]-enter-active
```


## keepalive
在component动态切换时存储实例
```js
<KeepAlive :max="10">
  <component :is="current"></component>
</KeepAlive>

import Add from '../components/add.vue'
import InputComponent from '../components/input.vue'
const current = ref(Add)
```
include/exclude 为其name属性 sfc的name为文件名
```js
<KeepAlive :max="10" include="add">
//add.vue
```

缓存实例的生命周期
onActivated, onDeactivated

## Teleport
将组件的一部分传到dom之外
```js
<Teleport to="body"></Teleport>
```



问题：
1. update:modelValue是v-model推荐写法，如果同时有model和propsemit会不兼容