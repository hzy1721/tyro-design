---
group:
  title: 输入类
  order: 2
---

# Button

按钮组件。

## 基本用法

支持 3 种主题：

- 浅色`light` (默认)
- 深色`solid`
- 无边框`borderless`

支持 5 种类型：

- 主按钮`primary` (默认)
- 次要按钮`secondary`
- 第三按钮`tertiary`
- 警告按钮`warning`
- 危险按钮`danger`

支持 3 种尺寸：

- 默认`default`
- 小`small`
- 大`large`

```jsx
import { Space, Button } from 'tyro-design';

export default () => (
  <Space vertical align="start">
    <Space>
      <Button>主按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="tertiary">第三按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </Space>
    <Space>
      <Button theme="solid">主按钮</Button>
      <Button theme="solid" type="secondary">
        次要按钮
      </Button>
      <Button theme="solid" type="tertiary">
        第三按钮
      </Button>
      <Button theme="solid" type="warning">
        警告按钮
      </Button>
      <Button theme="solid" type="danger">
        危险按钮
      </Button>
    </Space>
    <Space>
      <Button theme="borderless">主按钮</Button>
      <Button theme="borderless" type="secondary">
        次要按钮
      </Button>
      <Button theme="borderless" type="tertiary">
        第三按钮
      </Button>
      <Button theme="borderless" type="warning">
        警告按钮
      </Button>
      <Button theme="borderless" type="danger">
        危险按钮
      </Button>
    </Space>
    <Space>
      <Button size="small">主按钮</Button>
      <Button size="small" type="secondary">
        次要按钮
      </Button>
      <Button size="small" type="tertiary">
        第三按钮
      </Button>
      <Button size="small" type="warning">
        警告按钮
      </Button>
      <Button size="small" type="danger">
        危险按钮
      </Button>
    </Space>
    <Space>
      <Button size="large">主按钮</Button>
      <Button size="large" type="secondary">
        次要按钮
      </Button>
      <Button size="large" type="tertiary">
        第三按钮
      </Button>
      <Button size="large" type="warning">
        警告按钮
      </Button>
      <Button size="large" type="danger">
        危险按钮
      </Button>
    </Space>
  </Space>
);
```

## API

| 属性      | 说明         | 类型                              | 默认值      |
| :-------- | :----------- | :-------------------------------- | :---------- |
| `theme`   | 按钮主题     | `string`                          | `'light'`   |
| `type`    | 按钮类型     | `string`                          | `'primary'` |
| `size`    | 按钮尺寸     | `'default' \| 'small' \| 'large'` | `'default'` |
| `icon`    | 按钮图标     | `ReactNode`                       |             |
| `onClick` | 点击回调函数 | `MouseEventHandler`               |             |
