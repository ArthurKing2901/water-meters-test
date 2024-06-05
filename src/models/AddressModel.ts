import { types } from 'mobx-state-tree';

type HouseType = {
  address: string;
  id: string;
  fias_addrobjs: string[];
};

export type AddressType = {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: HouseType;
};

const House = types.model('House', {
  address: types.string,
  id: types.identifier,
  fias_addrobjs: types.array(types.string),
});

export const Address = types.model('Address', {
  id: types.string,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  house: House,
});

export const getAddressView = (address: AddressType | undefined) => {
  const addressView =
    address?.house.address.split(',').slice(1) +
    ', ' +
    address?.str_number_full;

  return addressView || 'N/A';
};
