---
group:
  title: 展示类
  order: 4
---

# Table

表格组件。

## 基本用法

使用`columns`表示列信息、`dataSource`表示原始数据。

- `TableColumn.title`支持`ReactNode`
- `TableColumn.render`用于单元格内容的自定义渲染
- 为每条数据提供一个`key`或通过`rowKey`指定主键属性，可以让 React 优化列表元素的更新

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

## 行选择

传入`rowSelection`使用行选择。

- `disabled`描述表头的全选 Checkbox 是否禁用，`getCheckboxProps`描述每一行的 Checkbox 是否禁用。
- `onSelectAll`为表头 Checkbox 的变化回调函数，`onSelect`为表格每一行 Checkbox 的变化回调函数。
- **必须**指定`key`或`rowKey`，使每条数据能够通过一个主键唯一地索引。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'groupId',
    title: '队伍 ID',
  },
  {
    dataIndex: 'groupName',
    title: '队伍名称',
    align: 'center',
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

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    rowSelection={{
      getCheckboxProps: (record) => ({
        disabled: record.key === '2',
      }),
      onSelect: (record, selected) => {
        alert(`${selected ? '选中了' : '取消选中'} ${record.groupId} 小组`);
      },
      onSelectAll: (selected) => {
        alert(`${selected ? '全选成功' : '取消全选'}`);
      },
    }}
  />
);
```

## 分页

传入`pagination`开启分页，有两种应用场景：

- 拉取远程数据：比较常用的场景，每次从后端返回一页的数据，切换页码重新请求数据
  - 手动提供`pagination.total`描述所有数据条数
  - 直接显示`dataSource`全部数据，不进行数据切片
  - 通过`pagination.onPageChange/onPageSizeChange`或`onChange`手动触发数据请求
- 展示本地数据：一次性获取到所有数据，组件内部根据页码自动切换显示的数据
  - `total`取`dataSource.length`
  - 每页显示`pagination.pageSize`条数据 (默认 10 条)，自动切片

通过`pagination.total`区分这两种模式。支持分页组件的受控和非受控用法。

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

使用`TableColumn.fixed`描述固定列。

- `left`固定在左侧，`right`固定在右侧，`true`相当于`left`
- 请确保左侧固定列在`columns`数组的开头、右侧固定列在`columns`的末尾，不支持固定中间的列
- 所有固定列必须指定`width`为固定数值，以确保固定列的正确显示

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'left1',
    title: '左侧固定列 (110px)',
    width: 110,
    fixed: true,
  },
  {
    dataIndex: 'left2',
    title: '左侧固定列 (150px)',
    width: 150,
    fixed: true,
  },
  {
    dataIndex: 'mid1',
    title: '中间列 (300px)',
    width: 300,
  },
  {
    dataIndex: 'mid2',
    title: '中间列 (400px)',
    width: 400,
  },
  {
    dataIndex: 'right1',
    title: '右侧固定列 (150px)',
    width: 150,
    fixed: 'right',
  },
  {
    dataIndex: 'right2',
    title: '右侧固定列 (110px)',
    width: 110,
    fixed: 'right',
  },
];

const dataSource = new Array(3).fill(0).map(() => {
  const obj = {};
  ['left1', 'left2', 'mid1', 'mid2', 'right1', 'right2'].forEach((key) => {
    obj[key] = key;
  });
  return obj;
});

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 排序

传入`TableColumn.sorter`开启排序功能。

- `true`表示服务端排序，只添加 icon
- 比较函数表示本地排序

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

## 筛选

传入`TableColumn.filters`开启筛选功能。

- `filters`的类型与 Select 组件`optionList`的类型相同
- 远程数据：通过`onChange`触发数据的重新请求
- 本地数据：通过`onFilter`确定满足筛选条件的记录

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'title',
    title: '标题',
  },
  {
    dataIndex: 'author',
    title: '作者',
    filters: [
      { value: '字节跳动技术团队', label: '字节跳动技术团队' },
      { value: '支付宝体验科技', label: '支付宝体验科技' },
    ],
    onFilter: (filteredValue, record) => filteredValue.includes(record.author),
  },
];

const dataSource = [
  {
    title: 'dynamicgo 开源：基于原始字节流的高性能+动态化 Go 数据处理',
    author: '字节跳动技术团队',
  },
  {
    title: 'AntV 你的保姆级数据可视化解决方案',
    author: '支付宝体验科技',
  },
  {
    title: '火山引擎 DataLeap：揭秘字节跳动业务背后的分布式数据治理思路',
    author: '字节跳动技术团队',
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## onChange

分页、排序、筛选都会影响表格当前展示的数据。

- 对于本地数据来说，组件内部会自动完成相应计算并展示正确的数据
- 对于远程数据来说，需要通过`onChange`获知这些变化，并作为新的参数去请求新的数据

```ts
onChange?: (
  pagination?: { currentPage: number; pageSize: number },
  sorter?: { dataIndex: string; order: SortOrder },
  filters?: Array<{
    dataIndex: string;
    filteredValue: SelectValue;
  }>,
) => void;
```

## 行展开

通过`expandedRowRender`指定行展开的内容。

- 设置`hideExpandedColumn`为`false`将展开按钮单独渲染为一列
- 通过`rowExpandable`决定是否渲染某一行的展开按钮

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'groupId',
    title: '队伍 ID',
  },
  {
    dataIndex: 'groupName',
    title: '队伍名称',
    align: 'center',
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

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    rowSelection={{}}
    expandedRowRender={(record) =>
      `「${record.groupName}」取得了 ${record.groupScore} 分的好成绩`
    }
    rowExpandable={(record) => record.groupId !== 3333}
  />
);
```

