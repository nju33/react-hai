import React from 'react';
import noScroll from 'no-scroll';
import {
  Functions as FunctionsContext,
  FunctionsProps,
  State as StateContext,
} from './contexts';

export interface HaiProviderState {
  hidden: boolean;
  position: {
    top: number;
    left: number;
  };
}

export class HaiProvider extends React.Component<unknown, HaiProviderState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      hidden: true,
      position: {
        top: -9999,
        left: -9999,
      },
    };
  }

  private getPosition(clientRect: ClientRect) {
    return {
      top: clientRect.top + clientRect.height,
      left: clientRect.left,
    };
  }

  private resetState() {
    this.setState({
      hidden: true,
      position: {
        top: -9999,
        left: -9999,
      },
    });
  }

  open: FunctionsProps['open'] = ev => {
    ev.preventDefault();
    noScroll.on();

    const contextPosition = this.getPosition(
      ev.currentTarget.getBoundingClientRect(),
    );

    this.setState({
      hidden: false,
      position: contextPosition,
    });
  };

  hide: FunctionsProps['hide'] = ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }
    noScroll.off();

    this.resetState();
  };

  render() {
    return (
      <FunctionsContext.Provider value={{open: this.open, hide: this.hide}}>
        <StateContext.Provider value={this.state}>
          {this.props.children}
        </StateContext.Provider>
      </FunctionsContext.Provider>
    );
  }
}
