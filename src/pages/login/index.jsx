/*
* 用户登陆路由
*/

import React, {Component} from 'react'

import logo from './logo.png'
import './index.less'
import LoginForm from '../../components/Login-Form'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h2>React项目：后台管理系统</h2>
        </header>

        <section className="Login-From">
          <h3>用户登陆</h3>
          <LoginForm/>
        </section>

        </div>
    )
  }
}


