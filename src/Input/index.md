# Input

输入框组件。

## 基本用法

```jsx
import { Input } from 'tyro-design';

export default () => <Input defaultValue="React" />;
```

## API

| 属性           | 说明                   | 类型                      | 默认值   |
| :------------- | :--------------------- | :------------------------ | :------- |
| `type`         | input 标签的 type 属性 | `HTMLInputTypeAttribute`  | `'text'` |
| `defaultValue` | 初始值                 | `string`                  |          |
| `value`        | 受控值                 | `string`                  |          |
| `onChange`     | 值变化的回调函数       | `(value: string) => void` |          |
| `onBlur`       | 失去焦点时的回调函数   | `(value: string) => void` |          |
| `onEnterPress` | 按下回车时的回调函数   | `(value: string) => void` |          |
