import { IconChevronDown } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown';
import { SelectOptionValue, SelectProps } from './interface';

import './style/index.less';

const Select: FC<SelectProps> = (props) => {
  const {
    className,
    style,
    optionList = [],
    defaultValue,
    value: externalValue,
    onChange,
  } = props;

  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const optionValueLabelMap = useMemo(
    () => new Map(optionList.map(({ value, label }) => [value, label])),
    [optionList],
  );

  const internalLabel = useMemo(() => {
    if (internalValue && optionValueLabelMap.has(internalValue)) {
      return optionValueLabelMap.get(internalValue);
    }
    return '';
  }, [internalValue, optionValueLabelMap]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleOptionClick = (value: SelectOptionValue) => {
    if (externalValue === undefined) {
      setInternalValue(value);
    }
    onChange && onChange(value);
  };

  return (
    <Dropdown
      menu={optionList.map((option) => ({
        name: option.label ?? String(option.value),
        onClick: () => {
          handleOptionClick(option.value);
          setVisible(false);
        },
      }))}
      trigger="click"
      position="bottomLeft"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <div
        className={classNames('tyro-select', className, {
          'tyro-select-open': visible,
        })}
        style={style}
      >
        <div className="tyro-select-selection">{internalLabel}</div>
        <div className="tyro-select-arrow">
          <IconChevronDown />
        </div>
      </div>
    </Dropdown>
  );
};

export default Select;
