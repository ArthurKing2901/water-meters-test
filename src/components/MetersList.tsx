import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import {
  Container,
  Footer,
  H3,
  Header,
  Table,
  TableContainer,
} from '../styled/Global.styled';
import { metersStore } from '../store/MetersStore';
import { MeterRow } from './MeterRow';
import { MeterType } from '../models/MeterModel';
import { Pagination } from './Pagination';

export const MetersList = observer(() => {
  useEffect(() => {
    metersStore.fetchMeters();
  }, []);

  return (
    <Container>
      <H3>Список счётчиков</H3>
      <TableContainer>
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
            {metersStore.meters.map((meter, index) => (
              <MeterRow
                key={meter.id}
                meter={meter as MeterType}
                index={index + 1 + metersStore.offset}
              />
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <Footer>{Pagination()}</Footer>
    </Container>
  );
});
