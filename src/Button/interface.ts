import { MouseEventHandler } from 'react';
import { BaseProps } from '../util/baseProps';

const ButtonTypes = ['primary', 'secondary', 'tertiary', 'warning', 'danger'];
export type ButtonType = (typeof ButtonTypes)[number];

export interface ButtonProps extends BaseProps {
  type?: ButtonType;
  onClick?: MouseEventHandler;
}
