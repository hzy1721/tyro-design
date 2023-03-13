import React, {
  cloneElement,
  FC,
  ReactElement,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getElementLeft, getElementTop } from '../position';
import { PortalProps } from './interface';

import './style/index.less';

const Portal: FC<PortalProps> = (props) => {
  const {
    children,
    trigger = 'hover',
    position = 'bottom',
    content,
    spacing = 3,
  } = props;
  const [showContent, setShowContent] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const childrenRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current);
    }
    setShowContent(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setShowContent(false);
    }, 100);
  };

  const childrenProps = useMemo<any>(() => {
    let props: any = {
      ref: childrenRef,
    };
    if (trigger === 'hover') {
      props = {
        ...props,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      };
    } else if (trigger === 'click') {
      props = {
        ...props,
        onClick: () => setShowContent((prev) => !prev),
      };
    }
    return props;
  }, [trigger]);

  const newChildren = useMemo(() => {
    if (!children) {
      return undefined;
    }
    if (typeof children === 'string') {
      return children;
    }
    return cloneElement(children as ReactElement, childrenProps);
  }, [children, childrenProps]);

  const [contentTop, contentLeft] = useMemo(() => {
    const childrenWidth = childrenRef.current?.offsetWidth ?? 0;
    const childrenHeight = childrenRef.current?.offsetHeight ?? 0;
    const contentWidth = contentRef.current?.offsetWidth ?? 0;
    const contentHeight = contentRef.current?.offsetHeight ?? 0;
    let top = getElementTop(childrenRef.current);
    let left = getElementLeft(childrenRef.current);
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
  }, [childrenRef.current, contentRef.current, position]);

  const contentProps = useMemo<any>(() => {
    let props: any = {
      ref: contentRef,
      style: {
        position: 'absolute',
        top: contentTop,
        left: contentLeft,
        zIndex: 1030,
        visibility: !showContent ? 'hidden' : undefined,
      },
    };
    if (trigger === 'hover') {
      props = {
        ...props,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      };
    }
    return props;
  }, [contentTop, contentLeft, showContent]);

  const newContent = useMemo(() => {
    if (!content) {
      return undefined;
    }
    if (typeof content === 'string') {
      return content;
    }
    return cloneElement(content as ReactElement, contentProps);
  }, [content, contentProps]);

  return (
    <>
      {newChildren}
      {createPortal(newContent, document.body)}
    </>
  );
};

export default Portal;
