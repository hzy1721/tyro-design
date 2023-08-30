import { ReactElement } from 'react';
import { BaseProps } from '../baseProps';

export type PopupPosition =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

export interface PopupProps extends BaseProps {
  trigger?: 'hover' | 'click';
  position?: PopupPosition;
  content?: ReactElement;
  spacing?: number;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}
