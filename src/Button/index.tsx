import classNames from 'classnames';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { ButtonProps } from './interface';

import './style/index.less';

const InternalButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const { type = 'primary', children, ...rest } = props;
  const buttonRef = ref as any;

  const classes = classNames('tyro-button', {
    [`tyro-button-${type}`]: type,
  });

  return (
    <button type="button" {...rest} className={classes} ref={buttonRef}>
      {children}
    </button>
  );
};

const Button = forwardRef(InternalButton);

export default Button;
