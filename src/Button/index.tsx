import classNames from 'classnames';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { ButtonProps } from './interface';

import './style/index.less';

const InternalButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    theme = 'light',
    type = 'primary',
    size = 'default',
    icon,
    children,
    ...rest
  } = props;
  const buttonRef = ref as any;

  const classes = classNames('tyro-button', {
    [`tyro-button-${theme}`]: theme === 'light' || theme === 'borderless',
    [`tyro-button-${type}`]: type,
    [`tyro-button-${size}`]: size === 'small' || size === 'large',
    [`tyro-button-icon-only`]: icon && !children,
  });

  return (
    <button type="button" {...rest} className={classes} ref={buttonRef}>
      {icon}
      {children}
    </button>
  );
};

const Button = forwardRef(InternalButton);

export default Button;
