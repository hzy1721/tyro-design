import { ReactElement } from 'react';
import { ButtonProps } from '../Button/interface';
import { BaseProps } from '../util/baseProps';

export interface DialogProps extends BaseProps {
  title: ReactElement;
  footer?: ReactElement;
  okProps?: ButtonProps;
  cancelProps?: ButtonProps;
  closable?: boolean;
  maskClosable?: boolean;
  visible?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClose?: () => void;
}
