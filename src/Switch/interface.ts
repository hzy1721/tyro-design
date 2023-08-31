import { BaseProps } from '../util/baseProps';

export interface SwitchProps extends BaseProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  // disabled?: boolean;
  // size?: 'default' | 'small' | 'large';
}
