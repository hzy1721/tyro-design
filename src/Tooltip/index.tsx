import React, { FC } from 'react';
import Portal from '../util/Portal';
import { TooltipProps } from './interface';

import './style/index.less';

const Tooltip: FC<TooltipProps> = (props) => {
  const { content, ...rest } = props;

  return (
    <Portal
      {...rest}
      content={<div className="tyro-tooltip-content">{content}</div>}
    />
  );
};

export default Tooltip;
