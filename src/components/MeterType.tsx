import ColdWaterIcon from '../../styled/icons/ColdWaterIcon.png';
import HotWaterIcon from '../../styled/icons/HotWaterIcon.png';

export type WaterAreaMeterType = 'ColdWaterAreaMeter' | 'HotWaterAreaMeter';

const TITLE: Record<WaterAreaMeterType, string> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
};

const ICON: Record<WaterAreaMeterType, string> = {
  ColdWaterAreaMeter: ColdWaterIcon,
  HotWaterAreaMeter: HotWaterIcon,
};

export const MeterType = ({ type }: { type: WaterAreaMeterType }) => {
  return (
    <span>
      <img src={ICON[type]} alt="icon" />
      {TITLE[type]}
    </span>
  );
};
