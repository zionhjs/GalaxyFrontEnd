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
        isLast:false,
       loading:false,
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
          isLast:false,
          pages:0,
          videoList:[],
        }
      },
      setIsLast(state,{payload}){
        return {
          ...state,
          isLast:payload
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
            const {list}=payload
          const {videoList}=state
            return {
                ...state,
                videoList:videoList.concat(list)
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
        setLoading(state,{payload}){
        return {
          ...state,
          loading: payload
        }
        },
      closeEditor(state){
        return {
          ...state,
          currentItem:{id:null}
        }
      },
    },
    effects: {
        *getAnimation({payload},{call,put,select}){
            let {currentPage,pageSize,loading,isLast}=yield select(state=>state.animation)
          let {aniCurrentNav}=yield select(state=>state.global)
          if(isLast!=true) {
            let s;
            if (aniCurrentNav == 0) {
              s = 'regular'
            } else if (aniCurrentNav == 1) {
              s = '360'
            } else {
              s = ''
            }
            if(!loading){
              const result= yield call(getAnimation,{currentPage,pageSize,statusName:s})
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
              yield put({type:'save',payload:{list}})
              yield put({type:'setIsLast',payload:result?.data?.isLastPage})
              if(result?.data?.hasNextPage==true){
                yield put({type:'setPage',payload:(currentPage+1)})
              }
              yield put({type:'setLoading',payload:false})
            }
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
                yield put({type:'reset'})
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
                yield put({type:'reset'})
                yield put({type:'getAnimation'})
            }
          }
        },
        *confirmEdit({payload},{call,put,select}){
            let {currentItem}=yield select(state=>state.animation)
            let {imgUrl,name,desc,statusName,level,id}=currentItem
            let result=yield call(updateVideo,{id,objectUrl480:imgUrl,title:name,description:desc,statusName,level})
            if(result.code===200){
              yield put({type:'closeEditor'})
              yield put({type:'reset'})
                yield put({type:'getAnimation'})
            }

        }
    }
}
