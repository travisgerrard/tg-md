import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

/* all that multi-theme provider stuff is needed to make material UI work */
const HomePage = () => (
    <Card className="container">
      <CardTitle title="React Application" subtitle="This is the home page." />
    </Card>
);

export default HomePage;
