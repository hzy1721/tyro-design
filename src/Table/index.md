---
group:
  title: 数据展示
---

# Table

表格组件。

## 基本用法

使用`columns`表示列信息、`dataSource`表示原始数据。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'groupId',
    title: '队伍 ID',
    render: (value) => <span style={{ color: 'red' }}>{value}</span>,
  },
  {
    dataIndex: 'groupName',
    title: '队伍名称',
    align: 'center',
    render: (value) => `「${value}」`,
  },
  {
    dataIndex: 'groupMemberNum',
    title: '队伍人数',
    align: 'right',
  },
  {
    dataIndex: 'groupScore',
    title: '队伍成绩',
    align: 'left',
    render: (value) => {
      let res = String(value);
      if (value >= 90) {
        res += '（优秀）';
      } else if (value >= 85) {
        res += '（良好）';
      } else if (value >= 80) {
        res += '（中等）';
      }
      return res;
    },
    width: 400,
  },
];

const dataSource = [
  {
    key: '1',
    groupId: 1111,
    groupName: 'SSR 小队',
    groupMemberNum: 3,
    groupScore: 80,
  },
  {
    key: '2',
    groupId: 2222,
    groupName: '组件库小队',
    groupMemberNum: 4,
    groupScore: 85,
  },
  {
    key: '3',
    groupId: 3333,
    groupName: '可视化小队',
    groupMemberNum: 5,
    groupScore: 90,
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

### 性能优化

为每条数据提供一个`key`或通过`rowKey`指定主键属性，让 React 优化列表元素的更新。

## 行选择

## 分页

传入`pagination`添加分页组件，可参考`Pagination`组件的 API。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'key',
    title: 'key',
  },
  {
    dataIndex: 'value',
    title: 'value',
  },
];

const dataSource = Array.from({ length: 48 }, (_, index) => index + 1).map(
  (num) => ({ key: num, value: num }),
);

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{ pageSize: 5 }}
  />
);
```

## 固定列

使用`TableColumn.fixed`描述固定列，`'left'`固定在左侧，`'right'`固定在右侧，`true`相当于`'left'`。目前只支持固定左右各一列。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'left',
    title: '左侧固定列 (200px)',
    width: 200,
    fixed: true,
  },
  {
    dataIndex: 'mid1',
    title: '中间列 1 (400px)',
    width: 400,
  },
  {
    dataIndex: 'mid2',
    title: '中间列 2 (500px)',
    width: 500,
  },
  {
    dataIndex: 'right',
    title: '右侧固定列 (200px)',
    width: 200,
    fixed: 'right',
  },
];

const dataSource = [
  {
    left: 'left',
    mid1: 'mid1',
    mid2: 'mid2',
    right: 'right',
  },
  {
    left: 'left',
    mid1: 'mid1',
    mid2: 'mid2',
    right: 'right',
  },
  {
    left: 'left',
    mid1: 'mid1',
    mid2: 'mid2',
    right: 'right',
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 排序

使用`TableColumn.sorter`开启列排序，`true`表示服务端排序，只添加 icon，传入比较函数表示本地排序。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'score1',
    title: '服务端排序 (只渲染 icon)',
    sorter: true,
  },
  {
    dataIndex: 'score2',
    title: '正常顺序',
    sorter: (a, b) => a.score2 - b.score2,
  },
  {
    dataIndex: 'score3',
    title: '相反顺序 (升序是降序)',
    sorter: (a, b) => b.score3 - a.score3,
  },
];

const dataSource = [
  {
    score1: 1,
    score2: 6,
    score3: 7,
  },
  {
    score1: 2,
    score2: 5,
    score3: 8,
  },
  {
    score1: 3,
    score2: 4,
    score3: 9,
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 自定义行属性

使用`onHeaderRow`和`onRow`可以对`thead`和`tbody`部分的`tr`元素添加自定义属性。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'key',
    title: 'key',
  },
  {
    dataIndex: 'value',
    title: 'value',
  },
];

const dataSource = Array.from({ length: 3 }, (_, index) => index + 1).map(
  (num) => ({ key: num, value: num }),
);

const onHeaderRow = (columns) => ({
  style: {
    backgroundColor: 'lightpink',
  },
});

const onRow = (record, index) => {
  const colors = ['lightcoral', 'lightgreen', 'lightblue'];
  return {
    style: {
      backgroundColor: colors[index % colors.length],
    },
  };
};

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    onHeaderRow={onHeaderRow}
    onRow={onRow}
  />
);
```

## 自定义单元格属性

