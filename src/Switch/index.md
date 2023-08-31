---
group:
  title: 输入类
  order: 2
---

# Switch

开关组件。

## 基本用法

```jsx
import { Switch } from 'tyro-design';

export default () => {
  return <Switch />;
};
```

## API

| 属性             | 说明                   | 类型                         | 默认值  |
| :--------------- | :--------------------- | :--------------------------- | :------ |
| `defaultChecked` | 默认是否选中（非受控） | `boolean`                    | `false` |
| `checked`        | 是否选中（受控）       | `boolean`                    |         |
| `onChange`       | 选中状态变化回调函数   | `(checked: boolean) => void` |         |
