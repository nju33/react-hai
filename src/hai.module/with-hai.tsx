import React from 'react';
import {Functions} from './contexts';

function withHai<P = {}, S = {}>(Component: any) {
  return class extends React.PureComponent<P, S> {
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
