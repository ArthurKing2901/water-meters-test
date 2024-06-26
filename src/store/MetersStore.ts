import axios from 'axios';
import { types, flow } from 'mobx-state-tree';

import { Address } from '../models/AddressModel';
import { baseURL } from '../models/baseURL';
import { Meter } from '../models/MeterModel';

const LIMIT = 20;

const MetersStore = types
  .model('MetersStore', {
    meters: types.array(Meter),
    addresses: Address,
    limit: LIMIT,
    offset: 0,
    totalCount: types.optional(types.number, 0), // добавлено свойство totalCount
  })
  .actions((self) => ({
    fetchMeters: flow(function* () {
      try {
        const response = yield axios.get(
          `${baseURL}/meters/?limit=${self.limit}&offset=${self.offset}`
        );
        self.meters = response.data.results;
        self.totalCount = response.data.count; // сохраняем значение count
      } catch (error) {
        console.error('Failed to fetch counters', error);
      }
    }),

    fetchAddresses: flow(function* (id: string) {
      try {
        const response = yield axios.get(`${baseURL}/areas/?id__in=${id}`);
        self.addresses = response.data.results[0];
      } catch (error) {
        console.error('Failed to fetch addresses', error);
      }
    }),

    deleteMeter: flow(function* (id: string) {
      try {
        yield axios.delete(`${baseURL}/meters/${id}/`);
        // @ts-ignore
        self.meters = self.meters.filter((meter) => meter.id !== id);
        if (self.meters.length < self.limit) {
          // @ts-ignore
          yield self.fetchMeters();
        }
      } catch (error) {
        console.error('Failed to delete counter', error);
      }
    }),

    setPage: flow(function* (page) {
      self.offset = (page - 1) * self.limit;
      // @ts-ignore
      yield self.fetchMeters();
    }),
  }));

export const metersStore = MetersStore.create({
  meters: [],
  addresses: {
    id: '',
    number: 0,
    str_number: '',
    str_number_full: '',
    house: {
      address: '',
      id: '',
      fias_addrobjs: [],
    },
  },
});
