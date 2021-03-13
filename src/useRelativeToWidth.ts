import {useWindowDimensions} from 'react-native';

import {UseRelativeToWidth} from './types';

export const useRelativeToWidth = (): UseRelativeToWidth => {
  const {width, height} = useWindowDimensions();

  return {
    width,
    height,
    orientation: width < height ? 'portrait' : 'landscape',
    rw: Math.round((width >= 600 ? width / 1440 : width / 1080) * 1e3) / 1e3,
  };
};
