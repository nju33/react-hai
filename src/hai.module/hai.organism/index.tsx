import React from 'react';
import {Box} from './box.atom';

export class Hai extends React.Component {
  componentDidMount() {}

  render() {
    return <Box aria-hidden={false}>hoge</Box>;
  }
}
