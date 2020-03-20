import { useRemoteData } from 'lib/use-remote-data';
import { Setting } from '../owner.type';

const settingUrl = process.env.REACT_APP_SETTING_URL as string;

export const useSetting = () => {
  return useRemoteData<Setting>(settingUrl);
};
