/*
 * @Author: xingzai
 * @Date: 2020-12-13 23:46:44
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 23:46:44
 * @FilePath: \GalaxyFrontEnd\src\models\blogDetail.js
 */
import {getArticleDetail,addComment,addLike,getRecentPost} from '../service/api'
import router from 'umi/router'
import _ from 'lodash'
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
       },
       backup:''//文章的缓存用于恢复文章原来的数据
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
            return {
                ...state,
                data:payload
            }
        },
        replaceText(state,{payload}){
            const {data}=state
            let {article}=data
            article=article.replace(payload,'<span class="text-selection">$&</span>')
            return {
                ...state,
                data:{
                    ...data,
                    article
                }

            }
        },
        restoreArticle(state,{payload}){
            const {data}=state;
            return {
                ...state,
                data:{
                    ...data,
                    article:payload
                }
            }
        },
        backupArticle(state,{payload}){
        return {
            ...state,
            backup:payload
        }
        }
       
    },
    effects:{
     *getDetailData({payload},{call,put}){
        let {data,code}= yield call(getArticleDetail,{id:payload})
        let comments=data?.momentCommentList||[]
        comments=comments.map(item=>({
            id:item.id,
            avatar:item.imageUrls||'',
            content:item.comment,
            date:item.updatedAt||item.createdAt||'',
            likes:item.likeNum,
            name:item.name
        }))
        let recent=yield call(getRecentPost)
        let recentPosts=[]
        if(recent?.code==200){
         recentPosts=recent.data.list.map(item=>({
             id:item.id,
             author:item.author,
             date:item.createdAt||item.updatedAt||'',
             imgUrl:item.blogImagesList[0]?.url||'',
             title:item.title
         }))
        }
        let tags=data?.tagName||''
        tags=tags.split(',')
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
            tags,
        }
       yield put({type:'save',payload:result})
       yield put({type:'backupArticle',payload:data?.content||''})
     },
     *addComment({payload:{momentId,name,email,checked,comment}},{call,put,select}){
         let {code}=yield call(addComment,{momentId,name,email,comment})
         if(code==200){
            yield put({type:'getDetailData',payload:momentId})
         }
         
     },
     *toNextPost({payload},{call,put,select}){
         const {articleId}=payload
         const {articles}=yield select(state=>state.blog)
         let idx=_.findIndex(articles,function(o){return o.id==articleId})
         let len=articles.length
         let nextId
         if(idx<len-1){
             nextId=_.nth(articles,idx+1).id
         }else{
             nextId=_.first(articles).id
         }
         router.replace('blogDetail?id='+nextId)
     },
     *addLike({payload},{call,put}){
      let {code}=yield call(addLike,{type:payload.type,subjectId:payload.id})
      if(code==200){
          yield put({type:'getDetailData',payload:payload.id})
      }
     },
     *addCommentLike({payload},{call,put}){
        let {code}=yield call(addLike,{type:payload.type,subjectId:payload.commentId})
      if(code==200){
          yield put({type:'getDetailData',payload:payload.id})
      } 
     },
     *searchText({payload},{call,put,select}){
         const {backup}=yield select(state=>state.blogdetail)        
          yield put({type:'restoreArticle',payload:backup})        
         yield put({type:'replaceText',payload:payload.keyword})
     }
    }
}
