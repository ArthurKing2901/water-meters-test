import { types } from 'mobx-state-tree';

export type MeterType = {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
};

export const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  area: types.model({
    id: types.identifier,
  }),
  is_automatic: types.maybeNull(types.boolean),
  communication: types.string,
  description: types.string,
  serial_number: types.string,
  installation_date: types.string,
  brand_name: types.maybeNull(types.string),
  model_name: types.maybeNull(types.string),
  initial_values: types.array(types.number),
});
