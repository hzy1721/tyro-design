import { IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons';
import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown';
import Select from '../Select';
import { PaginationProps } from './interface';

import './style/index.less';

const Pagination: FC<PaginationProps> = (props) => {
  const {
    className,
    style,
    total = 1,
    pageSize = 10,
    currentPage,
    defaultCurrentPage = 1,
    onPageChange,
    showTotal = false,
    showDetail = false,
    showSizeChanger = false,
    pageSizeOpts = [10, 20, 40, 100],
    onPageSizeChange,
    onChange,
    size,
  } = props;

  const [internalPage, setInternalPage] = useState(defaultCurrentPage);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);

  useEffect(() => {
    if (currentPage !== undefined) {
      setInternalPage(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    setInternalPageSize(pageSize);
  }, [pageSize]);

  const pageNum = useMemo(() => {
    return Math.ceil(total / internalPageSize);
  }, [total, internalPageSize]);

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
    onChange && onChange(newPage, internalPageSize);
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
    onChange && onChange(newPage, internalPageSize);
  };

  const handleClickPage = (page: number) => {
    if (page < 1 || page > pageNum) {
      return;
    }
    if (currentPage === undefined) {
      setInternalPage(page);
    }
    onPageChange && onPageChange(page);
    onChange && onChange(page, internalPageSize);
  };

  const renderPaginationDetail = () => {
    const start = (internalPage - 1) * internalPageSize + 1;
    const end = Math.min(start + internalPageSize - 1, total);
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

  const renderPageItem = (page: number) => (
    <div
      key={page}
      className={genPageItemClassName(page)}
      onClick={() => handleClickPage(page)}
    >
      {page}
    </div>
  );

  const renderSerialPageItem = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index).map(
      (page) => renderPageItem(page),
    );

  const renderDropdownPageItem = (start: number, end: number) => (
    <Dropdown
      menu={Array.from(
        { length: end - start + 1 },
        (_, index) => start + index,
      ).map((page) => ({
        name: String(page),
        onClick: () => handleClickPage(page),
        className: 'tyro-pagination-dropdown-item',
      }))}
      key={`${start}_${end}`}
    >
      <div className="tyro-pagination-item">...</div>
    </Dropdown>
  );

  const renderPageItemList = () => {
    if (pageNum <= 7) {
      return renderSerialPageItem(1, pageNum);
    } else {
      if (internalPage <= 4) {
        return (
          <>
            {renderSerialPageItem(1, 5)}
            {renderDropdownPageItem(6, pageNum - 1)}
            {renderPageItem(pageNum)}
          </>
        );
      } else if (internalPage > pageNum - 4) {
        return (
          <>
            {renderPageItem(1)}
            {renderDropdownPageItem(2, pageNum - 5)}
            {renderSerialPageItem(pageNum - 4, pageNum)}
          </>
        );
      } else {
        return (
          <>
            {renderPageItem(1)}
            {renderDropdownPageItem(2, internalPage - 2)}
            {renderSerialPageItem(internalPage - 1, internalPage + 1)}
            {renderDropdownPageItem(internalPage + 2, pageNum - 1)}
            {renderPageItem(pageNum)}
          </>
        );
      }
    }
  };

  const handlePageSizeChange = (pageSize: number) => {
    if ((internalPage - 1) * pageSize + 1 > total) {
      const newPageNum = Math.ceil(total / pageSize);
      setInternalPage(newPageNum);
      onPageChange && onPageChange(newPageNum);
      onChange && onChange(newPageNum, pageSize);
    }
    setInternalPageSize(pageSize);
    onPageSizeChange && onPageSizeChange(pageSize);
  };

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
        {showSizeChanger && (
          <Select
            optionList={pageSizeOpts.map((size) => ({
              value: size,
              label: `每页条数：${size}`,
            }))}
            value={internalPageSize}
            onChange={(value) => handlePageSizeChange(value as number)}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
