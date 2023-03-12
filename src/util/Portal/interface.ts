import { ReactElement } from 'react';
import { BaseProps } from '../baseProps';

export type PortalPosition =
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

export interface PortalProps extends BaseProps {
  trigger?: 'hover' | 'click';
  position?: PortalPosition;
  content?: ReactElement;
  spacing?: number;
}
