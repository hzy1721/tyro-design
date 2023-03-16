# InputNumber

数字输入框组件。

## 基本用法

```jsx
import { InputNumber } from 'tyro-design';

export default () => <InputNumber defaultValue={123} onChange={alert} />;
```

## API

| 属性           | 说明                 | 类型                      | 默认值 |
| :------------- | :------------------- | :------------------------ | :----- |
| `defaultValue` | 初始值               | `number`                  |        |
| `value`        | 受控值               | `number`                  |        |
| `onChange`     | 值变化的回调函数     | `(value: number) => void` |        |
| `onBlur`       | 失去焦点时的回调函数 | `(value: number) => void` |        |
| `onEnterPress` | 按下回车时的回调函数 | `(value: number) => void` |        |
