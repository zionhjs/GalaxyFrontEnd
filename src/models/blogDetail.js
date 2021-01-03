/*
 * @Author: xingzai
 * @Date: 2020-12-13 23:46:44
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 23:46:44
 * @FilePath: \GalaxyFrontEnd\src\models\blogDetail.js
 */
import res from '../data/blogDetail.json'
import {getArticleDetail,addComment} from '../service/api'
let news='Making brilliant architecture presentations is an art in itself. Because no matter how genius a concept is, poor delivery can bury it for good. The thing is, it’s not about just presenting a great idea. It’s about convincing a potential client that it’s the best solution for them. Now, this might seem a bit too complicated, but it absolutely isn’t. In fact, creating a successful demo is more like following a recipe that guarantees amazing results. ...'
export default {
    namespace:'blogdetail',
    state:{
        commentDialogVisible:false,//移动端底部评论对话框是否可见
       data:{
           article:'',
           recentPosts:[],
           tags:[],
           comments:[]
       }
    },
    reducers:{
        openComment(state){
         return {
             ...state,
             commentDialogVisible:true,
         }
        },
        closeComment(state){
         return {
             ...state,
             commentDialogVisible:false
         }
        },
        save(state,{payload}){
            console.log('payload===',payload)
            return {
                ...state,
                data:payload
            }
        },
       
    },
    effects:{
     *getDetailData({payload},{call,put}){
        let {data,code}= yield call(getArticleDetail,{id:payload})
        console.log('data===',data)
        let comments=data?.momentCommentList||[]
        comments=comments.map(item=>({
            avatar:'',
            content:'',
            date:'',
            likes:'',
            name:''
        }))
        let recentPosts=[]
        recentPosts=recentPosts.map(item=>({
            author:'',
            date:'',
            imgUrl:'',
            title:''
        }))
        let tags=data?.tagName||''
        tags=tags.split('/')
        let result={
            title:data?.title||'',
            author:data?.author||'',
            date:data?.updatedAt||data?.createdAt||'',
            read:data?.browseNum||0,
            likes:data?.likeNum||0,
            commentNum:data?.momentCommentList?.length||0,
            article:data?.content||'',
            news,
            comments,
            recentPosts,
            tags
        }
       yield put({type:'save',payload:result})
     },
     *addComment({momentId,name,email,checked,comment},{call,put,select}){
         yield call(addComment,{momentId,comment})
     }
    }
}