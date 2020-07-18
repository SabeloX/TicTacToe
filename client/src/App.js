import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './containers/Register'
import Login from './containers/Login'
import Game from './containers/Game'
import Welcome from './components/Welcome'

const App = () =>(
    <>
    <Router>
      <Switch>
        <Route path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route path='/game' component={Game}/>
        <Route path='/welcome' component={Welcome}/>
      </Switch>
    </Router>
  </>
)

export default App;