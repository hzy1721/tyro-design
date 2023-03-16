import { BaseProps } from '../util/baseProps';

export interface PaginationProps extends BaseProps {
  total?: number;
  pageSize?: number;
  currentPage?: number;
  defaultCurrentPage?: number;
  onPageChange?: (currentPage: number) => void;
  showTotal?: boolean;
  showDetail?: boolean;
  showSizeChanger?: boolean;
  pageSizeOpts?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  onChange?: (currentPage: number, pageSize: number) => void;
  size?: 'small';
}
