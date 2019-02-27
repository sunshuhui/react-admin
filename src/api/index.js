
/*
  定义发送请求函数模块
 */
import ajax from './ajax'

//公共的地址
const prefix =process.env.NODE_ENV==='development' ? '' :'http://localhost:5000 ';
//    /manage/user/add' manage 前面的斜杠会自动添加上

//请求登陆函数
export const reqLogin=({username,password}) =>{return ajax(prefix+'/login',{username,password},'POST')}

//请求添加数据函数
export const reqAddUser=user=>{return ajax(prefix+'/manage/user/add',user,'POST')}