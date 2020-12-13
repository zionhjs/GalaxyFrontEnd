/*
 * @Author: xingzai
 * @Date: 2020-12-13 03:24:40
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 03:24:41
 * @FilePath: \GalaxyFrontEnd\src\models\blog.js
 */
import data from '../data/blog.json'
export default {
    namespace:'blog',
    state:{
        confirmVisible:false,//删除确认对话框是否可见
        delItem:null,//要删除的文章
        articles:[],
    },
    reducers:{
        setDelItem(state,{payload}){
       return {
           ...state,
           delItem:payload
       }
        },
        openConfirm(state){
         return {
             ...state,
             confirmVisible:true
         }
        },
        closeConfirm(state){
        return {
            ...state,
            confirmVisible:false
        }
        },
        save(state,{payload}){
            return {
                ...state,
                articles:payload
            }
        }
    },
    effects:{
       *getArticles({payload},{call,put}){
           yield put({type:'save',payload:data.articles})
       } 
    }
}