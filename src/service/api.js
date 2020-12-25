/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-25 01:58:25
 * @FilePath: \GalaxyFrontEnd\src\service\api.js
 */
import request from '../utils/request'
import animation from '../data/animation.json'
export async function getAnimation(params) {
  let result=await request('/gateway/upload/video/findByModal?page=1&size=20',{method:'POST',data:{}})
  console.log('animation=====',result)
    return result;
  }
export async function login(params){
    let result=await request('/gateway/ucenter/user/login',{method:'POST',data:params})
    return result;
  }
  export async function getTeam(){
    let result=await request('/gateway/cms/team/findByModal?page=1&size=20',{method:'POST',data:{}})
    return result;
  }
export async function getImages(params){
  let result=await request('/gateway/upload/images/findByModal?page=1&size=20',{method:'POST',data:{}})
  return result
}
export async function uploadImage(params){
  console.log('upload',params)
  let result=await request('/gateway/upload/images/uploadImages',{method:'POST',body:params})
  return result
}
export async function uploadVideo(params){
  let result=await request('/video/uploadVideo',{method:'POST',body:params})
  return result
}
