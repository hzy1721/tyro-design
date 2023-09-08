import { BaseProps } from '../util/baseProps';

export interface RadioProps extends BaseProps {
  name: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
