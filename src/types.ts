import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type Color<T> = {[P in keyof T]: T[P]};

export type ColorTheme<T> = {[P in keyof T]: Color<T[P]>};

export type Styles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export interface UseRelativeToWidth {
  rw: number;
  width?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
}

export interface CreateStylefy<T> {
  themes?: T;
  Context: React.Context<Context<T>>;
}

export interface StylefyProviderProps<T> {
  initialTheme: T;
  children: React.ReactNode;
}

export interface Context<T> extends UseRelativeToWidth {
  colors?: T[keyof T];
  changeTheme?: (type: keyof T) => void;
}
