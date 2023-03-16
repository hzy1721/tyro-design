import React, { FC, useEffect, useState } from 'react';
import Input from '../Input';
import { InputNumberProps } from './interface';

const InputNumber: FC<InputNumberProps> = (props) => {
  const {
    className,
    style,
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

  const formatter = (value: string) => value.replace(/\D/g, '');

  const handleInputValueChange = (value: string) => {
    const numberValue = Number(formatter(value));
    if (externalValue === undefined) {
      setInternalValue(numberValue);
    }
    onChange && onChange(numberValue);
  };

  return (
    <Input
      className={className}
      style={style}
      value={internalValue ? String(internalValue) : ''}
      onChange={handleInputValueChange}
      onBlur={(value) => onBlur && onBlur(Number(formatter(value)))}
      onEnterPress={(value) =>
        onEnterPress && onEnterPress(Number(formatter(value)))
      }
    />
  );
};

export default InputNumber;
