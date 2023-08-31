import { IconCheckboxTick } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { CheckboxProps } from './interface';

import './style/index.less';

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    style,
    children,
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

  const handleCheckboxClick = () => {
    if (disabled) {
      return;
    }
    onChange && onChange(!internalChecked);
    if (checked === undefined) {
      setInternalChecked(!internalChecked);
    }
  };

  return (
    <div
      className={classNames('tyro-checkbox', {
        'tyro-checkbox-checked': internalChecked,
        'tyro-checkbox-disabled': disabled,
      })}
      onClick={handleCheckboxClick}
      style={style}
    >
      <div className="tyro-checkbox-inner">
        <input
          type="checkbox"
          className="tyro-checkbox-input"
          checked={internalChecked}
          readOnly
          disabled={disabled}
        />
        <div className="tyro-checkbox-display">
          {internalChecked && (
            <IconCheckboxTick
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
        </div>
      </div>
      <div className="tyro-checkbox-label">{children}</div>
    </div>
  );
};

export default Checkbox;
