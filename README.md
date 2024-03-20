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
