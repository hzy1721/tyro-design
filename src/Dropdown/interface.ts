import { PortalProps } from '../util/Portal/interface';
import { DropdownItemProps as DropdownMenuItem } from './DropdownItem/interface';

export interface DropdownProps extends Omit<PortalProps, 'content'> {
  menu: DropdownMenuItem[];
}
