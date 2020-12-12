/*
 * @Author: xingzai
 * @Date: 2020-12-11 23:20:50
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 23:20:51
 * @FilePath: \GalaxyFrontEnd\src\models\animation.js
 */
import data from '../data/animation.json'
import _ from 'lodash'
export default {
    namespace:'animation',
    state: {
        videoVisible:false,//播放器对话框是否可见
        currentIndex:0,//当前选中的视频的索引
        currentItem:{},//当前选中的视频
        updateFile:{},//当前要更新的视频
        uploadFile:{},//当前要上传的视频        
       videoList: [],//视频列表
       banners:[],//轮播图
    },
    reducers: {
        setUpdateFile(state,{payload}){
         return {
             ...state,
             updateFile:payload
         }
        },
        setUploadFile(state,{payload}){
            const {uploadFile}=state;
            return {
                ...state,
                uploadFile:{...uploadFile,file:payload.file}
            }
        },
        setUploadName(state,{payload}){
            const {uploadFile}=state;
         return {
             ...state,
             uploadFile:{...uploadFile,name:payload.name}
         }
        },
        setUploadDesc(state,{payload}){
            const {uploadFile}=state
        return {
            ...state,
            uploadFile:{...uploadFile,desc:payload.desc}
        }
        },
        save(state,{payload}){
            console.log('animation',payload)
            return {
                ...state,
                videoList:payload.videoList,
                banners:payload.banners
            }
        },
        openVideo(state){
            return {
                ...state,
                videoVisible:true
            }
        },
        closeVideo(state){
            return {
                ...state,
                videoVisible:false
            }
        },
        setCurrent(state,{payload}){
            const {videoList}=state;
            let index=_.findIndex(videoList,function(o){return o.id===payload.id})
         return {
             ...state,
             currentIndex:index,
             currentItem:payload

         }
        },
        setName(state,{payload}){
            const {currentItem}=state;
        return {
            ...state,
            currentItem: {...currentItem,name:payload}
        }
        },
        setDesc(state,{payload}){
        const {currentItem}=state;
        return {
            ...state,
            currentItem:{...currentItem,desc:payload}
        }
        },
        pre(state){
            let {currentIndex,videoList}=state;
            let len=videoList.length;
            if(currentIndex-1>=0){
                currentIndex--;
            }else{
                currentIndex=len-1;
            }
            return {
                ...state,
                currentIndex,
                currentItem:videoList[currentIndex]
            }
        },
        next(state){
            let {currentIndex,videoList}=state;
            let len=videoList.length;
            if(currentIndex<len-1){
              currentIndex++;
            }else{
                currentIndex=0;
            }
            return {
                ...state,
                currentIndex,
                currentItem:videoList[currentIndex]
            }
            
          },
    },
    effects: {
        *getAnimation({payload},{call,put}){
            yield put({type:'save',payload:data})
        }
    }
}