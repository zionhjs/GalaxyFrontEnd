/*
 * @Author: xingzai
 * @Date: 2020-12-14 02:42:59
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-14 02:42:59
 * @FilePath: \GalaxyFrontEnd\src\models\editBlog.js
 */
import router from 'umi/router'
import {addArticle,uploadImgNotLogo,getArticleDetail,updateArticle,deleteComment} from '../service/api'
export default {
    namespace:'editblog',
    state:{
      checked:false,//上传的图片是否显示在文章中
        data:{
          images:[],//封面图片
          comments:[],
          tags:[],
          caption:'',
          author:'',
          article:'',
          lastUpdate:'',//最后更新日期
        }
    },
    reducers:{
      save(state,{payload}){
          return {
              ...state,
              data:payload
          }
      },
      saveCover(state,{payload}){
        const {data}=state;
        const {images}=data
        images.push(payload.imgUrl)
       return {
         ...state,
         data:{
           ...data
         }

       }
      },
      changeCaption(state,{payload}){
        const {data}=state;
         return {
           ...state,
           data:{...data,caption:payload}
         }
      },
      changeAuthor(state,{payload}){
        const {data}=state;
        return {
          ...state,
          data:{...data,author:payload}
        }
      },
      toggleChecked(state){
        return {
           ...state,
           checked:!state.checked
        }
      },
      changeArticle(state,{payload}){
        const {data}=state;
        return {
          ...state,
          data:{...data,article:payload}
        }
      },
      addTag(state){
        let {data}=state;
        let {tags}=data
        tags.push({text:''})
        return {
          ...state,
          data:{...data}
        }
        },
        tagChange(state,{payload:{index,value}}){
          let {data}=state;
          let {tags}=data;
          tags[index].text=value
          return {
            ...state,
            data:{...data}
          }
        }
      
    },
    effects:{
    *getEditBlogData({payload},{call,put}){
      let {data,code}=yield call(getArticleDetail,{id:payload})
      let images=data.blogImagesList?.map(item=>item.url)||[]
      let tags=data.tagName?.split(',')||[]
      tags=tags.map(item=>({text:item}))
      let result={
        id:data.id,
        caption:data.title,
        author:data.author,
        tags,
        images,
        article:data.content,
        comments:data.momentCommentList
      }
      yield put({type:'save',payload:result})
    },
    *uploadCover({payload},{call,put,select}){
      let form=new FormData()
      form.append('multipartFile',payload.file)
      let result=yield call(uploadImgNotLogo,form)
      if(result.code===200){
        yield put({type:'saveCover',payload:{imgUrl:result.data}})
      }
    },
    *submit({payload},{call,put,select}){
         const editblog=yield select(state=>state.editblog)
         const {data}=editblog;
         const {caption,author,article,images,tags}=data
         let temp=images.map(item=>({
           url:item,
           status:1,
         }))
         let tagName=tags.map(item=>item.text).join(',')
        let result= yield call(updateArticle,{id:payload,author,content:article,title:caption,blogImagesList:temp,tagName})
        if(result.code==200){
          router.goBack()
        }
    },
      *deleteComment({payload},{call,put}){
      const {commentId,blogId}=payload
      let result=yield call(deleteComment,{id:commentId})
        yield put({type:'getEditBlogData',payload:blogId})
      }
    }
}
