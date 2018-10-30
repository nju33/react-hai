import React from 'react';
import {Functions, HaiFunctionsProps} from './contexts';

type WithHaiComponent<T> = T extends React.ComponentClass<infer P, infer S>
  ? React.ComponentClass<P & HaiFunctionsProps, S>
  : T extends React.SFC<infer SFCProps>
    ? React.SFC<SFCProps & HaiFunctionsProps>
    : never;

type WithHaiComponentProps<T> = T extends React.ComponentClass<
  infer ComponentProps
>
  ? ComponentProps
  : T extends React.SFC<infer SFCProps> ? SFCProps : never;

type WithHaiComponentState<T> = T extends React.ComponentClass<
  any,
  infer ComponentState
>
  ? ComponentState
  : T extends React.SFC<any> ? unknown : never;

function withHai<T>(Component: WithHaiComponent<T>) {
  return class extends React.Component<
    WithHaiComponentProps<T>,
    WithHaiComponentState<T>
  > {
    static displayName = `withHai(${Component.displayName || Component.name})`;

    render() {
      return (
        <Functions.Consumer>
          {fns => {
            // @ts-ignore
            return <Component {...this.props} hai={fns} />;
          }}
        </Functions.Consumer>
      );
    }
  };
}

export {withHai};
