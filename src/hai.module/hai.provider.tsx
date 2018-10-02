import React from 'react';
import noScroll from 'no-scroll';
import {
  Functions as FunctionsContext,
  FunctionsProps,
  State as StateContext,
} from './contexts';

export interface HaiProviderInfo {
  hidden: boolean;
  rect: {
    width: number;
    height: number;
  };
  position:
    | {
        top: number;
        left: number;
      }
    | {
        top: number;
        right: number;
      }
    | {
        bottom: number;
        left: number;
      }
    | {
        bottom: number;
        right: number;
      };
}

export interface HaiProviderState {
  items: Map<string, HaiProviderInfo>;
}

export class HaiProvider extends React.Component<unknown, HaiProviderState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      items: new Map(),
    };
  }

  private getPosition(
    clientRect: ClientRect,
    contextRect: {width: number; height: number},
  ): HaiProviderInfo['position'] {
    const top = clientRect.top + clientRect.height;
    const left = clientRect.left + contextRect.width;
    const result: any = {
      top: clientRect.top + clientRect.height,
      left: clientRect.left,
    };

    if (top > window.innerHeight) {
      delete result.top;
      result.bottom = clientRect.height;
    }

    if (left > window.innerWidth) {
      delete result.left;
      result.right = 0;
    }

    return result;
  }

  private resetState(id: string) {
    this.setState(state => {
      const target = state.items.get(id);
      if (target === undefined) {
        return state;
      }

      target.hidden = true;
      target.rect = {
        width: 0,
        height: 0,
      };
      target.position = {
        top: -9999,
        left: -9999,
      };
      state.items.set(id, target);

      return {items: state.items};
    });
  }

  register: FunctionsProps['register'] = (id, info) => {
    this.state.items.set(id, {
      hidden: true,
      rect: info,
      position: {
        top: -9999,
        left: -9999,
      },
    });
  };

  open: FunctionsProps['open'] = id => ev => {
    ev.preventDefault();
    noScroll.on();

    const target = this.state.items.get(id);

    const contextPosition = this.getPosition(
      ev.currentTarget.getBoundingClientRect(),
      target === undefined ? {width: 0, height: 0} : target.rect,
    );

    this.setState(state => {
      if (target === undefined) {
        return state;
      }

      target.hidden = false;
      target.position = contextPosition;
      state.items.set(id, target);

      return {items: state.items};
    });
  };

  hide: FunctionsProps['hide'] = id => ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }
    noScroll.off();

    this.resetState(id);
  };

  render() {
    return (
      <FunctionsContext.Provider
        value={{register: this.register, open: this.open, hide: this.hide}}
      >
        <StateContext.Provider value={this.state}>
          {this.props.children}
        </StateContext.Provider>
      </FunctionsContext.Provider>
    );
  }
}
