import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from './containers/Game'
import NotFound from './components/NotFound';

const App = () =>(
    <>
    <Router>
      <Switch>
        <Route exact path='/game' component={Game}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  </>
)

export default App;