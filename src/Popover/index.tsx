import React, { FC } from 'react';
import Popup from '../util/Popup';
import { PopoverProps } from './interface';

import './style/index.less';

const Popover: FC<PopoverProps> = (props) => {
  const { content, ...rest } = props;

  return (
    <Popup
      {...rest}
      content={<div className="tyro-popover-card">{content}</div>}
    />
  );
};

export default Popover;
