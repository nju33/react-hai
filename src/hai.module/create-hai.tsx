import React from 'react';
import {withHai} from './with-hai';
import {HaiProps, Hai} from './organisms';
import * as customizableComponents from './customizable-components';

export const createHai: (
  userComponents: Partial<customizableComponents.CustomizableComponents>,
) => React.SFC<HaiProps> = (userComponents = {}) => {
  const WithHai = withHai<any>(Hai);
  const components: any = {...customizableComponents, ...userComponents};

  return (props: HaiProps) => {
    return <WithHai components={components} {...props} />;
  };
};
