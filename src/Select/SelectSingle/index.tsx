import { IconChevronDown } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Dropdown from '../../Dropdown';
import { SelectOptionValue } from '../interface';
import { SelectSingleProps } from './interface';

const SelectSingle: FC<SelectSingleProps> = (props) => {
  const {
    className,
    style,
    optionList = [],
    defaultValue,
    value: externalValue,
    onChange,
    triggerRender,
    position = 'bottomLeft',
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
      menu={optionList.map(({ value, label }) => ({
        name: label ?? String(value),
        onClick: () => {
          setVisible(false);
          handleOptionClick(value);
        },
        active: value === internalValue,
      }))}
      trigger="click"
      position={position}
      visible={visible}
      onVisibleChange={setVisible}
      showTick
    >
      {triggerRender ? (
        triggerRender(visible, internalValue)
      ) : (
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
      )}
    </Dropdown>
  );
};

export default SelectSingle;
