import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Client from './routes/Client';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/client" component={Client} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
