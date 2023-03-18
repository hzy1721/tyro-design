import classNames from 'classnames';
import React, { FC } from 'react';
import { TagProps } from './interface';

import './style/index.less';

const Tag: FC<TagProps> = (props) => {
  const { children, className, style, color = 'white' } = props;

  return (
    <div
      className={classNames('tyro-tag', `tyro-tag-${color}`, className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Tag;
