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

export interface CreateStylefy<themes> {
  themes?: themes;
  Context: React.Context<Stylefy<themes, any>>;
}

export interface StylefyProviderProps<T> {
  initialTheme: T;
  children: React.ReactNode;
}

export interface Stylefy<themes, colors> extends UseRelativeToWidth {
  colors?: Readonly<colors>;
  changeTheme?: (type: keyof themes) => void;
}
