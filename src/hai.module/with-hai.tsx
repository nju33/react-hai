import React from 'react';
import {HaiFunctionsConsumer} from './hai.provider';

function withDou<P, S>(Component: React.ComponentClass<P, S> | React.SFC<P>) {
  return class extends React.Component<P, S> {
    static displayName = `withDou(${Component.displayName})`;

    render() {
      return (
        <HaiFunctionsConsumer>
          {fns => {
            // @ts-ignore
            return <Component {...this.props} hai={fns} />;
          }}
        </HaiFunctionsConsumer>
      );
    }
  };
}

export {withDou};
