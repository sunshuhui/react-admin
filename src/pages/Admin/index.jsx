/*
* 后台管理路由组件
* */
import React, {Component} from 'react'
import {Layout} from 'antd'
import {Switch, Route, Redirect} from 'react-router-dom'

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

import MemoryUtils from '../../utils/memoryUtils'

import './index.less'

const {Sider, Content,} = Layout;

export default class Admin extends Component {


  render() {
    //判断是否登陆
    //从内存中读取
    const user = MemoryUtils.user;
    console.log(user);

    if (!user || !user._id) {
      //判断成功的话，没有登陆过，直接刷新跳转到login页面让他登陆
      return <Redirect to='/login'/>
    }
    return (

      <Layout style={{minHeight: '100vh'}}>
        <Sider><LeftNave/></Sider>
        <Layout>
          <Header/>
          <Content style={{margin: 18}}>
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
          </Content>
          <Footer/>
        </Layout>
      </Layout>

    )
  }
}

