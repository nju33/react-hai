import React from 'react';

export interface HaiFunctions {
  open(ev: React.MouseEvent<unknown>): any;
}

const context = React.createContext<HaiFunctions>({
  open() {
    throw new Error('no implement');
  },
});

export const HaiFunctionsConsumer = context.Consumer;

export class HaiProvider extends React.Component {
  open = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();

    const a = ev.currentTarget.getBoundingClientRect();
    console.log(a);
  };

  render() {
    return (
      <context.Provider value={{open: this.open}}>
        {this.props.children}
      </context.Provider>
    );
  }
}
