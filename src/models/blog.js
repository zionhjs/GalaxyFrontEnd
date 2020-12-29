/*
 * @Author: xingzai
 * @Date: 2020-12-13 03:24:40
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 03:24:41
 * @FilePath: \GalaxyFrontEnd\src\models\blog.js
 */
import data from '../data/blog.json'
import {getArticle,delArticle} from '../service/api'
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
           let result=yield call(getArticle)
           console.log('blog',result)
           let list=result.data.list
           list=list.map(item=>{
               let temp=item.blogImagesList.map(v=>v.url||'')
               return {
                   images:temp,
                   title:item.title||'',
                   author:item.author||'',
                   date:item.updatedAt||'',
                   content:item.content,
                   read:item.browseNum,
                   liked:item.likeNum,
                   comment:'',
                   id:item.id,
               }
           })

           yield put({type:'save',payload:list})
       } ,
       *delArticle({payload},{call,put,select}){
           const {delItem}=yield select(state=>state.blog)
           console.log('delaaaa=',delItem)
           let result=yield call(delArticle,{id:delItem.id})
           console.log(result)        
           yield put({type:'closeConfirm'})
           yield put({type:'getArticles'})
       }
    }
}