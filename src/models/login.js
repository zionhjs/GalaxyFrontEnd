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
import {login} from '../service/api'
export default {
    namespace: 'login',
    state:{},
    reducers:{

    },
    effects:{
       *login({payload},{call,put}){
        const {id,password}=payload
        const res=yield call(login,{id,password})
        if(res.code==200){
            const {accessToken}=res.data;
            localStorage.setItem('artjwt',accessToken)
            yield put({type:'global/closeAll'})
            yield put({type:'global/closeMenu'})
        }
       } 
    }
}