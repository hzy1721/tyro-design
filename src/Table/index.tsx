import {
  IconFilter,
  IconTriangleDown,
  IconTriangleUp,
} from '@douyinfe/semi-icons';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { Resizable } from 'react-resizable';
import Checkbox from '../Checkbox';
import Pagination from '../Pagination/index';
import Select from '../Select';
import { SelectValue } from '../Select/interface';
import ExpandButton from './ExpandButton';
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
    className,
    style,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    rowSelection,
    pagination,
    onChange,
    expandedRowRender,
    hideExpandedColumn = true,
    rowExpandable,
    onHeaderRow,
    onRow,
    bordered = false,
    resizable = false,
    groupBy,
    renderGroupSection,
  } = props;

  // 行选择
  const getRecordKey = (record: TableRecord): string =>
    typeof rowKey === 'function'
      ? String(record[rowKey(record)])
      : String(record[rowKey]);
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
  // 排序
  const [sortInfo, setSortInfo] = useState<SortInfo>();
  // 筛选
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

  const tableData = useMemo(() => {
    let data = dataSource;
    // 本地筛选
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
    // 本地排序
    const { order, compareFunc } = sortInfo ?? {};
    if (compareFunc) {
      const cmpFn = (a: any, b: any) =>
        order === SortOrder.Asc ? compareFunc(a, b) : compareFunc(b, a);
      data.sort(cmpFn);
    }
    // 本地分页
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

  const groupInfo = useMemo(() => {
    if (!groupBy) {
      return [];
    }
    const info: any[] = [];
    const keyIndexMap = new Map<string, number>();
    tableData.forEach((record) => {
      const key = typeof groupBy === 'function' ? groupBy(record) : groupBy;
      const groupKey: string = record[key];
      if (!keyIndexMap.has(groupKey)) {
        keyIndexMap.set(groupKey, info.length);
        info.push([groupKey, [], key]);
      }
      const groupIndex = keyIndexMap.get(groupKey)!;
      info[groupIndex][1].push(record);
    });
    return info;
  }, [groupBy, tableData]);

  // 行展开
  const [expandedMap, setExpandedMap] = useState(
    new Map<string, boolean>(
      tableData.map((record) => [getRecordKey(record), false]),
    ),
  );

  const tableColumns = useMemo(() => {
    const cols = cloneDeep(columns);
    if (expandedRowRender && !hideExpandedColumn) {
      cols.unshift({
        dataIndex: 'rowExpanded',
        title: '',
        render: (value, record, rowIndex) =>
          !rowExpandable || rowExpandable(record, rowIndex) ? (
            <ExpandButton
              onChange={(expanded) =>
                setExpandedMap(
                  new Map(expandedMap).set(getRecordKey(record), expanded),
                )
              }
              icon="chevron"
            />
          ) : undefined,
        width: 50,
      });
    }
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
        width: 50,
      });
    }
    return cols;
  }, [columns, rowSelection, selectedMap, expandedMap]);

  const [colWidthMap, setColWidthMap] = useState(
    new Map(tableColumns.map((col) => [col.dataIndex, col.width])),
  );

  const renderHeadCell = (
    column: TableColumn,
    index: number,
    lastCol: boolean,
  ) => {
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
    if (colSpan === 0) {
      return null;
    }
    const headCell = (
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
    const colWidth = colWidthMap.get(dataIndex);
    return resizable && !lastCol && typeof colWidth === 'number' ? (
      <Resizable
        width={colWidth}
        height={0}
        axis="x"
        onResize={(e, { size }) =>
          setColWidthMap(new Map(colWidthMap).set(dataIndex, size.width))
        }
      >
        {headCell}
      </Resizable>
    ) : (
      headCell
    );
  };

  const genColStyle = (column: TableColumn) => {
    const style: CSSProperties = {};
    const width = colWidthMap.get(column.dataIndex);
    if (width) {
      style.width = width;
      style.minWidth = width;
    }
    return style;
  };

  const renderBodyCell = (
    column: TableColumn,
    record: TableRecord,
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
    let firstIndex = 0;
    if (rowSelection) {
      firstIndex += 1;
    }
    const showExpandButton =
      expandedRowRender &&
      hideExpandedColumn &&
      columnIndex === firstIndex &&
      (!rowExpandable || rowExpandable(record, rowIndex));
    return (
      <td
        key={dataIndex}
        className={genCellClassName(column)}
        style={genCellStyle(column, columnIndex)}
        {...(onCell ? onCell(record, rowIndex, columnIndex) : {})}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        <div
          style={
            showExpandButton
              ? {
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  verticalAlign: 'middle',
                }
              : undefined
          }
        >
          {showExpandButton ? (
            <ExpandButton
              onChange={(expanded) =>
                setExpandedMap(
                  new Map(expandedMap).set(getRecordKey(record), expanded),
                )
              }
            />
          ) : (
            <div style={{ width: 19 }}></div>
          )}
          {content}
        </div>
      </td>
    );
  };

  const renderBodyRow = (record: TableRecord, rowIndex: number) => (
    <>
      <tr
        key={getRecordKey(record) ?? rowIndex}
        {...(onRow ? onRow(record, rowIndex) : {})}
      >
        {tableColumns.map((column, columnIndex) =>
          renderBodyCell(column, record, rowIndex, columnIndex),
        )}
      </tr>
      {expandedRowRender && expandedMap.get(getRecordKey(record)) === true && (
        <tr
          className="tyro-table-expanded-row"
          key={`${getRecordKey(record) ?? rowIndex}_expanded`}
        >
          <td colSpan={tableColumns.length}>
            {expandedRowRender && expandedRowRender(record, rowIndex)}
          </td>
        </tr>
      )}
    </>
  );

  const [groupExpandMap, setGroupExpandMap] = useState(
    new Map<string, boolean>(groupInfo.map(([groupKey]) => [groupKey, false])),
  );

  const renderGroupRows = (group: any) => {
    const [groupKey, groupItems, key] = group;
    const groupValues = groupItems.map((item: any) => item[key]);

    return (
      <>
        <tr>
          <td
            className="tyro-table-group-title-cell"
            colSpan={tableColumns.length}
          >
            <div className="tyro-table-group-title">
              <ExpandButton
                icon="chevron"
                onChange={(expanded) =>
                  setGroupExpandMap(
                    new Map(groupExpandMap).set(groupKey, expanded),
                  )
                }
              />
              {renderGroupSection
                ? renderGroupSection(groupKey, groupValues)
                : groupKey}
            </div>
          </td>
        </tr>
        {groupExpandMap.get(groupKey) === true &&
          groupItems.map((record: any, rowIndex: number) =>
            renderBodyRow(record, rowIndex),
          )}
      </>
    );
  };

  return (
    <div className={classNames('tyro-table-wrapper', className)} style={style}>
      <table
        className={classNames('tyro-table', {
          'tyro-table-bordered': bordered,
        })}
      >
        <colgroup>
          {tableColumns.map((column) => (
            <col key={column.dataIndex} style={genColStyle(column)} />
          ))}
        </colgroup>
        <thead className="tyro-table-header">
          <tr {...(onHeaderRow ? onHeaderRow(columns) : {})}>
            {tableColumns.map((column, index) =>
              renderHeadCell(column, index, index === tableColumns.length - 1),
            )}
          </tr>
        </thead>
        <tbody
          className="tyro-table-body"
          style={{ maxHeight: `calc(100% - ${39 + (pagination ? 32 : 0)}px)` }}
        >
          {groupBy
            ? groupInfo.map((group) => renderGroupRows(group))
            : tableData.map((record, rowIndex) =>
                renderBodyRow(record, rowIndex),
              )}
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
