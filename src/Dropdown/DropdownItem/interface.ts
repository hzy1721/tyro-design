import { CSSProperties, MouseEventHandler } from 'react';

export interface DropdownItemProps {
  name: string;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
}
