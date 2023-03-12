import { IconTriangleDown, IconTriangleUp } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import React, { CSSProperties, FC, useMemo, useState } from 'react';
import Checkbox from '../Checkbox';
import Pagination from '../Pagination/index';
import {
  SortInfo,
  SortOrder,
  TableColumn,
  TableProps,
  TableRecord,
} from './interface';

import './style/index.less';

const Table: FC<TableProps> = (props) => {
  const {
    columns = [],
    dataSource = [],
    rowKey = 'key',
    rowSelection,
    pagination,
    onHeaderRow,
    onRow,
    className,
    style,
  } = props;

  const getRecordKey = (record: TableRecord) =>
    typeof rowKey === 'function' ? record[rowKey(record)] : record[rowKey];
  const {
    disabled: headCheckboxDisabled,
    getCheckboxProps,
    onSelect,
    onSelectAll,
  } = rowSelection ?? {};
  const rowDisabled = useMemo(() => {
    const map = new Map<string, boolean>();
    dataSource.forEach((record) => {
      const key = getRecordKey(record);
      const disabled = getCheckboxProps
        ? getCheckboxProps(record).disabled ?? false
        : false;
      key && map.set(key, disabled);
    });
    return map;
  }, [dataSource, rowKey]);
  const [selectedMap, setSelectedMap] = useState(() => {
    const map = new Map<string, boolean>();
    dataSource.forEach((record) => {
      const key = getRecordKey(record);
      key && map.set(key, false);
    });
    return map;
  });

  const {
    pageSize = 10,
    defaultCurrentPage = 1,
    onPageChange,
  } = pagination ?? {};
  const [page, setPage] = useState(defaultCurrentPage);

  const [sortInfo, setSortInfo] = useState<SortInfo>();

  const genColStyle = (column: TableColumn) => {
    const style: CSSProperties = {};
    const { width } = column;
    if (width) {
      style.width = width;
      style.minWidth = width;
    }
    return style;
  };

  const genCellClassName = (column: TableColumn): string => {
    const { align = 'left', fixed } = column;
    return classNames({
      [`tyro-table-align-${align}`]: align !== 'left',
      [`tyro-table-cell-fixed-left`]: fixed === true || fixed === 'left',
      [`tyro-table-cell-fixed-right`]: fixed === 'right',
    });
  };

  const genCellStyle = (column: TableColumn) => {
    const style: CSSProperties = {};
    const { fixed } = column;
    if (fixed === true || fixed === 'left') {
      style.position = 'sticky';
      style.left = 0;
    } else if (fixed === 'right') {
      style.position = 'sticky';
      style.right = 0;
    }
    return style;
  };

  const renderHeadCell = (column: TableColumn, index: number) => {
    const { dataIndex, title, sorter, onHeaderCell, colSpan } = column;
    const hasSorter = sorter === true || typeof sorter === 'function';
    const { dataIndex: sortIndex, order: sortOrder } = sortInfo ?? {};
    const order = sortIndex === dataIndex ? sortOrder : undefined;

    const toggleSorter = () => {
      const states = [undefined, SortOrder.Asc, SortOrder.Desc];
      const index = states.indexOf(order);
      const newOrder = states[(index + 1) % states.length];
      if (newOrder === undefined) {
        setSortInfo(undefined);
      } else {
        setSortInfo({
          dataIndex,
          order: newOrder,
          compareFunc: typeof sorter === 'function' ? sorter : undefined,
        });
      }
    };

    return colSpan === 0 ? null : (
      <th
        key={dataIndex}
        className={genCellClassName(column)}
        style={genCellStyle(column)}
        {...(onHeaderCell ? onHeaderCell(column, index) : {})}
        colSpan={colSpan}
      >
        {hasSorter ? (
          <div className="tyro-table-sorter-wrapper" onClick={toggleSorter}>
            {title}
            <div className="tyro-table-sorter">
              <IconTriangleUp
                className={classNames({
                  'arrow-active': order === SortOrder.Asc,
                })}
              />
              <IconTriangleDown
                className={classNames({
                  'arrow-active': order === SortOrder.Desc,
                })}
              />
            </div>
          </div>
        ) : (
          title
        )}
      </th>
    );
  };

  const renderBodyCell = (
    column: TableColumn,
    record: any,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const { dataIndex, render, onCell } = column;
    let content = record[dataIndex] ?? '';
    let renderProps: { rowSpan?: number; colSpan?: number } = {};
    if (render) {
      const res: any = render(record[dataIndex], record, rowIndex);
      if (typeof res === 'object' && res.hasOwnProperty('children')) {
        renderProps = res.props;
        content = res.children;
      } else {
        content = res;
      }
    }
    const { rowSpan, colSpan } = renderProps;

    return rowSpan === 0 || colSpan === 0 ? null : (
      <td
        key={dataIndex}
        className={genCellClassName(column)}
        style={genCellStyle(column)}
        {...(onCell ? onCell(record, rowIndex, columnIndex) : {})}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        {content}
      </td>
    );
  };

  const tableColumns = useMemo(() => {
    const cols = cloneDeep(columns);
    if (rowSelection) {
      cols.unshift({
        dataIndex: 'rowSelection',
        title: (
          <Checkbox
            disabled={headCheckboxDisabled}
            onChange={(checked) => {
              const newSelectMap = cloneDeep(selectedMap);
              newSelectMap.forEach((value, key) => {
                if (rowDisabled.get(key) === false) {
                  newSelectMap.set(key, checked);
                }
              });
              setSelectedMap(newSelectMap);
              onSelectAll && onSelectAll(checked);
            }}
          />
        ),
        render: (value, record) => (
          <Checkbox
            {...(getCheckboxProps ? getCheckboxProps(record) : {})}
            checked={selectedMap.get(getRecordKey(record)) ?? false}
            onChange={(checked) => {
              const key = getRecordKey(record);
              if (key) {
                const newSelectedMap = cloneDeep(selectedMap);
                newSelectedMap.set(key, checked);
                setSelectedMap(newSelectedMap);
              }
              onSelect && onSelect(record, checked);
            }}
          />
        ),
      });
    }
    return cols;
  }, [columns, rowSelection, selectedMap]);

  const tableData = useMemo(() => {
    let data = dataSource;
    const { order, compareFunc } = sortInfo ?? {};
    if (compareFunc) {
      const cmpFn = (a: any, b: any) =>
        order === SortOrder.Asc ? compareFunc(a, b) : compareFunc(b, a);
      data.sort(cmpFn);
    }
    if (pagination) {
      data = data.slice(pageSize * (page - 1), pageSize * page);
    }
    return data;
  }, [dataSource, pagination, page, sortInfo]);

  return (
    <div className={classNames('tyro-table-wrapper', className)} style={style}>
      <table className="tyro-table">
        <colgroup>
          {tableColumns.map((column) => (
            <col key={column.dataIndex} style={genColStyle(column)} />
          ))}
        </colgroup>
        <thead className="tyro-table-header">
          <tr {...(onHeaderRow ? onHeaderRow(columns) : {})}>
            {tableColumns.map((column, index) => renderHeadCell(column, index))}
          </tr>
        </thead>
        <tbody
          className="tyro-table-body"
          style={{ maxHeight: `calc(100% - ${39 + (pagination ? 32 : 0)}px)` }}
        >
          {tableData.map((record, rowIndex) => (
            <tr
              key={getRecordKey(record) ?? rowIndex}
              {...(onRow ? onRow(record, rowIndex) : {})}
            >
              {tableColumns.map((column, columnIndex) =>
                renderBodyCell(column, record, rowIndex, columnIndex),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <Pagination
          className="tyro-table-pagination"
          total={dataSource.length}
          {...pagination}
          showDetail
          onPageChange={(currentPage: number) => {
            setPage(currentPage);
            onPageChange && onPageChange(currentPage);
          }}
        />
      )}
    </div>
  );
};

export default Table;
