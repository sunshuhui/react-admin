/*
  封装发送ajax请求函数
  返回值是promise对象
  需求：
    1. 统一处理成功和失败
    2. 返回值是promise对象，里面直接就是请求回来的数据
 */
import axios from 'axios';
import {message} from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
  let promise = null;
  if (method === 'GET') {
    promise = axios.get(url, {params: data});
  } else if (method === 'POST') {
    promise = axios.post(url, data);
  }

  //作为ajax 返回值返回出去
  return new Promise((resolve, reject) => {
    promise
      .then(res => {
        //把成功的值返回出去  返回值是promise对象
        resolve(res.data)
      })
      .catch(err => {
        //处理失败的逻辑
        console.log('请求失败：', err)
        message.error('网络请求失败，请稍后再试！')
      })

  })
}




