/*
* 后台管理路由组件
* */
import React, {Component} from 'react'
import {Row,Col} from 'antd'
import {Switch,Route,Redirect}from 'react-router-dom'

import LeftNave from "../../components/left-nave/left-nave";
import Header from '../../components/header'
import Footer from '../../components/footer'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import User from '../user'
import Role from '../role'
import Bar from '../charts/bar'
import line from '../charts/line'
import Pie from '../charts/pie'

import './index.less'
export default class Admin extends Component {
  render() {
    return (

        <Row className="admin">
          <Col span={4}><LeftNave/></Col>
          <Col span={20}>
            <Header/>
            <div className='admin-content'>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>

                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to='/home'/>
              </Switch>
            </div>
            <Footer/>
          </Col>

        </Row>

    )
  }
}

