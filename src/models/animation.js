/*
 * @Author: xingzai
 * @Date: 2020-12-11 23:20:50
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-28 07:33:20
 * @FilePath: \GalaxyFrontEnd\src\models\animation.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-11 23:20:50
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 23:20:51
 * @FilePath: \GalaxyFrontEnd\src\models\animation.js
 */
import _ from 'lodash'
import {getAnimation,uploadVideo,updateVideo,updateVideoUrl} from '../service/api'
const banners=['/animationBanner1.jpeg', '/animationBanner2.jpeg', '/animationBanner3.jpeg', '/animationBanner4.jpeg']
export default {
    namespace:'animation',
    state: {
        currentPage:1,//当前分页
        pageSize:20,//分页大小
        hasMore:true,//是否有更多数据
        pages:0,//图片数据总页数
        videoVisible:false,//播放器对话框是否可见
        currentIndex:0,//当前选中的视频的索引
        currentItem:{},//当前选中的视频
        uploadFile:{},//当前要上传的视频        
       videoList: [],//视频列表
       banners:banners,//轮播图
    },
    reducers: {
      reset(state,{payload}){
        return {
          ...state,
          currentPage:1,
          hasMore:true,
          pages:0
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
        setUpdateFile(state,{payload}){
            const {currentItem}=state;
         return {
             ...state,
             currentItem:{
                 ...currentItem,
                 imgUrl:payload
             }
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
        setuploadSuffix(state,{payload}){
          const {uploadFile}=state
          return {
              ...state,
              uploadFile:{
                  ...uploadFile,
                  statusName:payload
              }
          }
        },
        setuploadLevel(state,{payload}){
            const {uploadFile}=state;
            return {
                ...state,
                uploadFile:{
                    ...uploadFile,
                    level:payload
                }
            }
        },
        save(state,{payload}){
            const {pages,list}=payload
            return {
                ...state,
                videoList:list,
                pages
            }
        },
        saveMore(state,{payload}){
            const {videoList}=state
          return {
              ...state,
              videoList: videoList.concat(payload)
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
        setSuffix(state,{payload}){
            const {currentItem}=state;
            return {
                ...state,
                currentItem:{
                    ...currentItem,
                    statusName:payload
                }
            }
        },
        setLevel(state,{payload}){
            const {currentItem}=state;
            console.log('currentItem===',currentItem)
            console.log(payload)
            return {
                ...state,
                currentItem:{
                    ...currentItem,
                    level:payload
                }
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
        *getAnimation({payload},{call,put,select}){
            yield put({type:'setPage',payload:1})
            let {currentPage,pageSize}=yield select(state=>state.animation)
           const result= yield call(getAnimation,{currentPage,pageSize})
           let list=result?.data?.list||[]
           list=list.map((item)=>({
               id:item.id,
               name:item.title,
               date:item.createdAt,
               desc:item.description,
               imgUrl:item.frameImages,
               video:item.objectUrl480,
               statusName:item.statusName,
               level:item.level

           }))
            yield put({type:'save',payload:{list,pages:result?.data?.pages||0}})
            if(currentPage<(result?.data?.pages||0)){
                yield put({type:'setHasMore',payload:true})
                yield put({type:'setPage',payload:(currentPage+1)})
            }
        },
        *loadMore({payload},{call,put,select}){
            let {currentPage,pageSize,pages,hasMore}=yield select(state=>state.animation)
            if(currentPage<pages){
                const ret=yield call(getAnimation,{currentPage,pageSize})
                let list=ret?.data.list||[]
                list= list.map((item,index)=>{
                 return {
                    id:item.id,
                    name:item.title,
                    date:item.createdAt,
                    desc:item.description,
                    imgUrl:item.frameImages,
                    video:item.objectUrl480,
                    statusName:item.statusName,
                    level:item.level
                 }
             })
             yield put({type:'saveMore',payload:list})
             yield put({type:'setPage',payload:currentPage+1})
             yield put({type:'setHasMore',payload:true})
             }
             else if(currentPage==pages&&hasMore){
                const ret=yield call(getAnimation,{currentPage,pageSize})
                let list=ret?.data.list||[]
                list= list.map((item,index)=>{
                 return {
                    id:item.id,
                    name:item.title,
                    date:item.createdAt,
                    desc:item.description,
                    imgUrl:item.frameImages,
                    video:item.objectUrl480,
                    statusName:item.statusName,
                    level:item.level
                 }
             })
             yield put({type:'saveMore',payload:list})
             yield put({type:'setHasMore',payload:false})
            }
        },
        *upload({payload},{call,put,select}){
            let state=yield select(state=>state.animation)
            let file=state?.uploadFile?.file||''
            let name=state?.uploadFile?.name||''
            let desc=state?.uploadFile.desc||''  
            let statusName=state?.uploadFile.statusName||''
            let level=state?.uploadFile.level||'' 
            let form=new FormData()
            form.append('multipartFile',file)
            form.append('title',name)
            form.append('description',desc)
            form.append('statusName',statusName)
            form.append('level',level)
            console.log('form===',form)
           const result= yield call(uploadVideo,form)
           if(result.code===200){
               yield put({type:'getAnimation'})
           }
        },
        *updateVideoUrl({payload},{call,put,select}){
            let {currentItem}=yield select(state=>state.animation)
            let {name,desc,statusName,level,id}=currentItem
            let form=new FormData()
            form.append('multipartFile',payload.file)
          let result=yield call(updateVideoUrl,form)
          if(result.code===200){
              yield put({type:'setUpdateFile',payload:result.data})
              let ret=yield call(updateVideo,{id,objectUrl480:result.data,title:name,description:desc,statusName,level})
              if(ret.code===200){
                yield put({type:'getAnimation'})
            } 
          }          
        },
        *confirmEdit({payload},{call,put,select}){
            let {currentItem}=yield select(state=>state.animation)
            let {imgUrl,name,desc,statusName,level,id}=currentItem
            let result=yield call(updateVideo,{id,objectUrl480:imgUrl,title:name,description:desc,statusName,level})
            if(result.code===200){
                yield put({type:'getAnimation'})
            }            

        }
    }
}
