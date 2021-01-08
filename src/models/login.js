/*
 * @Author: xingzai
 * @Date: 2020-12-09 01:13:25
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-23 22:37:16
 * @FilePath: \GalaxyFrontEnd\src\models\login.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-09 01:13:25
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-23 22:33:49
 * @FilePath: \GalaxyFrontEnd\src\models\login.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-09 01:13:25
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 01:22:20
 * @FilePath: \GalaxyFrontEnd\src\models\login.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-09 01:13:25
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 01:13:25
 * @FilePath: \GalaxyFrontEnd\src\models\login.js
 */
import {login,logout} from '../service/api'
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
            const {token,userId}=res.data;
            localStorage.setItem('artjwt',token)
            localStorage.setItem('userId',userId)
            yield put({type:'global/closeAll'})
            yield put({type:'global/closeMenu'})
        }
       },
       *logout({payload},{call,put}){
           const {userId}=payload
           const result=yield call(logout,{userId})
           if(result.code==200){
               localStorage.removeItem('artjwt')
               yield put({type:'global/closeAll'})
               yield put({type:'global/closeMenu'})
           }
       } 
    }
}