# Pagination

分页组件。

## 基本用法

通过`total`设置数据总条数、`pageSize`设置每页条数。

- 受控：页码完全由`currentPage`决定
- 非受控：通过`defaultCurrentPage`设置初始页码，用户操作改变页码

```jsx
import { Space, Pagination } from 'tyro-design';
import { useState } from 'react';

export default () => {
  return (
    <Space vertical align="start" spacing="medium">
      <Pagination total={50} />
      <Pagination total={80} />
      <Pagination total={100} />
    </Space>
  );
};
```

## 显示详细信息

传入`showTotal`显示总页数、`showDetail`显示当前条数和总条数。

```jsx
import { Pagination } from 'tyro-design';

export default () => (
  <>
    <Pagination total={48} showTotal />
    <Pagination total={48} showDetail style={{ marginTop: 24 }} />
  </>
);
```

## 页容量切换

传入`showSizeChanger`显示切换页容量的 Select。

- 通过`pageSizeOpts`指定可供切换的页容量选项（默认是`[10, 20, 40, 100]`）
- 通过`onPageSizeChange`指定页容量变化的回调函数
- 通过`onChange`指定页码或页容量变化的回调函数

```jsx
import { Pagination } from 'tyro-design';

export default () => <Pagination total={50} showDetail showSizeChanger />;
```

## 快速跳转

传入`showQuickJumper`显示快速跳转页码的输入框。

- 输入页码后按回车或使输入框失去焦点即可触发跳转
- 如果输入的页码超出有效范围，则会进行截断

```jsx
import { Pagination } from 'tyro-design';

export default () => <Pagination total={200} showQuickJumper />;
```

## 迷你版本

设置`size`为`'small'`开启迷你版本。

```jsx
import { Pagination } from 'tyro-design';

export default () => <Pagination total={100} size="small" />;
```

## API

| 属性                 | 说明                        | 类型                                              | 默认值              |
| :------------------- | :-------------------------- | :------------------------------------------------ | :------------------ |
| `total`              | 总条数                      | `number`                                          | `1`                 |
| `pageSize`           | 每页条数                    | `number`                                          | `10`                |
| `currentPage`        | 当前页码                    | `number`                                          |                     |
| `defaultCurrentPage` | 默认的当前页码              | `number`                                          | `1`                 |
| `onPageChange`       | 页码变化的回调函数          | `(currentPage: number) => void`                   |                     |
| `showTotal`          | 是否显示总页数              | `boolean`                                         | `false`             |
| `showDetail`         | 是否显示详细信息            | `boolean`                                         | `false`             |
| `showSizeChanger`    | 是否显示页容量切换的 Select | `boolean`                                         | `false`             |
| `pageSizeOpts`       | 页容量选项                  | `number[]`                                        | `[10, 20, 40, 100]` |
| `onPageSizeChange`   | 页容量变化的回调函数        | `(pageSize: number) => void`                      |                     |
| `onChange`           | 页码或页容量变化的回调函数  | `(currentPage: number, pageSize: number) => void` |                     |
| `showQuickJumper`    | 是否显示快速跳转            | `boolean`                                         | `false`             |
| `size`               | 尺寸                        | `'small'`                                         |                     |
