import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [pageRange, setPageRange] = useState(5);
  const [marginPages, setMarginPages] = useState(1);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  const NextIcon = () => (
    <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9H24V7H1V9Z"
        fill={currentPage === totalPages ? '#737373' : '#000'}
      />
    </svg>
  );

  const PreviousIcon = () => (
    <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 7C24.5523 7 25 7.44772 25 8C25 8.55228 24.5523 9 24 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM24 9H1V7H24V9Z"
        fill={currentPage === 1 ? '#737373' : '#000'}
      />
    </svg>
  );

  const updatePaginationSettings = () => {
    if (window.innerWidth < 960) {
      setPageRange(3);
      setMarginPages(0);
    } else {
      setPageRange(5);
      setMarginPages(1);
    }
  };

  useEffect(() => {
    updatePaginationSettings();
    window.addEventListener('resize', updatePaginationSettings);
    return () => window.removeEventListener('resize', updatePaginationSettings);
  }, []);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<NextIcon />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRange}
      marginPagesDisplayed={marginPages}
      pageCount={totalPages}
      previousLabel={<PreviousIcon />}
      forcePage={currentPage - 1}
      containerClassName="pagination"
      activeClassName="pagination__item--active"
      pageClassName="pagination__item"
      pageLinkClassName="pagination__item-link"
      previousClassName="pagination__item"
      nextClassName="pagination__item"
      previousLinkClassName="pagination__item-link"
      nextLinkClassName="pagination__item-link"
      breakClassName="pagination__item"
      breakLinkClassName="pagination__item-link"
      disabledClassName="pagination__item-disabled"
    />
  );
}

export default Pagination;
