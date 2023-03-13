# Dropdown

下拉菜单组件。

## 基本用法

通过`menu`指定菜单项的配置。

```jsx
import { Dropdown, Button } from 'tyro-design';

export default () => (
  <Dropdown
    menu={[
      { name: 'Menu Item 1', onClick: () => alert('Menu Item 1') },
      { name: 'Menu Item 2', onClick: () => alert('Menu Item 2') },
      { name: 'Menu Item 3', onClick: () => alert('Menu Item 3') },
    ]}
  >
    <Button>悬停显示</Button>
  </Dropdown>
);
```

## API

| 属性       | 说明                   | 类型                                                                                                                                                             | 默认值     |
| :--------- | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `menu`     | 菜单项配置数组         | `DropdownMenuItem[]`                                                                                                                                             | `[]`       |
| `children` | 需要添加弹出效果的元素 | `ReactNode`                                                                                                                                                      |            |
| `trigger`  | 触发方式               | `'hover' \| 'click'`                                                                                                                                             | `'hover'`  |
| `position` | 弹出方向               | `'topLeft' \| 'top' \| 'topRight' \| 'leftTop' \| 'left' \| 'leftBottom' \| 'rightTop' \| 'right' \| 'rightBottom' \| 'bottomLeft' \| 'bottom' \| 'bottomRight'` | `'bottom'` |

### DropdownMenuItem

| 属性      | 说明             | 类型                | 默认值 |
| :-------- | :--------------- | :------------------ | :----- |
| `name`    | 名称             | `string`            |        |
| `onClick` | 点击事件回调函数 | `MouseEventHandler` |        |
