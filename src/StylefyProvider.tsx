import React, {useCallback, useState} from 'react';

import {useRelativeToWidth} from './useRelativeToWidth';
import {ColorTheme, CreateStylefy, StylefyProviderProps} from './types';

export const StylefyProvider = <T extends ColorTheme<T>>({themes, Context}: CreateStylefy<T>) => ({
  children,
  initialTheme,
}: StylefyProviderProps<keyof T>) => {
  const values = useRelativeToWidth();
  const [themeType, setThemeType] = useState(initialTheme);

  const changeTheme = useCallback((type: keyof T) => {
    setThemeType(type);
  }, []);

  return <Context.Provider value={{...values, changeTheme, colors: themes[themeType]}}>{children}</Context.Provider>;
};
