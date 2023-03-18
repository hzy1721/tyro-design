import { ReactNode } from 'react';
import { SelectProps } from '../interface';

export type SelectMultipleValue = string[] | number[];

export interface SelectMultipleProps
  extends Omit<
    SelectProps,
    'multiple' | 'defaultValue' | 'value' | 'onChange' | 'triggerRender'
  > {
  defaultValue?: SelectMultipleValue;
  value?: SelectMultipleValue;
  onChange?: (value: SelectMultipleValue) => void;
  triggerRender?: (
    visible: boolean,
    selectedLabel?: SelectMultipleValue,
  ) => ReactNode;
}
