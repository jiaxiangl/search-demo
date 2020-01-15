import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/home';
import ReadMe from './Readme/readme'


//  This is the main js to maintain the router
const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/readme" component={ReadMe} />
  </Switch>
)

export default Main;