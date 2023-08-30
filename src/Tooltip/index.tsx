import React, { FC } from 'react';
import Popup from '../util/Popup';
import { TooltipProps } from './interface';

import './style/index.less';

const Tooltip: FC<TooltipProps> = (props) => {
  const { content, ...rest } = props;

  return (
    <Popup
      {...rest}
      content={<div className="tyro-tooltip-content">{content}</div>}
    />
  );
};

export default Tooltip;
