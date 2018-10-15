import React from 'react';

export interface FunctionsProps {
  open(ev: React.MouseEvent<HTMLElement>): any;
  hide(ev?: React.MouseEvent<HTMLElement>): any;
}

export interface HaiFunctionsProps {
  hai: FunctionsProps;
}

export const Functions = React.createContext<FunctionsProps>({
  open() {
    throw new Error('no implement');
  },
  hide() {
    throw new Error('no implement');
  },
});
