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