import { PopupProps } from '../util/Popup/interface';
import { DropdownItemProps as DropdownMenuItem } from './DropdownItem/interface';

export interface DropdownProps extends Omit<PopupProps, 'content'> {
  menu: DropdownMenuItem[];
  maxCount?: number;
  showTick?: boolean;
}
