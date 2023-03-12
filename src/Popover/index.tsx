import React, { FC } from 'react';
import Portal from '../util/Portal';
import { PopoverProps } from './interface';

import './style/index.less';

const Popover: FC<PopoverProps> = (props) => {
  const { content, ...rest } = props;

  return (
    <Portal
      {...rest}
      content={<div className="tyro-popover-card">{content}</div>}
    />
  );
};

export default Popover;
