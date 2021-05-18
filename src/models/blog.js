/*
 * @Author: xingzai
 * @Date: 2020-12-13 03:24:40
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 03:24:41
 * @FilePath: \GalaxyFrontEnd\src\models\blog.js
 */
import {getArticle,delArticle,addLike,searchBlog,getAllTags} from '../service/api'
export default {
    namespace:'blog',
    state:{
        currentPage:1,//当前分页
        pageSize:20,//分页大小
        hasMore:true,//是否有更多数据
        pages:0,//图片数据总页数
        confirmVisible:false,//删除确认对话框是否可见
        delItem:null,//要删除的文章
        articles:[],
    },
    reducers:{
      reset(state,{payload}){
        return {
          ...state,
          currentPage:1,
          hasMore:true,
          pages:0,
          articles:[]
        }
      },
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
            const {pages,list}=payload
            return {
                ...state,
                articles:[...list],
                pages
            }
        },
        saveMore(state,{payload}){
            const {articles}=state
          return {
              ...state,
              articles: articles.concat(payload)
          }
        },
    },
    effects:{
       *getArticles({payload},{call,put,select}){
        yield put({type:'setPage',payload:1})
        let {currentPage,pageSize}=yield select(state=>state.blog)
         let {blogCurrentNav,blogNavButtons}=yield select(state=>state.global)
           let tagName=blogNavButtons[blogCurrentNav]
           let result=yield call(getArticle,{currentPage,pageSize,tagName})
           let list=result.data.list
           list=list.map(item=>{
               let temp=item.blogImagesList.map(v=>v.url||'')
               let comment=item.momentCommentList?.length||0
               return {
                   images:temp,
                   title:item.title||'',
                   author:item.author||'',
                   date:item.updatedAt||item.createdAt||'',
                   content:item.content,
                   read:item.browseNum,
                   liked:item.likeNum,
                   comment,
                   id:item.id,
               }
           })
           yield put({type:'save',payload:{list,pages:result?.data?.pages||0}})
           if(currentPage<(result?.data?.pages||0)){
            yield put({type:'setHasMore',payload:true})
            yield put({type:'setPage',payload:(currentPage+1)})
        }
       } ,
       *loadMore({payload},{call,put,select}){
        let {currentPage,pageSize,pages,hasMore}=yield select(state=>state.blog)
        if(currentPage<pages){
            const ret=yield call(getArticle,{currentPage,pageSize})
            let list=ret?.data.list||[]
            list= list.map((item,index)=>{
                let temp=item.blogImagesList.map(v=>v.url||'')
               let comment=item.momentCommentList?.length||0
             return {
                images:temp,
                   title:item.title||'',
                   author:item.author||'',
                   date:item.updatedAt||item.createdAt||'',
                   content:item.content,
                   read:item.browseNum,
                   liked:item.likeNum,
                   comment,
                   id:item.id,
             }
         })
         yield put({type:'saveMore',payload:list})
         yield put({type:'setPage',payload:currentPage+1})
         yield put({type:'setHasMore',payload:true})
         }
         else if(currentPage==pages&&hasMore){
            const ret=yield call(getArticle,{currentPage,pageSize})
            let list=ret?.data.list||[]
            list= list.map((item,index)=>{
                let temp=item.blogImagesList.map(v=>v.url||'')
               let comment=item.momentCommentList?.length||0
             return {
                images:temp,
                   title:item.title||'',
                   author:item.author||'',
                   date:item.updatedAt||item.createdAt||'',
                   content:item.content,
                   read:item.browseNum,
                   liked:item.likeNum,
                   comment,
                   id:item.id,
             }
         })
         yield put({type:'saveMore',payload:list})
         yield put({type:'setHasMore',payload:false})
        }
    },
       *delArticle({payload},{call,put,select}){
           const {delItem}=yield select(state=>state.blog)
           let result=yield call(delArticle,{id:delItem.id})
           yield put({type:'closeConfirm'})
           yield put({type:'getArticles'})
       },
       *addLike({payload},{call,put}){
        let {code}=yield call(addLike,{type:payload.type,subjectId:payload.id})
        if(code==200){
            yield put({type:'getArticles'})
        }
       },
       *search({payload},{call,put,select}){
           const {title}=payload
           let result=yield call(searchBlog,{title})
           let list=result.data.list
           list=list.map(item=>{
               let temp=item.blogImagesList.map(v=>v.url||'')
               let comment=item.momentCommentList?.length||0
               return {
                   images:temp,
                   title:item.title||'',
                   author:item.author||'',
                   date:item.updatedAt||item.createdAt||'',
                   content:item.content,
                   read:item.browseNum,
                   liked:item.likeNum,
                   comment,
                   id:item.id,
               }
           })
           yield put({type:'save',payload:{list,pages:result?.data?.pages||0}})
       }
    }
}
