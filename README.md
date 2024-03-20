# 这是Vue-manage-system模版 我正在边学习边添加新的知识上去！

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









问题：
1. update:modelValue是v-model推荐写法，如果同时有model和propsemit会不兼容