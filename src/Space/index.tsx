import React, { FC } from 'react';
import { SizeType } from '../global/constant/size';

export interface SpaceProps {
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  spacing?: SizeType | number;
}

const Space: FC<SpaceProps> = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Space;
