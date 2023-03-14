import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { SpaceProps } from './interface';

import './style/index.less';

const Space: FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    children,
    vertical = false,
    align = 'center',
    spacing = 'tight',
  } = props;

  const gapSizeMap = new Map([
    ['tight', 8],
    ['medium', 16],
    ['loose', 24],
  ]);
  const gapSize = useMemo(() => {
    if (typeof spacing === 'string' && gapSizeMap.has(spacing)) {
      return gapSizeMap.get(spacing);
    }
    if (typeof spacing === 'number') {
      return spacing;
    }
    return gapSizeMap.get('tight');
  }, [spacing]);

  return (
    <div
      className={classNames(
        'tyro-space',
        `tyro-space-align-${align}`,
        {
          'tyro-space-vertical': vertical,
        },
        className,
      )}
      style={{
        gap: gapSize,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Space;
