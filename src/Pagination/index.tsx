import { IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { PaginationProps } from './interface';

import './style/index.less';

const Pagination: FC<PaginationProps> = (props) => {
  const {
    total = 1,
    pageSize = 10,
    currentPage,
    defaultCurrentPage = 1,
    onPageChange,
    showTotal = false,
    showDetail = false,
    size,
    className,
    style,
  } = props;

  const [internalPage, setInternalPage] = useState(defaultCurrentPage);

  useEffect(() => {
    if (currentPage !== undefined) {
      setInternalPage(currentPage);
    }
  }, [currentPage]);

  const pageNum = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const genPageItemClassName = (page: number) => {
    return classNames('tyro-pagination-item', {
      'tyro-pagination-item-active': page === internalPage,
    });
  };

  const genPrevItemClassName = () => {
    return classNames('tyro-pagination-item', {
      'tyro-pagination-item-disabled': internalPage <= 1,
    });
  };

  const genNextItemClassName = () => {
    return classNames('tyro-pagination-item', {
      'tyro-pagination-item-disabled': internalPage >= pageNum,
    });
  };

  const handleClickPrev = () => {
    if (internalPage <= 1) {
      return;
    }
    const newPage = internalPage - 1;
    if (currentPage === undefined) {
      setInternalPage(newPage);
    }
    onPageChange && onPageChange(newPage);
  };

  const handleClickNext = () => {
    if (internalPage >= pageNum) {
      return;
    }
    const newPage = internalPage + 1;
    if (currentPage === undefined) {
      setInternalPage(newPage);
    }
    onPageChange && onPageChange(newPage);
  };

  const handleClickPage = (page: number) => {
    if (page < 1 || page > pageNum) {
      return;
    }
    if (currentPage === undefined) {
      setInternalPage(page);
    }
    onPageChange && onPageChange(page);
  };

  const renderPaginationDetail = () => {
    const start = (internalPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, total);
    return (
      <div className="tyro-pagination-info">
        显示第 {start} 条 - 第 {end} 条，共 {total} 条
      </div>
    );
  };

  const renderSmallPageItem = () => (
    <div className="tyro-pagination-item tyro-pagination-item-small">
      {internalPage}/{pageNum}
    </div>
  );

  const renderPageItemList = () =>
    Array.from({ length: pageNum }, (_, index) => index + 1).map((page) => (
      <div
        key={page}
        className={genPageItemClassName(page)}
        onClick={() => handleClickPage(page)}
      >
        {page}
      </div>
    ));

  return (
    <div
      className={classNames('tyro-pagination-wrapper', className)}
      style={style}
    >
      {showDetail && renderPaginationDetail()}
      <div className="tyro-pagination">
        {!showDetail && showTotal && (
          <div className="tyro-pagination-total">共 {pageNum} 页</div>
        )}
        <div className={genPrevItemClassName()} onClick={handleClickPrev}>
          <IconChevronLeft />
        </div>
        {size === 'small' ? renderSmallPageItem() : renderPageItemList()}
        <div className={genNextItemClassName()} onClick={handleClickNext}>
          <IconChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
