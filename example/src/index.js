import React from 'react';
import {render} from 'react-dom';
import Container from './Container';

const div = document.createElement('div');
document.body.appendChild(div);

render(<Container/>, div);
