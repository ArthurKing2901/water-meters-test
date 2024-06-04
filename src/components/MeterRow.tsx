import React, { useEffect, useState } from 'react';
import { meterStore } from '../store/MetersStore';
import { DeleteButton, Row } from '../styled/Global.styled';

const MeterRow: React.FC<{ meter: any; index: number }> = ({
  meter,
  index,
}) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    meterStore.fetchAddresses(meter.area.id).then(() => {
      const address = meterStore.addresses.find(
        (address) => address.id === meter.area.id
      );
      if (address) {
        setAddress(
          address.house.address.split(',').slice(1) +
            ', ' +
            address.str_number_full
        );
      }
    });
  }, []);

  const handleDelete = () => {
    meterStore.deleteMeter(meter.id);
  };

  return (
    <Row>
      <td>{index}</td>
      <td>{meter._type.includes('ColdWaterAreaMeter') ? '💧ХВС' : '🔥ГВС'}</td>
      <td>
        {meter.installation_date
          ? new Date(meter.installation_date).toLocaleDateString()
          : 'N/A'}
      </td>
      <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
      <td>{meter.initial_values || 'N/A'}</td>
      <td>{address}</td>
      <td>{meter.description || 'N/A'}</td>
      <td style={{ width: '70px' }}>
        <DeleteButton onClick={handleDelete}>Удалить</DeleteButton>
      </td>
    </Row>
  );
};

export default MeterRow;
