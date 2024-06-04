import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { meterStore } from '../store/MetersStore';
import MeterRow from './MeterRow';
import {
  Button,
  Container,
  H3,
  Header,
  Pagination,
  Table,
} from '../styled/Global.styled';

const MetersList = observer(() => {
  useEffect(() => {
    meterStore.fetchMeters().then((r) => {});
  }, []);

  const totalPages = Math.ceil(meterStore.totalCount / meterStore.limit);
  const currentPage = Math.floor(meterStore.offset / meterStore.limit) + 1;

  const handlePageClick = (page: number) => {
    meterStore.setPage(page).then((r) => {});
  };

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
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

  return (
    <Container>
      <H3>Список счётчиков</H3>
      <Table>
        <thead>
          <tr>
            <Header>№</Header>
            <Header>Тип</Header>
            <Header>Дата установки</Header>
            <Header>Автоматический</Header>
            <Header>Текущие показания</Header>
            <Header>Адрес</Header>
            <Header>Примечание</Header>
            <Header></Header>
          </tr>
        </thead>
        <tbody>
          {meterStore.meters.map((meter, index) => (
            <MeterRow
              key={meter.id}
              meter={meter}
              index={index + 1 + meterStore.offset}
            />
          ))}
        </tbody>
      </Table>
      <Pagination>{renderPagination()}</Pagination>
    </Container>
  );
});

export default MetersList;
