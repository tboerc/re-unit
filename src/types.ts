import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type STATE = {
  re: number;
  width?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
};

export type NAMEDSTYLES<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};
