import React from 'react';
import {createPortal} from 'react-dom';
import produce from 'immer';
import {HaiFunctionsProps, State as StateContext} from '../contexts';
import {Content} from '../atoms';
import * as customizableComponents from '../customizable-components';

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
  components?: Partial<typeof customizableComponents>;
}

export interface HaiState {
  stepNum: number;
  step: HaiStep;
}

export class Hai extends React.PureComponent<HaiProps, HaiState> {
  static defaultProps = {
    components: customizableComponents,
  };

  boxRef: React.RefObject<HTMLDivElement>;
  // @ts-ignore
  props: HaiProps &
    HaiFunctionsProps & {components: typeof customizableComponents};
  portalElement: HTMLElement;

  private initState(props: HaiProps & HaiFunctionsProps) {
    const initialState = {
      stepNum: 0,
      step: props.steps[0],
    };
    this.state = produce<HaiState>(draft => draft)(initialState);
  }

  constructor(props: HaiProps & HaiFunctionsProps) {
    super(props);
    this.boxRef = React.createRef<HTMLDivElement>();

    let portalElement = document.getElementById(props.id);
    if (portalElement !== null) {
      this.portalElement = portalElement;
      this.initState(props);
      return;
    }

    portalElement = document.createElement('div');
    portalElement.id = props.id;
    this.portalElement = portalElement;
    document.body.appendChild(this.portalElement);

    this.initState(props);
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
    callback();
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
          <this.props.components.List>
            {items.map((item, i) => {
              return (
                <li
                  key={item}
                  onClick={this.handleEvent(() => {
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
                  })}
                >
                  {item}
                </li>
              );
            })}
          </this.props.components.List>
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
  };

  render() {
    return createPortal(
      <StateContext.Consumer>
        {state => {
          const target = state.items.get(this.props.id);

          return (
            <this.props.components.Box
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
            </this.props.components.Box>
          );
        }}
      </StateContext.Consumer>,
      this.portalElement,
    );
  }
}
