import React from 'react';
import {createPortal} from 'react-dom';
import produce from 'immer';
import {HaiFunctionsProps, State as StateContext} from '../contexts';
import {Box, Content} from '../atoms';
import {withHai} from '../with-hai';

export enum HaiStepType {
  List,
}

export interface HaiStepList {
  type: HaiStepType.List;
  items: string[];
  onClick(index: number): number | void;
}

export type HaiStep = HaiStepList;

export interface HaiProps {
  id: string;
  steps: HaiStep[];
  // onItemClick(itemIndex: number): any;
}

export interface HaiState {
  stepNum: number;
  step: HaiStep;
}

export class RealHai extends React.Component<HaiProps, HaiState> {
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

    const initialState = {
      stepNum: 0,
      step: props.steps[0],
    };
    this.state = produce<HaiState>(draft => draft)(initialState);
  }

  componentDidMount() {
    const boxElement = this.boxRef.current;

    if (boxElement === null) {
      return;
    }

    this.props.hai.register(this.props.id, boxElement);
  }

  private cancelEvent = (ev: React.MouseEvent<unknown>) => {
    ev.persist();
    ev.preventDefault();
    ev.stopPropagation();
  };

  private handleEvent = (callback: Function) => (
    ev: React.MouseEvent<unknown>,
  ) => {
    this.cancelEvent(ev);
    callback(ev);
  };

  private runStep = (stepNum: number) => {
    this.setState(
      produce<HaiState>(draft => {
        draft.stepNum = stepNum;
        draft.step = this.props.steps[stepNum];
      }),
    );
  };

  private reset = () => {
    this.setState(
      produce<HaiState>(draft => {
        draft.stepNum = 0;
        draft.step = this.props.steps[0];
      }),
    );
  };

  // @ts-ignore
  Content: React.SFC<{step: HaiStep}> = React.memo((props: {step: HaiStep}) => {
    const {step} = props;
    switch (step.type) {
      case HaiStepType.List: {
        const {items, onClick} = step;

        return (
          <ul>
            {items.map((item, i) => {
              return (
                <li
                  key={item}
                  onClick={this.handleEvent(
                    (ev: React.MouseEvent<HTMLElement>) => {
                      const next = onClick(i);
                      if (next === undefined) {
                        this.props.hai.hide(this.props.id)();
                        this.reset();
                        return;
                      }

                      if (this.props.steps[next] === undefined) {
                        this.props.hai.hide(this.props.id)();
                        this.reset();
                        return;
                      }

                      this.runStep(next);
                      setTimeout(() => {
                        this.props.hai.adjustPosition(this.props.id);
                      }, 0);
                    },
                  )}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        );
      }
      default: {
        throw new Error('unknown type');
      }
    }
  });

  private onBoxClick = () => {
    this.props.hai.hide(this.props.id)();
    this.reset();
  }

  render() {
    return createPortal(
      <StateContext.Consumer>
        {state => {
          const target = state.items.get(this.props.id);

          return (
            <Box
              // @ts-ignore
              ref={this.boxRef}
              aria-hidden={target === undefined ? true : target.hidden}
              style={{
                ...(target === undefined
                  ? {top: -9999, left: -9999}
                  : target.position),
              }}
              onClick={this.onBoxClick}
            >
              <Content>
                <this.Content step={this.state.step} />
              </Content>
            </Box>
          );
        }}
      </StateContext.Consumer>,
      this.portalElement,
    );
  }
}

export const Hai = withHai<React.ComponentClass<HaiProps>>(RealHai);
