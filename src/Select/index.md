# Select

下拉选择组件。

## 基本用法

使用`optionList`声明选项，包含`value`和`label`两个字段。

- 受控：指定`value`和`onChange`
- 非受控：指定`defaultValue`

```jsx
import { Select } from 'tyro-design';

export default () => (
  <Select
    optionList={[
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ]}
    defaultValue="react"
  />
);
```

## API

| 属性            | 说明             | 类型                                                      | 默认值         |
| :-------------- | :--------------- | :-------------------------------------------------------- | :------------- |
| `optionList`    | 选项列表         | `SelectOptionListItem[]`                                  | `[]`           |
| `defaultValue`  | 初始值           | `string`                                                  |                |
| `value`         | 受控值           | `string`                                                  |                |
| `onChange`      | 值变化的回调函数 | `(value: string) => void`                                 |                |
| `triggerRender` | 自定义触发器渲染 | `(visible: boolean, selectedLabel?: string) => ReactNode` |                |
| `position`      | 弹出位置         | `string`                                                  | `'bottomLeft'` |

### SelectOptionListItem

| 属性    | 说明     | 类型     | 默认值 |
| :------ | :------- | :------- | :----- |
| `value` | 选项值   | `string` |        |
| `label` | 选项文本 | `string` |        |
