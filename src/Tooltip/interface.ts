import { ReactNode } from 'react';
import { PopupProps } from '../util/Popup/interface';

export interface TooltipProps extends Omit<PopupProps, 'content'> {
  content?: ReactNode;
}
