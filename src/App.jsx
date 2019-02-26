import React, {Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/Admin'
import './assets/less/index.less'
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/Login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>

    )
  }
}

