import request from '../utils/request'
import animation from '../data/animation.json'
export async function getAnimation(params) {
    return animation;
  }
export async function login(params){
    let result=await request('/user/login',{method:'POST',data:params})
    return result;
  }
  export async function getTeam(){
    let result=await request('/team',{method:'GET'})
    return result;
  }
export async function getImages(params){
  let result=await request('/awss3/fetchvideometa/5f98bed34c8a3f4e15755105')
}