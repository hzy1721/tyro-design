---
group:
  title: 展示类
  order: 4
---

# Dialog

对话框组件。

## 基本用法

```jsx
import { useState } from 'react';
import { Button, Dialog } from 'tyro-design';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示对话框</Button>
      <Dialog
        visible={visible}
        title="对话框标题"
        okProps={{ onClick: () => setVisible(false) }}
        cancelProps={{ onClick: () => setVisible(false) }}
        onClose={() => setVisible(false)}
      >
        对话框内容
      </Dialog>
    </>
  );
};
```

## API

| 属性           | 说明                                           | 类型                             | 默认值    |
| -------------- | ---------------------------------------------- | -------------------------------- | --------- |
| `title`        | 对话框标题                                     | `ReactElement`                   |           |
| `children`     | 对话框内容                                     | `ReactElement`                   |           |
| `footer`       | 对话框底部                                     | `ReactElement`                   |           |
| `okProps`      | 确认按钮属性                                   | `ButtonProps`                    |           |
| `cancelProps`  | 取消按钮属性                                   | `ButtonProps`                    |           |
| `closable`     | 是否可通过右上角关闭按钮关闭                   | `boolean`                        | `true`    |
| `maskClosable` | 是否可通过点击遮罩层关闭                       | `boolean`                        | `true`    |
| `visible`      | 是否显示对话框                                 | `boolean`                        | `false`   |
| `size`         | 对话框尺寸                                     | `'small' \| 'medium' \| 'large'` | `'small'` |
| `onClose`      | 点击右上角关闭按钮或点击遮罩层关闭时的回调函数 | `() => void`                     |           |
