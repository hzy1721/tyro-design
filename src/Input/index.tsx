import classNames from 'classnames';
import React, { FC, KeyboardEventHandler, useEffect, useState } from 'react';
import { InputProps } from './interface';

import './style/index.less';

const Input: FC<InputProps> = (props) => {
  const {
    className,
    style,
    type = 'text',
    defaultValue,
    value: externalValue,
    onChange,
    onBlur,
    onEnterPress,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleInputValueChange = (value: string) => {
    if (externalValue === undefined) {
      setInternalValue(value);
    }
    onChange && onChange(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onEnterPress && onEnterPress(internalValue ?? '');
    }
  };

  return (
    <input
      type={type}
      className={classNames('tyro-input', className)}
      style={style}
      value={internalValue ?? ''}
      onChange={(e) => handleInputValueChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
