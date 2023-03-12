import classNames from 'classnames';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { SizeType } from '../global/constant/size';

import './style/index.scss';

const ButtonTypes = ['default', 'primary'];
export type ButtonType = (typeof ButtonTypes)[number];

export interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  size?: SizeType;
  onClick?: MouseEventHandler;
  children?: ReactNode;
}

const InternalButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const { type = 'primary', size = 'middle', children, ...rest } = props;
  const buttonRef = ref as any;

  const classes = classNames('tyro-button', {
    [`tyro-button-${type}`]: type,
    [`tyro-button-${size}`]: size,
  });

  return (
    <button type="button" {...rest} className={classes} ref={buttonRef}>
      {children}
    </button>
  );
};

const Button = forwardRef(InternalButton);

export default Button;
