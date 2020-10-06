import React, {useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import {NAMEDSTYLES, STATE} from './types';
import blacklist from './blacklist';

const checkBlackList = (key: string) => !blacklist.some((value) => key === value);

const defaultValue: STATE = {re: 1};
const Context = React.createContext(defaultValue);

export const ResponsiveProvider: React.FunctionComponent = ({children}) => {
  const {width, height} = useWindowDimensions();

  const orientation = width < height ? 'portrait' : 'landscape';
  const re = Math.round((width >= 600 ? width / 1440 : width / 1080) * 1e3) / 1e3;

  return <Context.Provider value={{re, width, height, orientation}}>{children}</Context.Provider>;
};

export const useResponsive = <T extends NAMEDSTYLES<T> | NAMEDSTYLES<any>>(
  styles?: T | NAMEDSTYLES<T>,
): STATE & {styles?: T | NAMEDSTYLES<T>} => {
  const state = useContext(Context);

  const s = JSON.parse(JSON.stringify(styles));

  if (!!styles) {
    Object.entries(styles).forEach(([key, value]) => {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'number' && checkBlackList(subKey)) {
          s[key][subKey] = subValue * state.re;
        } else if (typeof subValue === 'string' && subValue.startsWith('-')) {
          s[key][subKey] = +subValue.substring(1);
        } else if (typeof subValue === 'string' && subValue.startsWith('+')) {
          s[key][subKey] = +subValue.substring(1) * state.re;
        }
      });
    });
  }

  return {...state, styles: s};
};
