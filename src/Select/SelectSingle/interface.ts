import { ReactNode } from 'react';
import { SelectOptionValue, SelectProps } from '../interface';

export interface SelectSingleProps
  extends Omit<
    SelectProps,
    'multiple' | 'defaultValue' | 'value' | 'onChange' | 'triggerRender'
  > {
  defaultValue?: SelectOptionValue;
  value?: SelectOptionValue;
  onChange?: (value: SelectOptionValue) => void;
  triggerRender?: (
    visible: boolean,
    selectedLabel?: SelectOptionValue,
  ) => ReactNode;
}
