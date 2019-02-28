/*
该模块用来封装储存的方法
 */

import store from 'store'

//提取公共的user
const User_Key ='user';
//保存数据的方法
export const setItem = value => {
  //判读数据不能为空并且不是函数
  if (!value || value !== 'function') {
    store.set(User_Key,value)
  }else {
    console.log('保存失败：未能保存用户名或密码')
  }
};

//读取数据的方法
export const getItem =()=>{
  store.get(User_Key)
};

//删除数据的方法
export const removeItem =()=>{
  store.remove(User_Key)
};

