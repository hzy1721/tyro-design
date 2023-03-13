import React, { FC } from 'react';
import Portal from '../util/Portal';
import DropdownItem from './DropdownItem';
import { DropdownProps } from './interface';

import './style/index.less';

const Dropdown: FC<DropdownProps> = (props) => {
  const { menu = [], ...rest } = props;

  return (
    <Portal
      {...rest}
      content={
        <div className="tyro-dropdown-card">
          {menu.map((item, index) => (
            <DropdownItem key={index} {...item} />
          ))}
        </div>
      }
    />
  );
};

export default Dropdown;
