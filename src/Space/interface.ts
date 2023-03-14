import { BaseProps } from '../util/baseProps';

export interface SpaceProps extends BaseProps {
  vertical?: boolean;
  align?: 'start' | 'center' | 'end' | 'baseline';
  spacing?: 'tight' | 'medium' | 'loose' | number;
}
