import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BasePage from './containers/BasePage.jsx'


ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <BasePage />
</MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
