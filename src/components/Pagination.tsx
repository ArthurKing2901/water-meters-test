import React from 'react';

import { Button } from '../styled/Global.styled';
import { metersStore } from '../store/MetersStore';

export const Pagination = () => {
  const totalPages = Math.ceil(metersStore.totalCount / metersStore.limit);
  const currentPage = Math.floor(metersStore.offset / metersStore.limit) + 1;

  const handlePageClick = (page: number) => {
    metersStore.setPage(page);
  };

  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button onClick={() => handlePageClick(i)} disabled={currentPage === i}>
          {i}
        </Button>
      );
    }
  } else {
    pages.push(
      <Button
        key={1}
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>
    );

    if (currentPage > 3) {
      pages.push(
        <Button key="start-ellipsis" disabled>
          ...
        </Button>
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <Button key="end-ellipsis" disabled>
          ...
        </Button>
      );
    }

    pages.push(
      <Button
        key={totalPages}
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </Button>
    );
  }

  return pages;
};
