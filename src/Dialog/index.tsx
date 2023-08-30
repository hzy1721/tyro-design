import { IconClose } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, MouseEventHandler, useRef } from 'react';
import Space from 'tyro-design/Space';
import Button from '../Button';
import { ButtonProps } from '../Button/interface';
import Portal from '../util/Portal';
import { DialogProps } from './interface';

import './style/index.less';

const defaultOkProps: ButtonProps = {
  children: '确定',
  theme: 'solid',
};

const defaultCancelProps: ButtonProps = {
  children: '取消',
};

const Dialog: FC<DialogProps> = (props) => {
  const {
    className,
    style,
    children,
    title,
    footer,
    okProps,
    cancelProps,
    closable = true,
    maskClosable = true,
    visible = false,
    size = 'small',
    onClose,
  } = props;

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickMask: MouseEventHandler<HTMLDivElement> = (event) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose && onClose();
    }
  };

  return (
    <Portal visible={visible}>
      <div
        className="tyro-modal-mask"
        onClick={maskClosable ? handleClickMask : undefined}
      >
        <div className="tyro-modal">
          <div
            className={classNames(
              'tyro-dialog',
              `tyro-dialog-${size}`,
              className,
            )}
            style={style}
            ref={dialogRef}
          >
            <div className="tyro-dialog-header">
              <div className="tyro-dialog-title">{title}</div>
              {closable && (
                <Button
                  theme="borderless"
                  type="tertiary"
                  size="small"
                  icon={
                    <IconClose
                      className="tyro-dialog-close"
                      onClick={onClose}
                    />
                  }
                />
              )}
            </div>
            <div className="tyro-dialog-content">{children}</div>
            <div className="tyro-dialog-footer">
              {footer}
              {!footer && (
                <Space>
                  <Button {...defaultCancelProps} {...(cancelProps ?? {})} />
                  <Button {...defaultOkProps} {...(okProps ?? {})} />
                </Space>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Dialog;
