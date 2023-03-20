---
group:
  title: 数据展示
---

# Tooltip

文字提示组件。

## 基本用法

与`Popover`的用法类似，区别是自带的样式不同，`Popover`是白色背景的卡片，`Tooltip`是黑色背景的气泡，更适合承载简单的说明文字。

同样支持 12 种弹出位置。

```jsx
import { Tooltip, Button } from 'tyro-design';

export default () => (
  <Tooltip content="提示文本">
    <Button>悬停以显示</Button>
  </Tooltip>
);
```

## API

| 属性       | 说明                   | 类型                                                                                                                                                             | 默认值     |
| :--------- | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `children` | 需要添加弹出效果的元素 | `ReactNode`                                                                                                                                                      |            |
| `trigger`  | 触发方式               | `'hover' \| 'click'`                                                                                                                                             | `'hover'`  |
| `position` | 弹出方向               | `'topLeft' \| 'top' \| 'topRight' \| 'leftTop' \| 'left' \| 'leftBottom' \| 'rightTop' \| 'right' \| 'rightBottom' \| 'bottomLeft' \| 'bottom' \| 'bottomRight'` | `'bottom'` |
| `content`  | 弹出层内容             | `ReactNode`                                                                                                                                                      |            |
