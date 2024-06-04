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
    meterStore.fetchMeters().then(() => {});
  }, []);

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
            <MeterRow key={meter.id} meter={meter} index={index + 1} />
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>...</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
      </Pagination>
    </Container>
  );
});

export default MetersList;
