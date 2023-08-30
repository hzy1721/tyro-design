import { RefObject, useCallback, useLayoutEffect, useState } from 'react';
import { getElementLeft, getElementTop } from '../../position';

export interface PortalElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const useElementRect = (ref: RefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState<PortalElementRect | null>(null);

  const updateRect = useCallback(() => {
    if (ref.current) {
      const top = getElementTop(ref.current);
      const left = getElementLeft(ref.current);
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setRect({ top, left, width, height });
    }
  }, []);

  useLayoutEffect(() => {
    updateRect();
  }, []);

  return [rect, updateRect] as [typeof rect, typeof updateRect];
};
