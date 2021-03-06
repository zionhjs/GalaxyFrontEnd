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
    return result;
  }
  export async function connect(params) {
   let result=await request('/chatbot/connect?userEmail='+params.email,{method:'POST',data:{}})
    return result
  }
  export async function disconnect(params) {
  let result=await request('/chatbot/disconnect?userEmail='+params.email,{method:'POST',data:{}})
  return result
  }
  export async function unsubscribe(params) {
  let result=await request('/uservo/unsubscribe',{method:'POST',data:{userEmail:params.email}})
  return result
  }
  export async function sendMessage(params) {
  let result=await request('/chatbot/sendmessage?userEmail='+params.email+'&message='+params.message,{method: 'POST',data:{}})
  return result
  }
  export async function getMessage(params) {
  let result=await request('/chatbot/getmessages?userEmail='+params.email,{method:'POST',data:{}})
    return result
  }
