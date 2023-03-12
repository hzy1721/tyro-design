import { ReactNode } from 'react';
import { PortalProps } from '../util/Portal/interface';

export interface TooltipProps extends Omit<PortalProps, 'content'> {
  content?: ReactNode;
}