## 自定义行属性

使用`onHeaderRow`和`onRow`可以对`thead`和`tbody`部分的`tr`元素添加自定义属性。

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'key',
    title: 'click this line',
  },
  {
    dataIndex: 'value',
    title: 'will alert something',
  },
];

const dataSource = Array.from({ length: 3 }, (_, index) => index + 1).map(
  (num) => ({ key: num, value: num }),
);

const onHeaderRow = (columns) => ({
  style: {
    cursor: 'pointer',
  },
  onClick: () => alert('click header'),
});

const onRow = (record, index) =>
  index % 2 === 0
    ? {}
    : {
        style: {
          backgroundColor: '#eee',
        },
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

## 有边框

传入`bordered`为表格添加边框。

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

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered />
);
```

## 可伸缩列

传入`resizable`使列可伸缩。

- 可伸缩的列必须指定`width`为数值
- 推荐与`bordered`一起使用

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'key',
    title: 'key',
    width: 500,
  },
  {
    dataIndex: 'value',
    title: 'value',
  },
];

const dataSource = Array.from({ length: 3 }, (_, index) => index + 1).map(
  (num) => ({ key: num, value: num }),
);

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered resizable />
);
```

## 分组

```jsx
import { Table } from 'tyro-design';

const columns = [
  {
    dataIndex: 'title',
    title: '标题',
  },
  {
    dataIndex: 'author',
    title: '作者',
    width: 300,
  },
];

const dataSource = [
  {
    title: 'dynamicgo 开源：基于原始字节流的高性能+动态化 Go 数据处理',
    author: '字节跳动技术团队',
  },
  {
    title: 'AntV 你的保姆级数据可视化解决方案',
    author: '支付宝体验科技',
  },
  {
    title: '火山引擎 DataLeap：揭秘字节跳动业务背后的分布式数据治理思路',
    author: '字节跳动技术团队',
  },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    groupBy="author"
    renderGroupSection={(groupKey, group) =>
      `公众号：${groupKey}（${group.length} 篇文章）`
    }
  />
);
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

| 属性                 | 说明                                         | 类型                                                                                                                                                                                                                 | 默认值  |
| :------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `columns`            | 表格列的配置描述                             | `TableColumn[]`                                                                                                                                                                                                      | `[]`    |
| `dataSource`         | 数据                                         | `TableRecord[]`                                                                                                                                                                                                      | `[]`    |
| `rowKey`             | 表格行 key 的取值，可以是字符串或一个函数    | `string                                               \| (record: TableRecord) => string`                                                                                                                            | `'key'` |
| `rowSelection`       | 行选择配置                                   | `TableRowSelection`                                                                                                                                                                                                  |         |
| `pagination`         | 分页配置                                     | `PaginationProps`                                                                                                                                                                                                    |         |
| `onChange`           | 分页、排序、筛选变化的回调函数               | `(pagination?: { currentPage: number; pageSize: number }, sorter?: { dataIndex: string; order: SortOrder }, filters?: Array<{ dataIndex: string; filteredValue: SelectValue; }>) => void`                            |         |
| `expandedRowRender`  | 行展开内容的渲染函数                         | `(record: TableRecord, index: number) => ReactNode`                                                                                                                                                                  |         |
| `hideExpandedColumn` | 是否把展开按钮渲染到第一列而不是单独渲染一列 | `boolean`                                                                                                                                                                                                            | `true`  |
| `rowExpandable`      | 决定哪些行可以展开                           | `(record: TableRecord, index: number) => boolean`                                                                                                                                                                    |         |
| `bordered`           | 是否为表格添加边框                           | `boolean`                                                                                                                                                                                                            | `false` |
| `resizable`          | 是否开启可伸缩列                             | `boolean`                                                                                                                                                                                                            | `false` |
| `groupBy`            | 分组依赖的键                                 | `string \| ((record: TableRecord) => string)`                                                                                                                                                                        |         |
| `renderGroupSection` | 分组标题行的渲染函数                         | `(groupKey: string \| number, group: string[]                                                                                                                                             \| number[]) => ReactNode` |         |
| `onHeaderRow`        | 设置头部行属性，返回的对象会被合并传给表头行 | `(columns: TableColumn[]) => Record<string, any>`                                                                                                                                                                    |         |
| `onRow`              | 设置行属性，返回的对象会被合并传给表格行     | `(record: any, index: number) => Record<string, any>`                                                                                                                                                                |         |

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
| `filters`      | 筛选的菜单项                                                                                  | `SelectOptionListItem[]`                                                      | `[]`     |
| `onFilter`     | 本地筛选函数，确定哪些记录满足筛选要求                                                        | `(filteredValue: SelectValue, record: TableRecord) => boolean`                |          |
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

### TableRowSelection

| 属性               | 说明                                      | 类型                                               | 默认值  |
| :----------------- | :---------------------------------------- | :------------------------------------------------- | :------ |
| `disabled`         | 是否禁用表头的全选 Checkbox               | `boolean`                                          | `false` |
| `getCheckboxProps` | 自定义每一行 Checkbox 的属性              | `(record: TableRecord) => CheckboxProps`           |         |
| `onSelect`         | 选中/取消选中某一行 Checkbox 的回调函数   | `(record: TableRecord, selected: boolean) => void` |         |
| `onSelectAll`      | 选中/取消选中表头全选 Checkbox 的回调函数 | `(selected: boolean) => void`                      |         |
