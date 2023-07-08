import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(totalItems / itemsPerPage);

  if (pagesCount === 1) return null;

  let firstNumber = 1;
  let lastNumber = 1;
  const additionalNumbers = 2;
  let countOfNumbers = additionalNumbers * 2 + 1;

  if (countOfNumbers >= pagesCount) {
    countOfNumbers = pagesCount;
  } else {
    firstNumber = Math.max(currentPage - additionalNumbers, 1);
    lastNumber = Math.min(currentPage + additionalNumbers, pagesCount);

    if (lastNumber === pagesCount) {
      firstNumber += lastNumber - firstNumber - additionalNumbers * 2;
    }
  }

  const pageNumbers = Array.from(
    { length: countOfNumbers },
    (_, i) => i + firstNumber
  );

  return (
    <div className={style.paginationContainer}>
      <div
        onClick={() => onPageChange(1)}
        className={`${style.paginationItem} ${
          currentPage === 1 ? style.disabled : ""
        }`}
        title="First Page"
      >
        First
      </div>
      <div
        onClick={() => onPageChange(currentPage - 1)}
        className={`${style.paginationItem} ${
          currentPage === 1 ? style.disabled : ""
        }`}
        title="Previous"
      >
        Previous
      </div>
      {pageNumbers.map((number) => (
        <div
          key={number}
          className={`${style.paginationItem} ${
            currentPage === number ? style.selected : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </div>
      ))}
      <div
        onClick={() => onPageChange(currentPage + 1)}
        className={`${style.paginationItem} ${
          currentPage === pagesCount ? style.disabled : ""
        }`}
        title="Next"
      >
        Next
      </div>
      <div
        onClick={() => onPageChange(pagesCount)}
        className={`${style.paginationItem} ${
          currentPage === pagesCount ? style.disabled : ""
        }`}
        title="Last Page"
      >
        Last
      </div>
    </div>
  );
};

export default Pagination;
