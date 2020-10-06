import React, {useContext, useEffect, useState} from 'react';
import {useWindowDimensions, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import blacklist from './blacklist';

type STATE = {
  re: number;
  width?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
};

type NAMEDSTYLES<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

const copy = (obj) => JSON.parse(JSON.stringify(obj));
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
  const [parsedStyle, setParsedStyle] = useState(styles);

  useEffect(() => {
    const apply_resposive = () => {
      const temp = copy(styles);

      Object.entries(styles).forEach(([key, value]) => {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'number' && checkBlackList(subKey)) {
            temp[key][subKey] = subValue * state.re;
          } else if (typeof subValue === 'string' && subValue.startsWith('-')) {
            temp[key][subKey] = +subValue.substring(1);
          } else if (typeof subValue === 'string' && subValue.startsWith('+')) {
            temp[key][subKey] = +subValue.substring(1) * state.re;
          }
        });
      });

      setParsedStyle(temp);
    };

    if (!!styles) apply_resposive();
  }, [state, styles]);

  return {...state, styles: parsedStyle};
};
