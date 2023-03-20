import { IconChevronRight, IconTreeTriangleRight } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { ExpandButtonProps } from './interface';

import './style/index.less';

const ExpandButton: FC<ExpandButtonProps> = (props) => {
  const {
    className,
    style,
    defaultExpanded = false,
    expanded,
    onChange,
    icon = 'triangle',
  } = props;

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (expanded !== undefined) {
      setInternalExpanded(expanded);
    }
  }, [expanded]);

  const handleClick = () => {
    if (expanded === undefined) {
      setInternalExpanded(!internalExpanded);
    }
    onChange && onChange(!internalExpanded);
  };

  if (icon === 'triangle') {
    return (
      <IconTreeTriangleRight
        className={classNames('tyro-table-expand-button', className, {
          'tyro-table-expand-button-expanded': internalExpanded,
        })}
        style={{
          ...style,
          fontSize: 14,
        }}
        onClick={handleClick}
      />
    );
  }
  if (icon === 'chevron') {
    return (
      <IconChevronRight
        className={classNames('tyro-table-expand-button', className, {
          'tyro-table-expand-button-expanded': internalExpanded,
        })}
        style={style}
        onClick={handleClick}
      />
    );
  }
  return null;
};

export default ExpandButton;
