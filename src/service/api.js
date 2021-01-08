/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-25 01:58:25
 * @FilePath: \GalaxyFrontEnd\src\service\api.js
 */
import request from '../utils/request'
export async function getAnimation({currentPage,pageSize}) {
  let result=await request(`/gateway/upload/video/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{}})
  console.log('animation=====',result)
    return result;
  }
export async function login(params){
    let result=await request('/gateway/ucenter/user/login',{method:'POST',data:params})
    return result;
  }
  export async function getTeam({currentPage,pageSize}){
    let result=await request(`/gateway/cms/team/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{}})
    return result;
  }
  export async function delTeamMember(params){
    let result=await request('/gateway/cms/team/delete?id='+params.id,{method:'POST'})
    return result
  }
export async function getImages({currentPage,pageSize}){
  console.log('currentPage',currentPage)
  let result=await request(`/gateway/upload/images/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{}})
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
export async function updateVideoUrl(params){
  let result=await request('/video/uploadVideoUrl',{method:'POST',body:params})
  return result;
}
export async function updateVideo(params){
  let result=await request('/gateway/upload/video/update',{method:'POST',data:{...params}})
  return result
}
export async function addTeamMember(params){
  let result=await request('/gateway/cms/team/member/add',{method:'POST',data:{...params}})
  return result
}
export async function updateMember(params){
  let result=await request('/gateway/cms/team/member/update',{method:'POST',data:{...params}})
  return result
}
export async function updateImg(params){
  let result=await request('/gateway/upload/images/uploadImagesUrl',{method:'POST',body:params})
  return result
}
export async function updateImgText(params){
  let result=await request('/gateway/upload/images/updateImages',{method:'POST',data:{...params}})
  return result
}
export async function addArticle(params){
  let result=await request('/blog/add',{method:'POST',data:{...params}})
  return result
}
export async function updateArticle(params){
  let result=await request('/gateway/cms/blog/update',{method:'POST',data:{...params}})
  return result
}
export async function getArticle({currentPage,pageSize}){
  let result=await request(`/blog/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{}})
  return result;
}
export async function getArticleDetail(params){
  let result=await request('/gateway/cms/blog/detail?id='+params.id,{method:'POST',data:{}})
  return result
}
export async function delArticle(params){
  let result=await request('/blog/delete?id='+params.id,{method:'POST'})
  return result;
}
export async function addComment(params){
  console.log('params',params)
  let result=await request('/gateway/cms/moment/comment/add',{method:'POST',data:{...params}})
  return result
}
export async function uploadImgNotLogo(params){
  let result=await request('/gateway/upload/images/uploadImagesNotLogo',{method:'POST',body:params})
  return result
}
export async function addLike(params){
  let result=await request("/gateway/cms/moment/like/add",{method:'POST',data:{...params}})
  return result
}
export async function getRecentPost(params){
  let result=await request('/gateway/cms/blog/findByModalOrderByTime?page=1&size=20',{method:'POST',data:{}})
  return result
}
