import React from 'react';
import {Route, IndexRoute, RouteHandler, render, NotFoundRoute } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Short from './components/Short';


var routes = (
  <Route path="/" component={App}>
	<IndexRoute component={Short}  />
	<Route name="all" path="*" component={NotFound} />
  </Route>
);

export default routes;
