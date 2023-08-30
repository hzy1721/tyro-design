import React, {
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Portal from '../Portal';
import { useContentPosition } from './hooks/useContentPosition';
import { useElementRect } from './hooks/useElementRect';
import { PopupProps } from './interface';

const Popup: FC<PopupProps> = (props) => {
  const {
    children,
    trigger = 'hover',
    position = 'bottom',
    content,
    spacing = 3,
    visible: externalVisible,
    onVisibleChange,
  } = props;

  const [internalVisible, setInternalVisible] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const childrenRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [childrenRect, updateChildrenRect] = useElementRect(childrenRef);
  const [contentRect, updateContentRect] = useElementRect(contentRef);
  const contentPosition = useContentPosition(
    childrenRect,
    contentRect,
    position,
    spacing,
  );

  const [contentTop, contentLeft] = contentPosition;

  useEffect(() => {
    if (externalVisible !== undefined) {
      setInternalVisible(externalVisible);
    }
  }, [externalVisible]);

  useLayoutEffect(() => {
    if (internalVisible) {
      updateChildrenRect();
      updateContentRect();
    }
  }, [internalVisible]);

  const handleVisibleChange = (visible: boolean) => {
    if (externalVisible === undefined) {
      setInternalVisible(visible);
    }
    onVisibleChange && onVisibleChange(visible);
  };

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current);
    }
    handleVisibleChange(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      handleVisibleChange(false);
    }, 50);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!e.target) {
      return;
    }
    const target = e.target as Node;
    if (childrenRef.current?.contains(target)) {
      return;
    }
    if (contentRef.current?.contains(target)) {
      return;
    }
    handleVisibleChange(false);
  };

  useEffect(() => {
    if (trigger === 'click') {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [trigger]);

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
    }
    if (trigger === 'click') {
      props = {
        ...props,
        onClick: () => handleVisibleChange(!internalVisible),
      };
    }
    return props;
  }, [trigger, internalVisible]);

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
    let props: any = {
      ref: contentRef,
    };
    if (trigger === 'hover') {
      props = {
        ...props,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      };
    }
    return props;
  }, [trigger]);

  const newContent = useMemo(() => {
    if (!content) {
      return undefined;
    }
    if (typeof content === 'string') {
      return content;
    }
    return cloneElement(content as ReactElement, contentProps);
  }, [content, contentPosition, contentProps]);

  return (
    <>
      {newChildren}
      <Portal top={contentTop} left={contentLeft} visible={internalVisible}>
        {newContent}
      </Portal>
    </>
  );
};

export default Popup;
