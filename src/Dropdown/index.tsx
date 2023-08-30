import React, { FC } from 'react';
import Popup from '../util/Popup';
import DropdownItem from './DropdownItem';
import { DropdownProps } from './interface';

import './style/index.less';

const MENU_ITEM_HEIGHT = 36;

const Dropdown: FC<DropdownProps> = (props) => {
  const { menu = [], maxCount = 8, showTick = false, ...rest } = props;

  return (
    <Popup
      {...rest}
      content={
        <div
          className="tyro-dropdown-card"
          style={{ maxHeight: maxCount * MENU_ITEM_HEIGHT }}
        >
          {menu.map((item, index) => (
            <DropdownItem key={index} {...item} showTick={showTick} />
          ))}
        </div>
      }
    />
  );
};

export default Dropdown;
