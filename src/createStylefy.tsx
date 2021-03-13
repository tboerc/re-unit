import React from 'react';

import {useStylefy} from './useStylefy';
import {ColorTheme, Stylefy} from './types';
import {StylefyProvider} from './StylefyProvider';

export const createStylefy = <T extends ColorTheme<T>>(themes: T) => {
  const Context = React.createContext<Stylefy<typeof themes, any> | undefined>(undefined);

  return {
    useStylefy: useStylefy({Context}),
    StylefyProvider: StylefyProvider({themes, Context}),
  };
};
