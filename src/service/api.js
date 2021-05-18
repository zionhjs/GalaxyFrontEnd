/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-25 01:58:25
 * @FilePath: \GalaxyFrontEnd\src\service\api.js
 */
import request from '../utils/request'
export async function getAnimation({currentPage,pageSize,statusName}) {
  let result=await request(`/gateway/upload/video/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{statusName}})
    return result;
  }
export async function getAnimationByLevel({currentPage,pageSize,statusName,level}) {
  let result=await request(`/gateway/upload/video/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{statusName,level}})
  return result;
}
export async function login(params){
    let result=await request('/gateway/ucenter/user/login',{method:'POST',data:params})
    return result;
  }
  export async function logout(params){
    let result=await request(`/gateway/ucenter/user/logout?userId=${params.userId}`,{method:'POST',data:{}})
    return result
  }
  export async function getTeam({currentPage,pageSize}){
    let result=await request(`/gateway/cms/team/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{}})
    return result;
  }
  export async function delTeamMember(params){
    let result=await request('/gateway/cms/team/member/delete?id='+params.id,{method:'POST'})
    return result
  }
export async function getImages({currentPage,pageSize,statusName}){
  let result=await request(`/gateway/upload/images/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{statusName}})
  return result
}
export async function getImagesByLevel({currentPage,pageSize,statusName,level}) {
  let result=await request(`/gateway/upload/images/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:{statusName,level}})
  return result
}
export async function uploadImage(params){
  let result=await request('/gateway/upload/images/uploadImages',{method:'POST',body:params})
  return result
}
export async function deleteImage(params) {
  let result=await request('/gateway/upload/images/delete?id='+params.id,{method:'POST',data:{}})
  return result
}
export async function uploadVideo(params){
  let result=await request('/gateway/upload/video/uploadVideo',{method:'POST',body:params})
  return result
}
export async function deleteVideo(params) {
  let result=await request('/gateway/upload/video/delete?id='+params.id,{method:'POST'})
  return result
}
export async function updateVideoUrl(params){
  let result=await request('/gateway/upload/video/uploadVideoUrl',{method:'POST',body:params})
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
  let result=await request('/gateway/cms/blog/add',{method:'POST',data:{...params}})
  return result
}
export async function updateArticle(params){
  let result=await request('/gateway/cms/blog/update',{method:'POST',data:{...params}})
  return result
}
export async function getArticle({currentPage,pageSize,tagName}){
   let params= tagName=='All' ? {}:{tagName}
   let result=await request(`/gateway/cms/blog/findByModal?page=${currentPage}&size=${pageSize}`,{method:'POST',data:params})

  return result;
}
export async function getArticleDetail(params){
  let result=await request('/gateway/cms/blog/detail?id='+params.id,{method:'POST',data:{}})
  return result
}
export async function delArticle(params){
  let result=await request('/gateway/cms/blog/delete?id='+params.id,{method:'POST'})
  return result;
}
export async function addComment(params){
  let result=await request('/gateway/cms/moment/comment/add',{method:'POST',data:{...params}})
  return result
}
export async function deleteComment(params) {
  let result=await request('/gateway/cms/moment/comment/delete?id='+params.id,{method:'POST'})
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
export async function searchBlog(params){
  let result=await request('/gateway/cms/blog/findByModal?page=0&size=0',{method:'POST',data:{title:params.title}})
  return result
}
export async function getAllTags(params) {
  let result=await request('/gateway/cms/blog/tag/findByModal',{method:'POST',data:{}})
  return result
}
