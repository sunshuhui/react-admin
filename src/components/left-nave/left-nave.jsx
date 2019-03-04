import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'

import './index.less'
import logo from '../../assets/imges/logo.png'
import menuList from '../../config/menuConfig'


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class LeftNave extends Component {

  componentWillMount() {
    this.menu = this.creatMenu(menuList)
  }

  creatMenu = (menu) => {
    return menu.map(item => {
      //判断是否有子组件
      if (item.children) {
        //获取当前路径
        const {pathname} = this.props.location;

        const result = item.children.find(item => pathname.indexOf(item.key) === 0);


        if (result) {
          this.openkey = item.key

        }


        return <SubMenu key={item.key} title={<span><Icon type={item.key}/>{item.title}</span>}>
          {
            this.creatMenu(item.children)
          }
        </SubMenu>
      } else {
        //没有子菜单的返回值
        return <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }

    })
  }


  render() {
    //获取当前组件的pathname 值
    let {pathname} = this.props.location;

    if (/^\/product/.test(pathname)) {
      pathname= '/product';
    }
    return (
      <div className='left-nave'>
        <header>
          <NavLink to='/home' className='nave-header'>
            <img src={logo} alt="logo"/>
            <h2>后台系统</h2>
          </NavLink>
        </header>

        <Menu
          mode="inline"
          theme="pick"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openkey]}
        >

          {
            this.menu
          }

        </Menu>
      </div>
    )
  }
}

// 高阶组件 作用是将普通组件变成一个高阶组件让新的组件拥有三个属性 location history match
export default withRouter(LeftNave)

