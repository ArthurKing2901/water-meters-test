import React, { useEffect, useState } from 'react';
import MetersList from './components/MetersList';
import styled from 'styled-components';
import { meterStore, MeterType } from './store/MetersStore';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  return (
    <Container>
      <MetersList />
      {meterStore.meters.map((meter) => (
        <div key={meter.id}></div>
      ))}
    </Container>
  );
};

export default App;
