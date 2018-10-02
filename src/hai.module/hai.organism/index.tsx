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
  boxRef: React.RefObject<HTMLDivElement>;
  // @ts-ignore
  props: HaiProps & HaiFunctionsProps;
  portalElement: HTMLElement;

  constructor(props: HaiProps & HaiFunctionsProps) {
    super(props);

    this.boxRef = React.createRef<HTMLDivElement>();

    let portalElement = document.getElementById(props.id);
    if (portalElement !== null) {
      this.portalElement = portalElement;
      return;
    }
    portalElement = document.createElement('div');
    portalElement.id = props.id;
    this.portalElement = portalElement;
    document.body.appendChild(this.portalElement);
  }

  componentDidMount() {
    const boxElement = this.boxRef.current;

    if (boxElement === null) {
      return;
    }

    this.props.hai.register(this.props.id, {
      width: boxElement.clientWidth,
      height: boxElement.clientHeight,
    });
  }

  componentDidUpdate(nextProps: HaiProps & HaiFunctionsProps) {
    const boxElement = this.boxRef.current;

    if (boxElement === null) {
      return;
    }

    this.props.hai.register(nextProps.id, {
      width: boxElement.clientWidth,
      height: boxElement.clientHeight,
    });
  }

  handleClick = (itemIndex: number) => (ev: React.MouseEvent<unknown>) => {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.hai.hide(this.props.id);

    this.props.onItemClick(itemIndex);
  };

  render() {
    return createPortal(
      <StateContext.Consumer>
        {state => {
          const target = state.items.get(this.props.id);
          return (
            <Box
              innerRef={this.boxRef}
              aria-hidden={target === undefined ? true : target.hidden}
              style={{
                ...(target === undefined
                  ? {top: -9999, left: -9999}
                  : target.position),
              }}
              onClick={this.props.hai.hide(this.props.id)}
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
      </StateContext.Consumer>,
      this.portalElement,
    );
  }
}

export const Hai = withHai(RealHai);
