import {
  IconFilter,
  IconTriangleDown,
  IconTriangleUp,
} from '@douyinfe/semi-icons';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import Checkbox from '../Checkbox';
import Pagination from '../Pagination/index';
import Select from '../Select';
import { SelectValue } from '../Select/interface';
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
    onChange,
    onHeaderRow,
    onRow,
    className,
    style,
  } = props;

  // 行选择
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

  // 分页
  const {
    defaultCurrentPage = 1,
    currentPage,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
    onChange: onPaginationChange,
    ...paginationRest
  } = pagination ?? {};
  const [internalPage, setInternalPage] = useState(defaultCurrentPage);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [sortInfo, setSortInfo] = useState<SortInfo>();
  const [filteredValueMap, setFilteredValueMap] = useState(
    new Map<string, SelectValue>(),
  );
  const onFilterMap = useMemo(
    () =>
      new Map(
        columns
          .filter((col) => col.onFilter)
          .map((col) => [col.dataIndex, col.onFilter!]),
      ),
    [columns],
  );
  const filterInfo = useMemo(
    () =>
      Array.from(filteredValueMap).map(([dataIndex, filteredValue]) => ({
        dataIndex,
        filteredValue,
      })),
    [filteredValueMap],
  );

  useEffect(() => {
    if (currentPage !== undefined) {
      setInternalPage(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (currentPage === undefined) {
      setInternalPage(page);
    }
    onPageChange && onPageChange(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setInternalPageSize(pageSize);
    onPageSizeChange && onPageSizeChange(pageSize);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    onPaginationChange && onPaginationChange(page, pageSize);
    onChange && onChange({ currentPage: page, pageSize }, sortInfo, filterInfo);
  };

  const handleFilterChange = (dataIndex: string, value: SelectValue) => {
    const newFilteredValueMap = new Map(filteredValueMap).set(dataIndex, value);
    setFilteredValueMap(newFilteredValueMap);
    onChange &&
      onChange(
        { currentPage: internalPage, pageSize: internalPageSize },
        sortInfo,
        Array.from(newFilteredValueMap).map(([dataIndex, filteredValue]) => ({
          dataIndex,
          filteredValue,
        })),
      );
  };

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

  const genCellStyle = (column: TableColumn, index: number) => {
    const style: CSSProperties = {};
    const { fixed } = column;
    if (fixed === true || fixed === 'left') {
      style.position = 'sticky';
      const leftWidth = columns
        .slice(0, index)
        .reduce((sum, col) => sum + parseInt(String(col.width ?? 0)), 0);
      style.left = leftWidth;
    } else if (fixed === 'right') {
      style.position = 'sticky';
      const rightWidth = columns
        .slice(index + 1)
        .reduce((sum, col) => sum + parseInt(String(col.width ?? 0)), 0);
      style.right = rightWidth;
    }
    return style;
  };

  const renderHeadCell = (column: TableColumn, index: number) => {
    const { dataIndex, title, sorter, filters, onHeaderCell, colSpan } = column;
    const hasSorter = sorter === true || typeof sorter === 'function';
    const { dataIndex: sortIndex, order: sortOrder } = sortInfo ?? {};
    const order = sortIndex === dataIndex ? sortOrder : undefined;

    const toggleSorter = () => {
      const states = [undefined, SortOrder.Asc, SortOrder.Desc];
      const index = states.indexOf(order);
      const newOrder = states[(index + 1) % states.length];
      const newSortInfo =
        newOrder === undefined
          ? undefined
          : {
              dataIndex,
              order: newOrder,
              compareFunc: typeof sorter === 'function' ? sorter : undefined,
            };
      setSortInfo(newSortInfo);
      onChange &&
        onChange(
          { currentPage: internalPage, pageSize: internalPageSize },
          newSortInfo,
          filterInfo,
        );
    };

    return colSpan === 0 ? null : (
      <th
        key={dataIndex}
        className={genCellClassName(column)}
        style={genCellStyle(column, index)}
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
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            {title}
          </div>
        )}
        {filters && (
          <Select
            triggerRender={(_, selectedValue) => (
              <IconFilter
                className={classNames('tyro-table-filter-icon', {
                  'tyro-table-filter-icon-active': Array.isArray(selectedValue)
                    ? selectedValue.length > 0
                    : selectedValue !== undefined,
                })}
              />
            )}
            optionList={filters}
            multiple
            onChange={(value) => handleFilterChange(dataIndex, value)}
            position="bottom"
          />
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

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }

    return (
      <td
        key={dataIndex}
        className={genCellClassName(column)}
        style={genCellStyle(column, columnIndex)}
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
    if (onFilterMap.size) {
      data = data.filter((record) => {
        for (const [dataIndex, onFilter] of onFilterMap) {
          const filteredValue = filteredValueMap.get(dataIndex);
          const valueValid = Array.isArray(filteredValue)
            ? filteredValue.length > 0
            : filteredValue !== undefined;
          if (valueValid && !onFilter(filteredValue!, record)) {
            return false;
          }
        }
        return true;
      });
    }
    const { order, compareFunc } = sortInfo ?? {};
    if (compareFunc) {
      const cmpFn = (a: any, b: any) =>
        order === SortOrder.Asc ? compareFunc(a, b) : compareFunc(b, a);
      data.sort(cmpFn);
    }
    if (pagination) {
      data = data.slice(
        internalPageSize * (internalPage - 1),
        internalPageSize * internalPage,
      );
    }
    return data;
  }, [
    dataSource,
    pagination,
    internalPage,
    internalPageSize,
    sortInfo,
    filteredValueMap,
  ]);

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
          showDetail
          currentPage={internalPage}
          pageSize={internalPageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onChange={handlePaginationChange}
          {...paginationRest}
        />
      )}
    </div>
  );
};

export default Table;
