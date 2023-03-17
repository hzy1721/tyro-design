import { ReactNode } from 'react';
import { BaseProps } from '../../dist/util/baseProps';
import { PortalPosition } from '../util/Portal/interface';

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
  triggerRender?: (visible: boolean, selectedLabel?: string) => ReactNode;
  position?: PortalPosition;
}
