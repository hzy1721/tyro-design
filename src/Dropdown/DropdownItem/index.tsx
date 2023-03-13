import React, { FC } from 'react';
import { DropdownItemProps } from './interface';

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { name, onClick } = props;

  return (
    <div className="tyro-dropdown-item" onClick={onClick}>
      {name}
    </div>
  );
};

export default DropdownItem;
