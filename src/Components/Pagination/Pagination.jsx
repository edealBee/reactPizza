import React from 'react';
import './Pagination.css';
import ReactPaginate from 'react-paginate';

const Pagination = ({ value, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className="Pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(el) => onChangePage(el.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
