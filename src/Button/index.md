# Button

按钮组件。

## 基本用法

支持 5 种类型：

- 主按钮`primary`（默认）
- 次要按钮`secondary`
- 第三按钮`tertiary`
- 警告按钮`warning`
- 危险按钮`danger`

```jsx
import { Button } from 'tyro-design';

export default () => (
  <>
    <Button>主按钮</Button>
    <Button type="secondary" style={{ marginLeft: 5 }}>
      次要按钮
    </Button>
    <Button type="tertiary" style={{ marginLeft: 5 }}>
      第三按钮
    </Button>
    <Button type="warning" style={{ marginLeft: 5 }}>
      警告按钮
    </Button>
    <Button type="danger" style={{ marginLeft: 5 }}>
      危险按钮
    </Button>
  </>
);
```

## API

| 属性      | 说明         | 类型                | 默认值      |
| :-------- | :----------- | :------------------ | :---------- |
| `type`    | 按钮类型     | `string`            | `'primary'` |
| `onClick` | 点击回调函数 | `MouseEventHandler` |             |
