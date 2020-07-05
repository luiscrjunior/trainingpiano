import React from 'react';
import ReactDOM from 'react-dom';

import Store from './store';
import App from 'components/App';
import './i18n';

/* https://www.thebasement.be/updating-to-babel-7.4/ */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/* load global styles */
import 'css/app.scss';

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Store>
    <App />
  </Store>
  , document.getElementById('app')
);
