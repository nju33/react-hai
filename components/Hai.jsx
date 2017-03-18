import React, {Component, PropTypes, Children} from 'react';
import _Hai from '@nju33/hai';

export default class Hai extends Component {
  get propAttributes() {
    return Object.keys(this.props).reduce((result, key) => {
      if (/theme|callback|talks/.test(key)) {
        return result;
      }

      result[key] = this.props[key];
      return result;
    }, {});
  }

  componentWillMount() {
    const childrenLength = Children.count(this.props.children);
    if (childrenLength > 1) {
      throw new Error('Children\'s number of elements should be 1 or 0')
    }
  }

  handleClick() {
    const {target} = this.refs;
    const {talks, callback, theme} = this.props;

    _Hai.config.theme = theme;
    const hai = new _Hai(talks);
    if (target.children.length > 0) {
      hai.open(target.children[0]).then(callback);
    } else {
      hai.open(target).then(callback);
    }
  }

  render() {
    return (
      <div ref="target" {...this.propAttributes}
           onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}

Hai.propTypes = {
  talks: PropTypes.array.isRequired,
  theme: PropTypes.string,
  callback: PropTypes.func
};

Hai.defaultProps = {
  theme: 'dark',
  callback(answers) {
    console.log(answers);
  }
};
