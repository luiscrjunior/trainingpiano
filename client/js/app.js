import React from 'react';
import ReactDOM from 'react-dom';

import Store from './store';
import App from 'components/App';
import './i18n';

/* load global styles */
import 'css/app.scss';

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Store>
    <App />
  </Store>
  , document.getElementById('app')
);
