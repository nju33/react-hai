import React from 'react';
import {Functions} from './contexts';

function withHai<P, S>(Component: React.ComponentClass<P, S> | React.SFC<P>) {
  return class extends React.Component<P, S> {
    static displayName = `withHai(${Component.displayName})`;

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
