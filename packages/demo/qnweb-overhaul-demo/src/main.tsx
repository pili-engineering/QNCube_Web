import React from 'react';
import ReactDOM from 'react-dom';
import IRouter from './router';
import Store from './store';
import './SDK/QNWhiteboard/qnweb-whiteboard.umd';
import './style/index.scss';

ReactDOM.render(
  <Store>
    <IRouter />
  </Store>,
  document.getElementById('root'),
);
