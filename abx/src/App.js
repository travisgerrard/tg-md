import React, { Component } from 'react';
import AbxOverview from './containers/AbxOverview.jsx'
import './App.css';
import AddAbx from './containers/AddAbx.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>

      <div className="App">

        <AddAbx />
      </div>
    </MuiThemeProvider>

    );
  }
}

export default App;
