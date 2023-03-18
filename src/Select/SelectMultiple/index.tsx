import { IconChevronDown } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Dropdown from '../../Dropdown';
import Space from '../../Space';
import Tag from '../../Tag';
import { SelectOptionValue } from '../interface';
import { SelectMultipleProps } from './interface';

const SelectMultiple: FC<SelectMultipleProps> = (props) => {
  const {
    className,
    style,
    optionList = [],
    defaultValue = [],
    value: externalValue,
    onChange,
    triggerRender,
    position = 'bottomLeft',
  } = props;

  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const valueSet = useMemo(
    () => new Set<string | number>(internalValue as number[]),
    [internalValue],
  );

  const optionValueLabelMap = useMemo(
    () => new Map(optionList.map(({ value, label }) => [value, label])),
    [optionList],
  );

  const internalLabel = useMemo(() => {
    return (
      <Space spacing={3}>
        {internalValue.map((val) => (
          <Tag key={val}>{val}</Tag>
        ))}
      </Space>
    );
  }, [internalValue, optionValueLabelMap]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleOptionClick = (value: SelectOptionValue) => {
    if (valueSet.has(value)) {
      valueSet.delete(value);
    } else {
      valueSet.add(value);
    }
    const newValue = Array.from(valueSet) as string[] | number[];
    if (externalValue === undefined) {
      setInternalValue(newValue);
    }
    onChange && onChange(newValue);
  };

  return (
    <Dropdown
      menu={optionList.map(({ value, label }) => ({
        name: label ?? String(value),
        onClick: () => {
          handleOptionClick(value);
        },
        active: valueSet.has(value),
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

export default SelectMultiple;
