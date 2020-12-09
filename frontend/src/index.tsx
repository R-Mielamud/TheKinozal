import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import automaticConfigureLanguages from './config/i18next.config';

import 'react-notifications/lib/notifications.css';
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

automaticConfigureLanguages();
const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// test
