/*
 * @Author: xingzai
 * @Date: 2021-01-11 22:04:31
 * @LastEditors: xingzai
 * @LastEditTime: 2021-01-11 22:04:32
 * @FilePath: \GalaxyFrontEnd\src\service\chat.js
 */
import request from '../utils/fetch'
export async function subscribe(params) {
  let result=await request(`/uservo/subscribe`,{method:'POST',data:{...params}})
  console.log('subscribe=====',result)
    return result;
  }