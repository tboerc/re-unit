import React from 'react';

import {useStylefy} from './useStylefy';
import {ColorTheme, Context} from './types';
import {StylefyProvider} from './StylefyProvider';

export const createStylefy = <T extends ColorTheme<T>>(themes: T) => {
  const Context = React.createContext<Context<typeof themes> | undefined>(undefined);

  return {
    useStylefy: useStylefy({Context}),
    StylefyProvider: StylefyProvider({themes, Context}),
  };
};
