import classNames from 'classnames';
import React, { FC } from 'react';
import { EmptyInternalImage, EmptyProps } from './interface';

import PRESENTED_IMAGE_DEFAULT from './img/PRESENTED_IMAGE_DEFAULT.svg';
import PRESENTED_IMAGE_SIMPLE from './img/PRESENTED_IMAGE_SIMPLE.svg';
import './style/index.less';

const Empty: FC<EmptyProps> & EmptyInternalImage = (props) => {
  const { image, title, description, children, layout = 'vertical' } = props;

  return (
    <div
      className={classNames('tyro-empty', {
        'tyro-empty-horizontal': layout === 'horizontal',
      })}
    >
      <div className="tyro-empty-image">
        {typeof image === 'string' ? <img src={image} /> : image}
      </div>
      <div className="tyro-empty-content">
        <div className="tyro-empty-title">{title}</div>
        <div className="tyro-empty-description">{description}</div>
        {children && <div className="tyro-empty-footer">{children}</div>}
      </div>
    </div>
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
Empty.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;

export default Empty;
