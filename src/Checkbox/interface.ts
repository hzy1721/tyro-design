import { BaseProps } from '../util/baseProps';

export interface CheckboxProps extends BaseProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
