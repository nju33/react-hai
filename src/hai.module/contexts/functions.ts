import React from 'react';

export interface FunctionsProps {
  register(
    id: string,
    data: {
      width: number;
      height: number;
    },
  ): any;
  open(id: string): ((ev: React.MouseEvent<HTMLElement>) => any);
  hide(id: string): ((ev?: React.MouseEvent<HTMLElement>) => any);
}

export interface HaiFunctionsProps {
  hai: FunctionsProps;
}

export const Functions = React.createContext<FunctionsProps>({
  register() {
    throw new Error('no implement');
  },
  open() {
    throw new Error('no implement');
  },
  hide() {
    throw new Error('no implement');
  },
});
