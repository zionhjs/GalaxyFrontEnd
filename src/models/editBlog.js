/*
 * @Author: xingzai
 * @Date: 2020-12-14 02:42:59
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-14 02:42:59
 * @FilePath: \GalaxyFrontEnd\src\models\editBlog.js
 */
import res from '../data/editBlog.json'
export default {
    namespace:'editblog',
    state:{
      checked:false,//上传的图片是否显示在文章中
      images:[],//要上传的图片的地址
        data:{
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
      selectImages(state,{payload}){
        const {images}=state;
        return {
          ...state,
          images:images.concat(payload)
        }
      }
    },
    effects:{
    *getEditBlogData({payload},{call,put}){
      yield put({type:'save',payload:res})
    },
    *submit({payload},{caption,put,select}){
         const editblog=yield select(state=>state.editblog)
         const {data}=editblog;
    }
    }
}