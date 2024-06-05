import React from 'react';

import { Container } from './styled/Global.styled';
import { MetersList } from './components/MetersList';
import { metersStore } from './store/MetersStore';

export const App = () => {
  return (
    <Container>
      <MetersList />

      {metersStore.meters.map((meter) => (
        <div key={meter.id}></div>
      ))}
    </Container>
  );
};
