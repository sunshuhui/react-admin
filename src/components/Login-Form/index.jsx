import React, {Component} from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  message

} from 'antd';

const Item = Form.Item


class LoginForm extends Component {

  loginSubmit = e => {
    e.preventDefault();
    const {validateFields, resetFields} = this.props.form
    validateFields((error, values) => {
      console.log(error, values)
      if (!error) {
        //验证成功
        console.log('收集表单数据：', values)
      } else {
        //验证失败
        //重置密码
        resetFields(['password'])
        //收集错误信息
        /*
        error 是个对象， curr。errors当前的值是一个数组，数组里面才是对象 ，
        prev + curr.errors[0].message  ：  一开始是个空字符串，拼字符串 每一项errors的第1项的message的值
       Object.values(obj) 将对象中每一个值，添加到一个数组中并返回数组
       arr.reduce()  统计错误信息
     */
     const e= Object.values(error).reduce((prev, curr) => prev + curr.errors[0].message +' ',' ')



        //提示错误
        message.error(e);

      }
    })
  }


  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;

    console.log(getFieldValue('username'));
    return (
      <Form className='login-form-container ' onSubmit={this.loginSubmit}>
        <Item>
          {getFieldDecorator(
            'username',
            {
              rules: [
                {required: true, message: '请输入用户名'},
                {min: 4, message: '用户名必须大于4位'},
                {max: 11, message: '用户名必须小于11位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '必须是大小写英文、数字或者下划线'}
              ],
            })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
          )}

        </Item>
        <Item>
          {getFieldDecorator(
            'password',
            {
              rules: [
                {required: true, message: '请输入密码'},
                {min: 6, message: '密码必须大于或小于6位数'},
                {max: 16, message: '密码必须小于16位数'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '必须是大小写字母、数字或者下划线'}
              ]
            }
          )(
            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="请输入密码"/>
          )}

        </Item>
        <Item>
          <Button type='primary' htmlType="submit" className='login-form-button'>登录</Button>
        </Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm

