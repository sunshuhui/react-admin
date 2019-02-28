import React from 'react'
import {render}from 'react-dom'

import App from './App'
import {getItem} from "./utils/storageUtils";
import MemoryUtils from './utils/memoryUtils'

//将localStoryage的值读取出来 保存在内存中
const user =getItem();

 if (user && user._id) {
   //代表保存在内存中
   MemoryUtils.user=user
 }

render(<App/>,document.getElementById('root'))