---
group:
  title: 数据展示
---

# Popover

气泡卡片组件。

## 基本用法

被包裹的元素必须为可以获取到`ref`的类型，比如不能是文本节点。

支持两种弹出模式：`hover`和`click`。

```jsx
import { Space, Popover, Button } from 'tyro-design';

export default () => (
  <>
    <Space>
      <Popover content={<div>弹出层内容</div>}>
        <Button>hover to show</Button>
      </Popover>
      <Popover trigger="click" content={<div>弹出层内容</div>}>
        <Button>click to show</Button>
      </Popover>
    </Space>
  </>
);
```

## 弹出位置

支持 12 种弹出位置。

```jsx
import { Space, Popover, Button } from 'tyro-design';

const placeholder = (
  <div>
    你好
    <br />
    欢迎使用 tyro-design
    <br />
    这个弹出层内容一共有三行
  </div>
);

export default () => (
  <>
    <Space style={{ marginLeft: 120 }}>
      {['topLeft', 'top', 'topRight'].map((pos) => (
        <Popover position={pos} content={placeholder} key={pos}>
          <Button style={{ width: 110 }} key={pos}>
            {pos}
          </Button>
        </Popover>
      ))}
    </Space>
    <div style={{ marginTop: 10 }}>
      <Space direction="vertical">
        {['leftTop', 'left', 'leftBottom'].map((pos) => (
          <Popover position={pos} content={placeholder} key={pos}>
            <Button style={{ width: 110 }} key={pos}>
              {pos}
            </Button>
          </Popover>
        ))}
      </Space>
      <Space direction="vertical" style={{ marginLeft: 382 }}>
        {['rightTop', 'right', 'rightBottom'].map((pos) => (
          <Popover position={pos} content={placeholder} key={pos}>
            <Button style={{ width: 110 }} key={pos}>
              {pos}
            </Button>
          </Popover>
        ))}
      </Space>
    </div>
    <Space style={{ marginLeft: 120, marginTop: 10 }}>
      {['bottomLeft', 'bottom', 'bottomRight'].map((pos) => (
        <Popover position={pos} content={placeholder} key={pos}>
          <Button style={{ width: 110 }} key={pos}>
            {pos}
          </Button>
        </Popover>
      ))}
    </Space>
  </>
);
```

## API

| 属性       | 说明                   | 类型                                                                                                                                                             | 默认值     |
| :--------- | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `children` | 需要添加弹出效果的元素 | `ReactNode`                                                                                                                                                      |            |
| `trigger`  | 触发方式               | `'hover' \| 'click'`                                                                                                                                             | `'hover'`  |
| `position` | 弹出方向               | `'topLeft' \| 'top' \| 'topRight' \| 'leftTop' \| 'left' \| 'leftBottom' \| 'rightTop' \| 'right' \| 'rightBottom' \| 'bottomLeft' \| 'bottom' \| 'bottomRight'` | `'bottom'` |
| `content`  | 显示的内容             | `ReactNode`                                                                                                                                                      |            |
