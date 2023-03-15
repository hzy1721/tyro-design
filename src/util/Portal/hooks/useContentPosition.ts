import { PortalPosition } from '../interface';
import { PortalElementRect } from './useElementRect';

export const useContentPosition = (
  childrenRect: PortalElementRect | null,
  contentRect: PortalElementRect | null,
  position: PortalPosition,
  spacing: number,
): [number, number] => {
  const childrenWidth = childrenRect?.width ?? 0;
  const childrenHeight = childrenRect?.height ?? 0;
  const contentWidth = contentRect?.width ?? 0;
  const contentHeight = contentRect?.height ?? 0;
  let top = childrenRect?.top ?? 0;
  let left = childrenRect?.left ?? 0;
  switch (position) {
    case 'topLeft':
      top -= contentHeight + spacing;
      break;
    case 'top':
      top -= contentHeight + spacing;
      left -= (contentWidth - childrenWidth) / 2;
      break;
    case 'topRight':
      top -= contentHeight + spacing;
      left -= contentWidth - childrenWidth;
      break;
    case 'leftTop':
      left -= contentWidth + spacing;
      break;
    case 'left':
      top -= (contentHeight - childrenHeight) / 2;
      left -= contentWidth + spacing;
      break;
    case 'leftBottom':
      top -= contentHeight - childrenHeight;
      left -= contentWidth + spacing;
      break;
    case 'rightTop':
      left += childrenWidth + spacing;
      break;
    case 'right':
      top -= (contentHeight - childrenHeight) / 2;
      left += childrenWidth + spacing;
      break;
    case 'rightBottom':
      top -= contentHeight - childrenHeight;
      left += childrenWidth + spacing;
      break;
    case 'bottomLeft':
      top += childrenHeight + spacing;
      break;
    case 'bottom':
      top += childrenHeight + spacing;
      left -= (contentWidth - childrenWidth) / 2;
      break;
    case 'bottomRight':
      top += childrenHeight + spacing;
      left -= contentWidth - childrenWidth;
      break;
  }
  return [top, left];
};
