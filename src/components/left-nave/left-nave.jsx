import React, {Component} from 'react'
import {Menu, Icon} from 'antd'

import './index.less'
import logo from '../../assets/imges/logo.png'


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export default class LeftNave extends Component {
  render() {
    return (
      <div className='left-nave'>
        <header className='nave-header'>
          <img src={logo} alt="logo"/>
          <h2>后台系统</h2>
        </header>
        <Menu mode="inline" theme="dark">
        <Item>
          <Icon type="pie-chart"></Icon>
          <span>首页</span>
        </Item>
          <SubMenu title={<span><Icon type="mail" />商品</span>}>
           <Item>
             <Icon type="pie-chart"></Icon>
             <span>品类管理</span>
           </Item>
            <Item>
              <Icon type="pie-chart"></Icon>
              <span>商品管理</span>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

