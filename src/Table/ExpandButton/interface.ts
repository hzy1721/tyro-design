import { BaseProps } from '../../util/baseProps';

export interface ExpandButtonProps extends BaseProps {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  icon?: 'triangle' | 'chevron';
}