使用`onHeaderCell`和`onCell`可以对`thead`和`tbody`部分的`td`元素添加自定义属性。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'key',
    title: 'key',
    onHeaderCell: () => ({ style: { color: 'red' } }),
    onCell: (record, rowIndex, columnIndex) => {
      let props = {};
      if (rowIndex % 2 === 0) {
        props.style = { backgroundColor: 'orange' };
      }
      return props;
    },
  },
  {
    dataIndex: 'value',
    title: 'value',
    onHeaderCell: () => ({ style: { color: 'blue' } }),
    onCell: (record, rowIndex, columnIndex) => {
      let props = {};
      if (rowIndex % 2 === 1) {
        props.style = { backgroundColor: 'yellow' };
      }
      return props;
    },
  },
];

const dataSource = Array.from({ length: 3 }, (_, index) => index + 1).map(
  (num) => ({ key: num, value: num }),
);

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 表头列合并

使用`TableColumn.colSpan`实现表头的列合并，注意对于空间被占用的列，需要手动声明`colSpan`为`0`。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'name',
    title: '姓名与年龄',
    colSpan: 2,
  },
  {
    dataIndex: 'age',
    title: '年龄',
    colSpan: 0,
  },
  {
    dataIndex: 'height',
    title: '身高',
  },
];

const dataSource = [
  {
    name: '小帅',
    age: 18,
    height: 185,
  },
  {
    name: '小美',
    age: 17,
    height: 175,
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 单元格行列合并

将`TableColumn.render`指定为`RenderObject`可实现表格内容的行列合并，同样要注意设置空单元格的`rowSpan`或`colSpan`为`0`。

```ts
interface RenderObject {
  children: ReactNode;
  props: {
    rowSpan?: number;
    colSpan?: number;
  };
}
```

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'name',
    title: '小组名称',
    render: (value, record, index) => {
      if (index === 0 || index === 4) {
        return {
          children: (
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {value}
            </div>
          ),
          props: {
            colSpan: 2,
          },
        };
      }
      if (index === 2) {
        return {
          children: value,
          props: {
            rowSpan: 2,
          },
        };
      }
      if (index === 3) {
        return {
          children: value,
          props: {
            rowSpan: 0,
          },
        };
      }
      return value;
    },
  },
  {
    dataIndex: 'member',
    title: '组员',
    render: (value, record, index) => {
      if (index === 0 || index === 4) {
        return {
          children: value,
          props: {
            colSpan: 0,
          },
        };
      }
      return value;
    },
  },
];

const dataSource = [
  {
    name: '前端小组',
  },
  {
    name: 'React 小组',
    member: '喜羊羊',
  },
  {
    name: 'Vue 小组',
    member: '美羊羊',
  },
  {
    name: 'Vue 小组',
    member: '沸羊羊',
  },
  {
    name: '后端小组',
  },
  {
    name: 'Go 小组',
    member: '羚羊王子',
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## API

| 属性          | 说明                                         | 类型                                                                                      | 默认值  |
| :------------ | :------------------------------------------- | :---------------------------------------------------------------------------------------- | :------ |
| `columns`     | 表格列的配置描述                             | `TableColumn[]`                                                                           | `[]`    |
| `dataSource`  | 数据                                         | `TableRecord[]`                                                                           | `[]`    |
| `rowKey`      | 表格行 key 的取值，可以是字符串或一个函数    | `string                                               \| (record: TableRecord) => string` | `'key'` |
| `pagination`  | 分页组件配置                                 | `PaginationProps`                                                                         |         |
| `onHeaderRow` | 设置头部行属性，返回的对象会被合并传给表头行 | `(columns: TableColumn[]) => Record<string, any>`                                         |         |
| `onRow`       | 设置行属性，返回的对象会被合并传给表格行     | `(record: any, index: number) => Record<string, any>`                                     |         |

### TableColumn

`columns`数组元素的类型。

| 属性           | 说明                                                                                          | 类型                                                                          | 默认值   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :------- |
| `dataIndex`    | 列数据在数据项中对应的 key                                                                    | `string`                                                                      |          |
| `title`        | 列头显示文字                                                                                  | `string`                                                                      |          |
| `align`        | 设置列的对齐方式                                                                              | `'left' \| 'center' \| 'right'`                                               | `'left'` |
| `render`       | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引                              | `(value: any, record: any, index: number) => ReactNode \| RenderObject`       |          |
| `width`        | 列宽度                                                                                        | `string \| number`                                                            |          |
| `fixed`        | 列是否固定                                                                                    | `boolean \| 'left' \| 'right'`                                                | `false`  |
| `sorter`       | 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true | `boolean \| (r1: any, r2: any) => number`                                     | `true`   |
| `onHeaderCell` | 设置头部单元格属性                                                                            | `(column: TableColumn, columnIndex: number) => Record<string, any>`           |          |
| `onCell`       | 设置单元格属性                                                                                | `(record: any, rowIndex: number, columnIndex: number) => Record<string, any>` |          |
| `colSpan`      | 表头列合并，设置为 0 时不渲染                                                                 | `number`                                                                      |          |

### TableRecord

```ts
export interface TableRecord {
  key?: string;
  [x: string]: any;
}
```
