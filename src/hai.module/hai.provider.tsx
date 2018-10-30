import React from 'react';
import noScroll from 'no-scroll';
import {
  Functions as FunctionsContext,
  FunctionsProps,
  State as StateContext,
} from './contexts';
// import {element} from 'prop-types';

export interface HaiProviderInfo {
  hidden: boolean;
  emitter?: HTMLElement;
  element: HTMLDivElement;
  // rect: {
  //   width: number;
  //   height: number;
  // };
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
      target.position = {
        top: -9999,
        left: -9999,
      };
      state.items.set(id, target);

      return {items: state.items};
    });
  }

  register: FunctionsProps['register'] = (id, elem) => {
    this.state.items.set(id, {
      hidden: true,
      element: elem,
      position: {
        top: -9999,
        left: -9999,
      },
    });
  };

  open: FunctionsProps['open'] = id => ev => {
    ev.persist();
    ev.preventDefault();
    noScroll.on();

    const target = this.state.items.get(id);
    const emitter = ev.currentTarget;
    // const rect = ev.currentTarget.getBoundingClientRect();

    const contextPosition = this.getPosition(
      emitter.getBoundingClientRect(),
      target === undefined
        ? {width: 0, height: 0}
        : {
            width: target.element.clientWidth,
            height: target.element.clientHeight,
          },
    );

    this.setState(state => {
      if (target === undefined) {
        return state;
      }

      target.hidden = false;
      target.emitter = emitter;
      target.position = contextPosition;
      state.items.set(id, target);

      return {items: state.items};
    });
  };

  adjustPosition: FunctionsProps['adjustPosition'] = id => {
    const target = this.state.items.get(id);

    if (target === undefined) {
      return;
    }

    if (target.emitter === undefined) {
      return;
    }

    const contextPosition = this.getPosition(
      target.emitter.getBoundingClientRect(),
      target === undefined ? {width: 0, height: 0} : {
        width: target.element.clientWidth,
        height: target.element.clientHeight,
      },
    );
    this.setState(state => {
      if (target === undefined) {
        return state;
      }
      target.position = contextPosition;
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
        value={{
          register: this.register,
          adjustPosition: this.adjustPosition,
          open: this.open,
          hide: this.hide,
        }}
      >
        <StateContext.Provider value={this.state}>
          {this.props.children}
        </StateContext.Provider>
      </FunctionsContext.Provider>
    );
  }
}
