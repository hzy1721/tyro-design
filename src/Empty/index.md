---
group:
  title: 展示类
  order: 4
---

# Empty

空状态组件。

## 基本用法

可分别设置图片`image`、标题`title`、描述`description`、自定义内容`children`，默认从上至下排列。

图片可以是链接字符串或`ReactNode`。

```jsx
import { Empty, Space, Button } from 'tyro-design';

export default () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    title="暂无数据"
    description="请检查网络连接"
  >
    <Space>
      <Button type="primary">反馈问题</Button>
      <Button type="primary" status="danger">
        发起投诉
      </Button>
    </Space>
  </Empty>
);
```

## 水平布局

设置`layout`为`horizontal`开启水平布局，适用于内容比较长的情景。

```jsx
import { Empty, Space, Button } from 'tyro-design';

export default () => (
  <Empty
    image={
      <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" />
    }
    title="暂无数据"
    description="这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。这是一段很长的描述文本，当文本过长的时候推荐使用这种布局形式。"
    layout="horizontal"
  >
    <Space>
      <Button type="primary">反馈问题</Button>
      <Button type="primary" status="danger">
        发起投诉
      </Button>
    </Space>
  </Empty>
);
```

## 内置图片

组件自带两张图片，可以通过`Empty.PRESENTED_IMAGE_DEFAULT`和`Empty.PRESENTED_IMAGE_SIMPLE`使用。

```jsx
import { Empty } from 'tyro-design';

export default () => (
  <Empty
    image={<img src={Empty.PRESENTED_IMAGE_DEFAULT} style={{ height: 100 }} />}
    description="暂无数据"
  />
);
```

```jsx
import { Empty } from 'tyro-design';

export default () => (
  <Empty
    image={<img src={Empty.PRESENTED_IMAGE_SIMPLE} />}
    description="暂无数据"
  />
);
```

## API

| 属性          | 说明       | 类型                         | 默认值       |
| :------------ | :--------- | :--------------------------- | :----------- |
| `image`       | 占位图     | `string     \| ReactNode`    |              |
| `title`       | 标题       | `ReactNode`                  |              |
| `description` | 内容描述   | `ReactNode`                  |              |
| `children`    | 自定义内容 | `ReactNode`                  |              |
| `layout`      | 布局方式   | `'vertical' \| 'horizontal'` | `'vertical'` |
