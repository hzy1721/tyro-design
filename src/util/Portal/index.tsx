import React, {
  cloneElement,
  FC,
  ReactElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useContentPosition } from './hooks/useContentPosition';
import { useElementRect } from './hooks/useElementRect';
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
  const [childrenRect] = useElementRect(childrenRef);
  const [contentRect, updateContentRect] = useElementRect(contentRef);
  const contentPosition = useContentPosition(
    childrenRect,
    contentRect,
    position,
    spacing,
  );

  useLayoutEffect(() => {
    if (showContent) {
      updateContentRect();
    }
  }, [showContent]);

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
    }, 50);
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

  const contentProps = useMemo<any>(() => {
    const [contentTop, contentLeft] = contentPosition;
    let props: any = {
      ref: contentRef,
      style: {
        position: 'absolute',
        top: contentTop,
        left: contentLeft,
        zIndex: 1030,
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
  }, [contentPosition, trigger]);

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
      {showContent && createPortal(newContent, document.body)}
    </>
  );
};

export default Portal;
