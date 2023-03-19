import { ReactNode } from 'react';
import { BaseProps } from '../../dist/util/baseProps';
import { PortalPosition } from '../util/Portal/interface';

export type SelectOptionValue = string | number;

export type SelectValue = string | number | string[] | number[];

export interface SelectOptionListItem {
  value: SelectOptionValue;
  label?: string;
}

export interface SelectProps extends BaseProps {
  optionList?: SelectOptionListItem[];
  multiple?: boolean;
  defaultValue?: SelectValue;
  value?: SelectValue;
  onChange?: (value: SelectValue) => void;
  triggerRender?: (visible: boolean, selectedValue?: SelectValue) => ReactNode;
  position?: PortalPosition;
}
