import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { PortalProps } from './interface';

import './style/index.less';

const Portal: FC<PortalProps> = (props) => {
  const { children, top = 0, left = 0, visible } = props;

  return visible
    ? createPortal(
        <div className="tyro-portal" style={{ top, left }}>
          {children}
        </div>,
        document.body,
      )
    : null;
};

export default Portal;
