import { BaseProps } from '../../dist/util/baseProps';

export interface InputNumberProps extends BaseProps {
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: (value: number) => void;
  onEnterPress?: (value: number) => void;
}
