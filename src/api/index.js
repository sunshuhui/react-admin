/*
  定义发送请求函数模块
 */
import ajax from './ajax'
import jsonp from 'jsonp'

//公共的地址
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000 ';
//    /manage/user/add' manage 前面的斜杠会自动添加上

//请求登陆函数
export const reqLogin = ({username, password}) => {
  return ajax(prefix + '/login', {username, password}, 'POST')
}

//请求添加数据函数
export const reqAddUser = user => {
  return ajax(prefix + '/manage/user/add', user, 'POST')
}

//请求添加天气数据
export const reqAddWeather = city => {
  return new Promise((res,rej)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      (err,data) => {
        if (!err){
          //请求成功
          res(data.results[0].weather_data[0])
        } else {
          //请求失败
           rej('天气请求失败，请稍后再试！')
        }
      })
  })
}