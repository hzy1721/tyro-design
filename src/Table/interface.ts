import { ReactNode } from 'react';
import { CheckboxProps } from '../Checkbox/interface';
import { PaginationProps } from '../Pagination/interface';
import { SelectOptionListItem, SelectValue } from '../Select/interface';
import { BaseProps } from '../util/baseProps';

export interface RenderObject {
  children: ReactNode;
  props: {
    rowSpan?: number;
    colSpan?: number;
  };
}

export interface TableColumn {
  dataIndex: string;
  title: ReactNode;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any, index: number) => ReactNode | RenderObject;
  width?: number | string;
  fixed?: boolean | 'left' | 'right';
  sorter?: boolean | ((r1: any, r2: any) => number);
  filters?: SelectOptionListItem[];
  onFilter?: (filteredValue: SelectValue, record: TableRecord) => boolean;
  onHeaderCell?: (
    column: TableColumn,
    columnIndex: number,
  ) => Record<string, any>;
  onCell?: (
    record: any,
    rowIndex: number,
    columnIndex: number,
  ) => Record<string, any>;
  colSpan?: number;
}

export interface TableRecord {
  key?: string | number;
  [x: string]: any;
}

export interface TableRowSelection {
  disabled?: boolean;
  getCheckboxProps?: (record: TableRecord) => CheckboxProps;
  onSelect?: (record: TableRecord, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
}

export interface TableProps extends BaseProps {
  columns: TableColumn[];
  dataSource: TableRecord[];
  rowKey?: string | ((record: TableRecord) => string);
  rowSelection?: TableRowSelection;
  pagination?: PaginationProps;
  onChange?: (
    pagination?: { currentPage: number; pageSize: number },
    sorter?: { dataIndex: string; order: SortOrder },
    filters?: Array<{
      dataIndex: string;
      filteredValue: SelectValue;
    }>,
  ) => void;
  expandedRowRender?: (record: TableRecord, index: number) => ReactNode;
  hideExpandedColumn?: boolean;
  rowExpandable?: (record: TableRecord, index: number) => boolean;
  bordered?: boolean;
  resizable?: boolean;
  groupBy?: string | ((record: TableRecord) => string);
  renderGroupSection?: (
    groupKey: string | number,
    group: string[] | number[],
  ) => ReactNode;
  onHeaderRow?: (columns: TableColumn[]) => Record<string, any>;
  onRow?: (record: any, index: number) => Record<string, any>;
}

export enum SortOrder {
  Asc = 1,
  Desc = 2,
}

export interface SortInfo {
  dataIndex: string;
  order: SortOrder;
  compareFunc?: (r1: any, r2: any) => number;
}
