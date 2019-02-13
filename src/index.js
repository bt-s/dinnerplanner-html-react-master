import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App/App';

import './index.scss';

const title = 'Dinner Planner';

ReactDOM.render(
  <BrowserRouter>
    <App title={title} />
  </BrowserRouter>,
  document.getElementById('root'),
);
