/*
 * @Author: xingzai
 * @Date: 2020-12-09 03:38:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 03:38:20
 * @FilePath: \GalaxyFrontEnd\src\models\team.js
 */
import {getTeam} from '../service/api'
import teamJson from '../data/team.json'
export default {
    namespace:'team',
    state:{
      data:{

      }
    },
    reducers:{
      save(state,{payload}){
        return {
          ...state,
          data:payload
        }
      },
      addMember(state,{payload}){
        const {data}=state;
        data.list[payload].data.push({name:'',job:'',email:''})
        return {
          ...state,
          data:{...data}
        }
      },
      changeName(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data.list[index]['data'][i]['name']=e.target.value
        return {
          ...state,
          data:{...data}
        }
      },
      changeJob(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data.list[index]['data'][i]['job']=e.target.value
        return {
          ...state,
          data:{...data}
        }
      },
      changeEmail(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data.list[index]['data'][i]['email']=e.target.value
        return {
          ...state,
          data:{...data}
        }
      }

    },
    effects:{
     *getTeamData({payload},{call,put}){
       yield put({type:'save',payload:teamJson})
     }
    }
}