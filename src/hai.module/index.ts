import {Hai as HaiBase, HaiProps} from './organisms';
import {withHai} from './with-hai';

export * from './customizable-components'
export * from './organisms';
export * from './hai.provider';
export * from './create-hai';
export * from './with-hai';

export const Hai = withHai<HaiProps>(HaiBase);
