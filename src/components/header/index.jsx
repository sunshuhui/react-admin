import React, {Component} from 'react'
import {Row, Col, Modal,message} from 'antd'
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs'


import MemoryUtils from '../../utils/memoryUtils'
import {removeItem} from "../../utils/storageUtils";
import menuList from '../../config/menuConfig'
import {reqAddWeather} from '../../api'

import './index.less'
import MyButton from '../../components/my-button';


class Header extends Component {
  state = {
    //初始化时间
    sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    //初始化天气图标
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    //初始化
    weather: '晴天'
  };

  componentDidMount() {
    this.updateTime()

  }

  //更新时间
  updateTime = () => {
    this.turnoverTime = setInterval(() => {
      this.setState({
        sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    }, 1000)
  };

  //更新天气
  updateWeather = () => {
    reqAddWeather('北京')
      .then((res)=>{
        //更新天气数据
        this.setState({
          weatherIcon:res.dayPictureUrl,
          weather:res.weather
        })
      })
      .catch((err)=>{
        message.error(err)
      })
  }

  //  清除定时器
  componentWillUnmount() {
    //清除定时器
    clearInterval(this.turnoverTime)
  }

  //2。退出登陆方法
  logOut = () => {
    Modal.confirm({
      title: '真的要狠心离开么? 😭',
      okText: '狠心离开',
      cancelText: '在看看吧～',
      onOk: () => {
        //返回到登陆界面，并且清除用户信息
        //(1)清除用户信息（localStorage, 内存）
        removeItem();
        MemoryUtils.user = {};
        //(2) 返回登陆页面
        this.props.history.replace('/login')

      }
    });
  };

  //3。显示菜单标题方法
  getTitle = menu => {
    //（1）获取到 pathname
    const {pathname} = this.props.location;

     if (pathname.indexOf('/product')===0) {
       return '商品管理'
     }

    //（2）for循环得到所有的title
    for (let i = 0; i < menu.length; i++) {
      let item = menu[i]
      if (item.children) {
        //(3) 使用递归   递归去找是否有匹配的title，如果有才返回
        const title = this.getTitle(item.children)
        if (title) {
          return title
        }
      } else {
        if (item.key === pathname) {
          return item.title
        }
      }
    }
  };


  render() {
    //1。在内存中获取用户名
    const {username} = MemoryUtils.user;
    //3。读取title标题
    const title = this.getTitle(menuList);
    //获取定时器、天气图标、天气
    const {sysTime, dayPictureUrl, weather} = this.state;


    return (
      <div className="admin-right-header">
        <Row className='header-top'>
          <span>欢迎, {username}</span>
          <MyButton onClick={this.logOut} name='退出' />

        </Row>
        <Row className='header-bottom'>
          <Col span={6} className='header-bottom-left'>{title}</Col>
          <Col span={18} className='header-bottom-right'>
            <span>{sysTime}</span>
            <img src={dayPictureUrl} alt="天气logo"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)