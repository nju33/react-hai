import React, {Component} from 'react';
import Hai from 'components/Hai';

export default class Container extends Component {
  render() {
    const props = {
      theme: 'light',
      talks: [
        {
          name: 'question',
          message: 'question message',
          button: [
            ['Yes', function (next, names) {
              next(names.done);
            }],
            ['No', function (next, names, actions) {
              next(actions.cancel);
            }]
          ]
        },
        {
          name: 'done',
          message: 'done message',
          button: [
            ['Done', function (next, names, actions) {
              next(actions.done);
            }]
          ]
        }
      ],
      callback(answers) {
        console.log('callback!');
        console.log(answers);
      }
    };

    return (
      <div>
        <Hai {...props} style={{
          position: 'absolute',
          right: '50%',
          bottom: '50%',
          transform: 'translate(50%, 50%)',
          height: '2em',
          width: '2em',
          background: '#888'
        }}></Hai>
      </div>
    );
  }
}
