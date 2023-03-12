import { ReactNode } from 'react';
import { BaseProps } from '../util/baseProps';

export interface EmptyProps extends BaseProps {
  image: string | ReactNode;
  title: ReactNode;
  description: ReactNode;
  layout?: 'vertical' | 'horizontal';
}

export interface EmptyInternalImage {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
}
