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
export default {
    namespace:'team',
    state:{
      currentPage:1,//当前分页
      pageSize:20,//分页大小
      hasMore:true,//是否有更多数据
      pages:0,//图片数据总页数
      bannerImg:'/splash.jpeg',
      bannerText:'We have more than 200 employees across the world. Here we only showing our permanent and business manager & technical director list',
      bannerTitle:'Team',
      data:[],
    },
    reducers:{
      setHasMore(state,{payload}){
        return {
            ...state,
            hasMore:payload
        }
    },
    setPage(state,{payload}){
        return {
            ...state,
            currentPage:payload
        }       
  },
      save(state,{payload}){
        const {list,pages}=payload        
        return {
          ...state,
          data:list,
          pages
        }
      },
      saveMore(state,{payload}){
        const {data}=state
      return {
          ...state,
          data: data.concat(payload)
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
     *getTeamData({payload},{call,put,select}){
      yield put({type:'setPage',payload:1})
      let {currentPage,pageSize}=yield select(state=>state.team)
      let {code,data}= yield call(getTeam,{currentPage,pageSize})
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
       yield put({type:'save',payload:{list,pages:data?.pages||0}})
       if(currentPage<(data?.pages||0)){
        yield put({type:'setHasMore',payload:true})
        yield put({type:'setPage',payload:(currentPage+1)})
    }              
     },
     *loadMore({payload},{call,put,select}){
      let {currentPage,pageSize,pages,hasMore}=yield select(state=>state.team)
      if(currentPage<pages){
          const ret=yield call(getTeam,{currentPage,pageSize})
          let list=ret?.data.list||[]
          list= list.map((item,index)=>{
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
       yield put({type:'saveMore',payload:list})
       yield put({type:'setPage',payload:currentPage+1})
       yield put({type:'setHasMore',payload:true})
       }
       else if(currentPage==pages&&hasMore){
          const ret=yield call(getTeam,{currentPage,pageSize})
          let list=ret?.data.list||[]
          list= list.map((item,index)=>{
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
       yield put({type:'saveMore',payload:list})
       yield put({type:'setHasMore',payload:false})
      }
  },
     *addTeamMember({payload},{call,put}){
       let result;
       if(payload.id!==undefined){
        result=yield call(updateMember,payload)
       } else{
         result=yield call(addTeamMember,payload)
       }
     },
     *delMember({payload},{call,put}){
       let result;
       result=yield call(delTeamMember,payload)
       if(result.code==200){
         yield put({type:'getTeamData'})
       }
     }
    }
}
