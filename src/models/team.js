/*
 * @Author: xingzai
 * @Date: 2020-12-09 03:38:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-28 08:02:03
 * @FilePath: \GalaxyFrontEnd\src\models\team.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-09 03:38:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 03:38:20
 * @FilePath: \GalaxyFrontEnd\src\models\team.js
 */
import {getTeam,addTeamMember,updateMember,delTeamMember} from '../service/api'
import teamJson from '../data/team.json'
export default {
    namespace:'team',
    state:{
      bannerImg:'splash.jpeg',
      bannerText:'We have more than 200 employees across the world. Here we only showing our permanent and business manager & technical director list',
      bannerTitle:'Team',
      data:[],
    },
    reducers:{
      save(state,{payload}){
        console.log('payload==p',payload)
        return {
          ...state,
          data:payload
        }
      },
      addMember(state,{payload}){
        const {data}=state;
        data[payload].data.push({name:'',job:'',email:''})
        return {
          ...state,
          data:[...data]
        }
      },
      changeName(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data[index]['data'][i]['name']=e.target.value
        return {
          ...state,
          data:[...data]
        }
      },
      changeJob(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data[index]['data'][i]['job']=e.target.value
        return {
          ...state,
          data:[...data]
        }
      },
      changeEmail(state,{payload}){
        const {index,i,e}=payload
        const {data}=state;
        data[index]['data'][i]['email']=e.target.value
        return {
          ...state,
          data:[...data]
        }
      }

    },
    effects:{
     *getTeamData({payload},{call,put}){
       let  {code,data}=yield call(getTeam)
       let list=data?.list||[]
       list=list.map(item=>{
         let {teamMemberList}=item
        let ret= teamMemberList.map(v=>({
           id:v.id,
           name:v.name,
           job:v.title,
           email:v.email,
         }))
         return {
           id:item.id,
           title:item.name,
           data: ret
         }
       })              
       yield put({type:'save',payload:list})
     },
     *addTeamMember({payload},{call,put}){
       let result;
       if(payload.id!==undefined){
        result=yield call(updateMember,payload)
       } else{
         result=yield call(addTeamMember,payload)
       }
       console.log('addTeam',result)
     },
     *delMember({payload},{call,put}){
       let result;
       console.log(payload)
       result=yield call(delTeamMember,payload)
       if(result.code==200){
         yield put({type:'getTeamData'})
       }
     }
    }
}