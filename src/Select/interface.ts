import { BaseProps } from '../../dist/util/baseProps';

export type SelectOptionValue = string | number;

export interface SelectOptionListItem {
  value: SelectOptionValue;
  label?: string;
}

export interface SelectProps extends BaseProps {
  optionList?: SelectOptionListItem[];
  defaultValue?: SelectOptionValue;
  value?: SelectOptionValue;
  onChange?: (value: SelectOptionValue) => void;
}
