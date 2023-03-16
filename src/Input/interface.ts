import { HTMLInputTypeAttribute } from 'react';
import { BaseProps } from '../../dist/util/baseProps';

export interface InputProps extends BaseProps {
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onEnterPress?: (value: string) => void;
}
