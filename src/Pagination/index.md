---
group:
  title: 导航
---

# Pagination

分页组件。

## 基本用法

支持受控和非受控两种用法。

### 受控

```jsx
import { Pagination } from 'tyro-design';
import { useState } from 'react';

export default () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      total={100}
      pageSize={20}
      onPageChange={setPage}
      showTotal
    />
  );
};
```

### 非受控

```jsx
import { Pagination } from 'tyro-design';

export default () => (
  <Pagination
    total={100}
    onPageChange={console.log}
    defaultCurrentPage={2}
    showDetail
  />
);
```

## 迷你版本

设置`size`为`'small'`开启迷你版本。

```jsx
import { Pagination } from 'tyro-design';

export default () => <Pagination total={100} size="small" />;
```

## API

| 属性                 | 说明               | 类型                            | 默认值  |
| :------------------- | :----------------- | :------------------------------ | :------ |
| `total`              | 总条数             | `number`                        | `1`     |
| `pageSize`           | 每页条数           | `number`                        | `10`    |
| `currentPage`        | 当前页码           | `number`                        |         |
| `defaultCurrentPage` | 默认的当前页码     | `number`                        | `1`     |
| `onPageChange`       | 页码变化的回调函数 | `(currentPage: number) => void` |         |
| `showTotal`          | 是否显示总页数     | `boolean`                       | `false` |
| `showDetail`         | 是否显示详细信息   | `boolean`                       | `false` |
| `size`               | 尺寸               | `'small'`                       |         |
