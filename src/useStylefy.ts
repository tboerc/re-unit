import {useContext, useEffect, useState} from 'react';

import {useBlacklist} from './useBlacklist';
import {Styles, CreateStylefy} from './types';

export const useStylefy = ({Context}: CreateStylefy<any>) => <T extends Styles<T> | Styles<any>>(styles?: T) => {
  const state = useContext(Context);
  const [parsedStyle, setParsedStyle] = useState(styles);

  useEffect(() => {
    const applyStylefy = () => {
      const newParsed = JSON.parse(JSON.stringify(styles));

      Object.entries(styles).forEach(([key, value]) => {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'number' && !useBlacklist(subKey)) {
            newParsed[key][subKey] = subValue * state.rw;
          } else if (typeof subValue === 'string') {
            if (subValue.startsWith('-')) {
              newParsed[key][subKey] = +subValue.substring(1);
            } else if (subValue.startsWith('+')) {
              newParsed[key][subKey] = +subValue.substring(1) * state.rw;
            } else if (subValue.startsWith('colors.')) {
              newParsed[key][subKey] = (state.colors ?? {})[subValue.substring(7)];
            }
          }
        });
      });

      setParsedStyle(newParsed);
    };

    if (styles) {
      applyStylefy();
    }
  }, [state.rw, styles]);

  return {...state, styles: parsedStyle};
};
