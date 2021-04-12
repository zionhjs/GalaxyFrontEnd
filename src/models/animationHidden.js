import _ from 'lodash';
import { getAnimation } from '@/service/api';

export default {
  namespace:'animationHidden',
  state:{
    currentPage:1,//当前分页
    pageSize:20,//分页大小
    hasMore:true,//是否有更多数据
    pages:0,//图片数据总页数
    videoVisible:false,//播放器对话框是否可见
    currentIndex:0,//当前选中的视频的索引
    currentItem:{},//当前选中的视频
    videoList: [],//视频列表
    starNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    starCurrentNav:2,
    galaxyNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    galaxyCurrentNav:2,
    universeNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    universeCurrentNav:2,
    currentCate:'star',
  },
  reducers:{
    reset(state,{payload}){
      return {
        ...state,
        currentPage:1,
        hasMore:true,
        pages:0,
        videoList:[],
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
    setStarCurrentNav(state,{payload}){
      return {
        ...state,
        starCurrentNav: payload
      }
    },
    setGalaxyCurrentNav(state,{payload}){
      return {
        ...state,
        galaxyCurrentNav: payload
      }
    },
    setUniverseCurrentNav(state,{payload}){
      return {
        ...state,
        universeCurrentNav: payload
      }
    },
    setCate(state,{payload}){
      return {
        ...state,
        currentCate: payload
      }
    },
  },
  effects:{
    *getAnimation({payload},{call,put,select}){
      yield put({type:'setPage',payload:1})
      let {currentPage,pageSize}=yield select(state=>state.animationHidden)
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
  }
}
