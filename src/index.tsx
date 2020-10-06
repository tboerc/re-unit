import React, {useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import {NAMEDSTYLES, STATE} from './types';
import blacklist from './blacklist';

const checkBlackList = (key: string) => !blacklist.some((value) => key == value);

const defaultValue: STATE = {re: 1};
const Context = React.createContext(defaultValue);

export const ResponsiveProvider: React.FunctionComponent = ({children}) => {
  const {width, height} = useWindowDimensions();

  const orientation = width < height ? 'portrait' : 'landscape';
  const re = Math.round((width >= 600 ? width / 1440 : width / 1080) * 1e3) / 1e3;

  return <Context.Provider value={{re, width, height, orientation}}>{children}</Context.Provider>;
};

export const useResponsive = <T extends NAMEDSTYLES<T> | NAMEDSTYLES<any>>(styles?: T) => {
  const state = useContext(Context);

  if (!!styles) {
    Object.entries(styles).forEach(([key, value]) => {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'number' && checkBlackList(subKey)) {
          styles[key][subKey] = subValue * state.re;
        } else if (typeof subValue === 'string' && subValue.startsWith('-')) {
          styles[key][subKey] = +subValue.substring(1);
        } else if (typeof subValue === 'string' && subValue.startsWith('+')) {
          styles[key][subKey] = +subValue.substring(1) * state.re;
        }
      });
    });
  }

  return {...state, styles};
};
