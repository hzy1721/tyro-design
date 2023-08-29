import { MouseEventHandler, ReactNode } from 'react';
import { BaseProps } from '../util/baseProps';

const ButtonThemes = ['light', 'solid', 'borderless'];
export type ButtonTheme = (typeof ButtonThemes)[number];

const ButtonTypes = ['primary', 'secondary', 'tertiary', 'warning', 'danger'];
export type ButtonType = (typeof ButtonTypes)[number];

export interface ButtonProps extends BaseProps {
  theme?: ButtonTheme;
  type?: ButtonType;
  size?: 'default' | 'small' | 'large';
  icon?: ReactNode;
  onClick?: MouseEventHandler;
}
