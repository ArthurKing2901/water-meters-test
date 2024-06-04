import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

export type MeterType = {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  description: string;
  installation_date: string;
  initial_values: number[];
};

const House = types.model('House', {
  id: types.identifier,
  address: types.string,
});

const Address = types.model('Address', {
  id: types.identifier,
  str_number_full: types.string,
  house: House,
});

const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.maybeNull(types.boolean),
  initial_values: types.array(types.number),
  area: types.model({
    id: types.identifier,
  }),
  description: types.string,
});

const MeterStore = types
  .model('MeterStore', {
    meters: types.array(Meter),
    addresses: types.array(Address),
    limit: 20,
    offset: 0,
    totalCount: types.optional(types.number, 0), // добавлено свойство totalCount
  })
  .actions((self) => ({
    fetchMeters: flow(function* () {
      try {
        const response = yield axios.get(
          `http://showroom.eis24.me/api/v4/test/meters/?limit=${self.limit}&offset=${self.offset}`
        );
        self.meters = response.data.results;
        self.totalCount = response.data.count; // сохраняем значение count
      } catch (error) {
        console.error('Failed to fetch counters', error);
      }
    }),

    fetchAddresses: flow(function* (ids: string[]) {
      try {
        const response = yield axios.get(
          `http://showroom.eis24.me/api/v4/test/areas/?id__in=${ids}`
        );
        self.addresses = response.data.results;
      } catch (error) {
        console.error('Failed to fetch addresses', error);
      }
    }),

    deleteMeter: flow(function* (id: string) {
      try {
        yield axios.delete(
          `http://showroom.eis24.me/api/v4/test/meters/${id}/`
        );
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

export const meterStore = MeterStore.create({
  meters: [],
  addresses: [],
});
