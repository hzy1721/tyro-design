import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { SwitchProps } from './interface';

import './style/index.less';

const Switch: FC<SwitchProps> = (props) => {
  const { className, style, defaultChecked = false, checked, onChange } = props;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleSwitchClick = () => {
    onChange && onChange(!internalChecked);
    if (checked === undefined) {
      setInternalChecked(!internalChecked);
    }
  };

  return (
    <div
      className={classNames('tyro-switch', className, {
        [`tyro-switch-checked`]: internalChecked,
      })}
      style={style}
      onClick={handleSwitchClick}
    >
      <div className="tyro-switch-knob"></div>
    </div>
  );
};

export default Switch;
