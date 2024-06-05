import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import DeleteIcon from '../styled/icons/DeleteButtonHover.png';
import { DeleteButton, Row } from '../styled/Global.styled';
import { getAddressView } from '../models/AddressModel';
import { metersStore } from '../store/MetersStore';
import { MeterCharacter } from './MeterCharacter';
import { MeterType } from '../models/MeterModel';

export const MeterRow: React.FC<{
  meter: MeterType;
  index: number;
}> = observer(({ meter, index }) => {
  useEffect(() => {
    metersStore.fetchAddresses(meter.area.id);
  }, [meter.area.id]);

  const handleDelete = () => {
    metersStore.deleteMeter(meter.id);
  };

  return (
    <Row>
      <td style={{ textAlign: 'center', padding: '8px' }}>{index}</td>
      <td>
        <MeterCharacter type={meter._type[0]} />
      </td>
      <td>
        {meter.installation_date
          ? new Date(meter.installation_date).toLocaleDateString()
          : 'N/A'}
      </td>
      <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
      <td>{meter.initial_values || 'N/A'}</td>
      <td>{getAddressView(metersStore.addresses)}</td>
      <td>{meter.description || 'N/A'}</td>
      <td style={{ width: '64px' }}>
        <DeleteButton onClick={handleDelete}>
          <img src={DeleteIcon} alt="icon" />
        </DeleteButton>
      </td>
    </Row>
  );
});
