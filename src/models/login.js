/*
 * @Author: xingzai
 * @Date: 2020-12-09 01:13:25
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-23 22:37:16
 * @FilePath: \GalaxyFrontEnd\src\models\login.js
 */
import {login,logout} from '../service/api'
const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
export default {
    namespace: 'login',
    state:{},
    reducers:{

    },
    effects:{
       *login({payload},{call,put}){
        const {phone,password}=payload
        console.log(phone)
        console.log(password)
        const res=yield call(login,{phone,password})
        console.log(res)
        if(res.code==200){
          yield put({type:'global/openNotify',payload:{type:'sucess',message:"you have logined sucessful!",transitionName:'notifycation'}})
            const {token,userId,roleName}=res.data;
            localStorage.setItem('artjwt',token)
            localStorage.setItem('userId',userId)
          yield put({type:'global/setLogin',payload:true})
            yield put({type:'global/setRole',payload:roleName})
            yield call(delay,1000)
            yield put({type:'global/closeAll'})
            yield put({type:'global/closeMenu'})
          yield put({type:'global/closeNotify'})
        }else{
          yield put({type:'global/notify',payload:{type:'error',message:"you have login failed,please login again!",duration: 2000,transitionName: 'notifycation'}})
        }
       },
       *logout({payload},{call,put}){
           const {userId}=payload
           const result=yield call(logout,{userId})
           if(result.code==200){
             yield put({type:'global/setLogin',payload:false})
               localStorage.removeItem('artjwt')
               yield put({type:'global/closeAll'})
               yield put({type:'global/closeMenu'})
           }
       } 
    }
}
