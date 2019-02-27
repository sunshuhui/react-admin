/*
* 用户登陆路由
*/

import React, {Component} from 'react'

import logo from '../../assets/imges/logo.png'
import './index.less'

import LoginForm from '../../components/Login-Form'
import {reqLogin} from "../../api";

export default class Login extends Component {

  //登陆的方法
  login=async (username,password)=>{
    //请求登陆
        const result =await reqLogin({username,password});
        console.log(result)
        if (result.status===0) {
          //登陆成功
          //获取用户信息

          //跳转到admin页面
          this.props.history.replace('/')
        }else if (result.status===1) {
          //登陆失败
          //提示登陆失败信息

        }
  }



  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h2>React项目：后台管理系统</h2>
        </header>

        <section className="Login-From">
          <h3>用户登陆</h3>
          <LoginForm login={this.login}/>
        </section>

        </div>
    )
  }
}


