import React, { useEffect, useState } from 'react';
import DeleteIcon from '../styled/icons/DeleteButtonHover.png';
import ColdWaterIcon from '../styled/icons/ColdWaterIcon.png';
import HotWaterIcon from '../styled/icons/HotWaterIcon.png';

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
  }, [meter.area.id]);

  const handleDelete = () => {
    meterStore.deleteMeter(meter.id);
  };

  return (
    <Row>
      <td style={{ textAlign: 'center', padding: '8px' }}>{index}</td>
      <td>
        {meter._type.includes('ColdWaterAreaMeter') ? (
          <img src={ColdWaterIcon} alt="Cold Water Icon" />
        ) : (
          <img src={HotWaterIcon} alt="Hot Water Icon" />
        )}{' '}
        {meter._type.includes('ColdWaterAreaMeter') ? 'ХВС' : 'ГВС'}
      </td>
      <td>
        {meter.installation_date
          ? new Date(meter.installation_date).toLocaleDateString()
          : 'N/A'}
      </td>
      <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
      <td>{meter.initial_values || 'N/A'}</td>
      <td>{address}</td>
      <td>{meter.description || 'N/A'}</td>
      <td style={{ width: '64px' }}>
        <DeleteButton onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete Button Icon" />
        </DeleteButton>
      </td>
    </Row>
  );
};

export default MeterRow;
