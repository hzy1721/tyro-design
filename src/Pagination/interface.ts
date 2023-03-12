import { BaseProps } from '../util/baseProps';

export interface PaginationProps extends BaseProps {
  total?: number;
  pageSize?: number;
  currentPage?: number;
  defaultCurrentPage?: number;
  onPageChange?: (currentPage: number) => void;
  showTotal?: boolean;
  showDetail?: boolean;
  size?: 'small';
}
