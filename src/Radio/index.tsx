import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { RadioProps } from './interface';

import './style/index.less';

const Radio: FC<RadioProps> = (props) => {
  const {
    className,
    style,
    name,
    defaultChecked = false,
    checked,
    onChange,
    disabled = false,
  } = props;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleRadioClick = () => {
    onChange && onChange(!internalChecked);
    if (checked === undefined && !internalChecked) {
      setInternalChecked(!internalChecked);
    }
  };

  return (
    <div
      className={classNames('tyro-radio', className, {
        [`tyro-radio-checked`]: internalChecked,
        [`tyro-radio-disabled`]: disabled,
      })}
      style={style}
      onClick={disabled ? undefined : handleRadioClick}
    >
      <div className="tyro-radio-inner"></div>
      <div className="tyro-radio-content">{name}</div>
    </div>
  );
};

export default Radio;
