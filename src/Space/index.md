# Space

间距组件。

## 基本用法

```jsx
import { Space, Button } from 'tyro-design';

export default () => (
  <Space>
    <Button>主按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </Space>
);
```

## 排列方向

设置`vertical`表示纵向排列（默认横向）。

```jsx
import { Space, Button } from 'tyro-design';

export default () => (
  <Space vertical>
    <Button>主按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </Space>
);
```

## 对齐方式

使用`align`设置对齐方式，支持`start`、`end`、`center`（默认）、`baseline`。

```jsx
import { Space, Button } from 'tyro-design';

export default () => (
  <Space vertical align="start" spacing="medium">
    <div>
      <Space align="start">
        <Button>主按钮</Button>
        <Button type="secondary" style={{ height: 60 }}>
          次要按钮
        </Button>
        <Button type="tertiary" style={{ height: 100 }}>
          第三按钮
        </Button>
      </Space>
    </div>
    <div>
      <Space>
        <Button>主按钮</Button>
        <Button type="secondary" style={{ height: 60 }}>
          次要按钮
        </Button>
        <Button type="tertiary" style={{ height: 100 }}>
          第三按钮
        </Button>
      </Space>
    </div>
    <div>
      <Space align="end">
        <Button>主按钮</Button>
        <Button type="secondary" style={{ height: 60 }}>
          次要按钮
        </Button>
        <Button type="tertiary" style={{ height: 100 }}>
          第三按钮
        </Button>
      </Space>
    </div>
    <div>
      <Space align="baseline">
        <Button>主按钮</Button>
        <Button type="secondary" style={{ height: 60 }}>
          次要按钮
        </Button>
        <Button type="tertiary" style={{ height: 100 }}>
          第三按钮
        </Button>
      </Space>
    </div>
  </Space>
);
```

## 间距尺寸

使用`spacing`设置间距大小，支持`tight`（8px，默认）、`medium`（16px）、`loose`（24px）和数值。

```jsx
import { Space, Button } from 'tyro-design';

export default () => (
  <Space vertical align="start" spacing="medium">
    <div>
      <Space>
        <Button>主按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="tertiary">第三按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </Space>
    </div>
    <div>
      <Space spacing="medium">
        <Button>主按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="tertiary">第三按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </Space>
    </div>
    <div>
      <Space spacing="loose">
        <Button>主按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="tertiary">第三按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </Space>
    </div>
    <div>
      <Space spacing={40}>
        <Button>主按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="tertiary">第三按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </Space>
    </div>
  </Space>
);
```

## API

| 属性       | 说明         | 类型                 | 默认值     |
| :--------- | :----------- | :------------------- | :--------- |
| `vertical` | 是否垂直排列 | `boolean`            | `false`    |
| `align`    | 对齐方式     | `string`             | `'center'` |
| `spacing`  | 间距大小     | `string   \| number` | `'tight'`  |
