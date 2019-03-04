import React, {Component} from 'react'
import {Switch,Route,Redirect}from 'react-router-dom'


import Detail from './detail'
import Index from './index'
import SaveUpdata from './saveupdata'

export default class Product extends Component {
  render() {
    return (
     <Switch>
       <Route path='/product/index' component={Index}></Route>
       <Route path='/product/detail' component={Detail}></Route>
       <Route path='/product/saveupdata' component={SaveUpdata}></Route>
       <Redirect to='/product/index'></Redirect>
     </Switch>
    )
  }
}

