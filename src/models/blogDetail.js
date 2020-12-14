/*
 * @Author: xingzai
 * @Date: 2020-12-13 23:46:44
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 23:46:44
 * @FilePath: \GalaxyFrontEnd\src\models\blogDetail.js
 */
import res from '../data/blogDetail.json'
export default {
    namespace:'blogdetail',
    state:{
        checked:false,//复选框是否选中（Save my name, email, and website in this browser for the next time I comment.）
       data:{
           article:'',
           recentPosts:[],
           tags:[],
           comments:[]
       }
    },
    reducers:{
        save(state,{payload}){
            console.log('payload===',payload)
            return {
                ...state,
                data:payload
            }
        },
        toggleChecked(state){
         return {
             ...state,
             checked:!state.checked
         }   
        }
    },
    effects:{
     *getDetailData({payload},{call,put}){
       yield put({type:'save',payload:res})
     }
    }
}