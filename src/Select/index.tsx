import React, { FC } from 'react';
import { SelectProps } from './interface';
import SelectMultiple from './SelectMultiple';
import SelectSingle from './SelectSingle';

import './style/index.less';

const Select: FC<SelectProps> = (props) => {
  const { multiple = false, ...rest } = props;

  return multiple ? (
    <SelectMultiple {...(rest as any)} />
  ) : (
    <SelectSingle {...(rest as any)} />
  );
};

export default Select;
