---
group:
  title: 输入类
  order: 2
---

# Radio

单选框组件。

## 基本用法

```jsx
import { Space, Radio } from 'tyro-design';

export default () => {
  return (
    <Space vertical align="start">
      <Radio name="单选框" />
      <Radio name="禁用" disabled />
      <Radio name="禁用" disabled checked />
    </Space>
  );
};
```

## API

| 属性             | 说明                   | 类型                         | 默认值  |
| :--------------- | :--------------------- | :--------------------------- | :------ |
| `defaultChecked` | 默认是否选中（非受控） | `boolean`                    | `false` |
| `checked`        | 是否选中（受控）       | `boolean`                    |         |
| `onChange`       | 勾选状态变化回调函数   | `(checked: boolean) => void` |         |
| `disabled`       | 是否禁用               | `boolean`                    | `false` |
