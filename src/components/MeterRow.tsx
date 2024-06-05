import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import DeleteIcon from '../styled/icons/DeleteButtonHover.png';
import { DeleteButton, Row } from '../styled/Global.styled';
import { metersStore } from '../store/MetersStore';
import { MeterAffil } from './MeterAffil';
import { MeterType } from '../models/MeterModel';
import { AddressType } from '../models/AddressModel';

const getAddressView = (address: AddressType | undefined) => {
  const addressView =
    address?.house.address.split(',').slice(1) + ' ' + address?.str_number_full;

  return addressView || 'N/A';
};

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
        <MeterAffil type={meter._type[0]} />
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
          <img src={DeleteIcon} alt="Delete Button Icon" />
        </DeleteButton>
      </td>
    </Row>
  );
});
