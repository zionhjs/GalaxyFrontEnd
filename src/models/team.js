/*
 * @Author: xingzai
 * @Date: 2020-12-09 03:38:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 03:38:20
 * @FilePath: \GalaxyFrontEnd\src\models\team.js
 */
import {getTeam} from '../service/api'
export default {
    namespace:'team',
    state:{},
    reducers:{

    },
    effects:{
     *getTeamData({payload},{call,put}){
       const res=yield call(getTeam)
       console.log('team',res);
     }
    }
}