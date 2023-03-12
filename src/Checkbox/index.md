# Checkbox

复选框组件。

## 基本用法

通过`defaultChecked`、`checked`控制是否勾选，勾选状态改变时触发`onChange`函数。

```jsx
import { Checkbox } from 'tyro-design';

export default () => (
  <>
    <Checkbox
      defaultChecked={true}
      onChange={(checked) => alert(`uncontrolled: ${checked}`)}
    >
      非受控
    </Checkbox>
    <Checkbox
      checked={true}
      onChange={(checked) => alert(`controlled: ${checked}`)}
      style={{ marginTop: 10 }}
    >
      受控
    </Checkbox>
  </>
);
```

## 禁用

通过`disabled`禁用 Checkbox。

```jsx
import { Checkbox } from 'tyro-design';

export default () => (
  <>
    <Checkbox disabled>未选中禁用</Checkbox>
    <Checkbox checked style={{ marginTop: 10 }} disabled>
      选中禁用
    </Checkbox>
  </>
);
```

## API

| 属性             | 说明                   | 类型                         | 默认值  |
| :--------------- | :--------------------- | :--------------------------- | :------ |
| `defaultChecked` | 默认是否选中（非受控） | `boolean`                    | `false` |
| `checked`        | 是否选中（受控）       | `boolean`                    |         |
| `onChange`       | 勾选状态变化回调函数   | `(checked: boolean) => void` |         |
| `disabled`       | 是否禁用               | `boolean`                    | `false` |
