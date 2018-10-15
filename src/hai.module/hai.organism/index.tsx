import React from 'react';
import {createPortal} from 'react-dom';
import {HaiFunctionsProps, State as StateContext} from '../contexts';
import {Box} from './box.atom';
import {withHai} from '../with-hai';

export interface HaiProps {
  id: string;
  items: string[];
  onItemClick(itemIndex: number): any;
}

export class RealHai extends React.Component<HaiProps> {
  // @ts-ignore
  props: HaiProps & HaiFunctionsProps;
  portalElement: HTMLElement;

  constructor(props: HaiProps) {
    super(props);

    let portalElement = document.getElementById(props.id);
    if (portalElement !== null) {
      this.portalElement = portalElement;
    }
    portalElement = document.createElement('div');
    portalElement.id = props.id;
    this.portalElement = portalElement;
    document.body.appendChild(this.portalElement);
  }

  handleClick = (itemIndex: number) => (ev: React.MouseEvent<unknown>) => {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.hai.hide();

    this.props.onItemClick(itemIndex);
  };

  render() {
    return createPortal(
      (
        <StateContext.Consumer>
          {state => {
            return (
              <Box
                aria-hidden={state.hidden}
                style={{
                  ...state.position,
                }}
              >
                <ul>
                  {this.props.items.map((item, i) => {
                    return (
                      <li key={item} onClick={this.handleClick(i)}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            );
          }}
        </StateContext.Consumer>
      ),
      this.portalElement
    )
  }

  //   return (
  //     <StateContext.Consumer>
  //       {state => {
  //         return (
  //           <Box
  //             aria-hidden={state.hidden}
  //             style={{
  //               ...state.position,
  //             }}
  //           >
  //             <ul>
  //               {this.props.items.map((item, i) => {
  //                 return (
  //                   <li key={item} onClick={this.handleClick(i)}>
  //                     {item}
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </Box>
  //         );
  //       }}
  //     </StateContext.Consumer>
  //   );
  // }
}

export const Hai = withHai(RealHai);
