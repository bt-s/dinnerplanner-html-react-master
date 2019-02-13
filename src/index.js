import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter} from 'react-router-dom';

const title = "Dinner Planner";

ReactDOM.render(
  <BrowserRouter>
    <App title={title} />
  </BrowserRouter>,
  document.getElementById('root'),
);
