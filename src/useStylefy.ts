import {useContext, useEffect, useState} from 'react';

import {useBlacklist} from './useBlacklist';
import {Styles, CreateStylefy, ColorTheme} from './types';

export const useStylefy = <T extends ColorTheme<T>>({Context}: CreateStylefy<T>) => <S extends Styles<S> | Styles<any>>(
  styles?: S,
) => {
  const state = useContext(Context);
  const [stylefy, setStylefy] = useState(styles);

  useEffect(() => {
    const applyStylefy = () => {
      const newStylefy = JSON.parse(JSON.stringify(styles));

      Object.entries(styles).forEach(([key, value]) => {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'number' && !useBlacklist(subKey)) {
            newStylefy[key][subKey] = subValue * state.rw;
          } else if (typeof subValue === 'string') {
            if (subValue.startsWith('-')) {
              newStylefy[key][subKey] = +subValue.substring(1);
            } else if (subValue.startsWith('+')) {
              newStylefy[key][subKey] = +subValue.substring(1) * state.rw;
            } else if (subValue.startsWith('colors.')) {
              newStylefy[key][subKey] = (state.colors ?? {})[subValue.substring(7)];
            }
          }
        });
      });

      setStylefy(newStylefy);
    };

    if (styles) {
      applyStylefy();
    }
  }, [state.rw, styles]);

  return {...state, stylefy};
};
