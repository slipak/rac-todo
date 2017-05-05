import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/common.scss';

import App from './containers/app';

render(<App />, document.getElementById('rac-todo'));
