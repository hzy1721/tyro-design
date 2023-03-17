import { IconTick } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC } from 'react';
import { DropdownItemProps } from './interface';

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { name, onClick, className, style, active, showTick } = props;

  return (
    <div
      className={classNames('tyro-dropdown-item', className, {
        'tyro-dropdown-item-tick': showTick,
      })}
      onClick={onClick}
      style={style}
    >
      {showTick &&
        (active ? (
          <IconTick style={{ marginRight: 9 }} />
        ) : (
          <div style={{ width: 25 }}></div>
        ))}
      {name}
    </div>
  );
};

export default DropdownItem;
