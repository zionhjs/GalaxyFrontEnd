import request from '../utils/request'
import animation from '../data/animation.json'

const baseUrl='http://ec2-52-53-188-202.us-west-1.compute.amazonaws.com:8088/'
export async function getAnimation(params) {
    return animation;
  }
export async function login(params){
    let result=await request('/authenticate',{method:'POST',data:params})
    return result;
  }
export async function getImages(params){
  let result=await request('/awss3/fetchvideometa/5f98bed34c8a3f4e15755105')
}