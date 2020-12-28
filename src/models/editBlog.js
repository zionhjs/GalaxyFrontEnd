/*
 * @Author: xingzai
 * @Date: 2020-12-14 02:42:59
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-14 02:42:59
 * @FilePath: \GalaxyFrontEnd\src\models\editBlog.js
 */
import res from '../data/editBlog.json'
import {addArticle,uploadImgNotLogo} from '../service/api'
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
      
    },
    effects:{
    *getEditBlogData({payload},{call,put}){
      yield put({type:'save',payload:res})
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
         const {caption,author,article,images}=data
         let temp=images.map(item=>({
           url:item,
           status:1,
         }))
        let result= yield call(addArticle,{author,content:article,title:caption,blogImagesList:temp})
        console.log('addArticle===',result)
    }
    }
}