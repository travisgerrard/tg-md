import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* all that multi-theme provider stuff is needed to make material UI work */
const HomePage = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Card className="container">
      <CardTitle title="React Application" subtitle="This is the home page." />
    </Card>
  </MuiThemeProvider>
);

export default HomePage;
