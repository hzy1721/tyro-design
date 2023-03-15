import classNames from 'classnames';
import React, { FC } from 'react';
import { DropdownItemProps } from './interface';

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { name, onClick, className, style } = props;

  return (
    <div
      className={classNames('tyro-dropdown-item', className)}
      onClick={onClick}
      style={style}
    >
      {name}
    </div>
  );
};

export default DropdownItem;
