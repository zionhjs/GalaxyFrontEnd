import _ from 'lodash';
import { getAnimationByLevel } from '@/service/api';

export default {
  namespace:'animationHidden',
  state:{
    videoVisible:false,//播放器对话框是否可见
    currentIndex:0,//当前选中的视频的索引
    currentItem:{},//当前选中的视频
    starCurrentPage:1,//当前分页
    starPageSize:10,//分页大小
    starIsLast:false,
    starVideoList: [],//视频列表
    starNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    starCurrentNav:2,
    galaxyCurrentPage:1,
    galaxyPageSize:10,
    galaxyIsLast:false,
    galaxyVideoList:[],
    galaxyNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    galaxyCurrentNav:2,
    universeCurrentPage:1,
    universePageSize:10,
    universeIsLast:false,
    universeVideoList:[],
    universeNavButtons:['Regular','360 VR/AR','Mixed','Nav to Images'],
    universeCurrentNav:2,
    currentCate:'star',
    type:'',
  },
  reducers:{
    resetStar(state,{payload}){
      return {
        ...state,
        starCurrentPage:1,
        starIsLast:false,
        starVideoList:[],
      }
    },
    resetGalaxy(state,{payload}){
      return {
        ...state,
        galaxyCurrentPage:1,
        galaxyIsLast:false,
        galaxyVideoList:[],
      }
    },
    resetUniverse(state,{payload}){
      return {
        ...state,
        universeCurrentPage:1,
        universeIsLast:false,
        universeVideoList:[],
      }
    },

    setStarPage(state,{payload}){
      return {
        ...state,
        starCurrentPage:payload
      }
    },
    setGalaxyPage(state,{payload}){
      return {
        ...state,
        galaxyCurrentPage:payload
      }
    },
    setUniversePage(state,{payload}){
      return {
        ...state,
        universeCurrentPage:payload
      }
    },
    saveStar(state,{payload}){
      const {list}=payload
      const {starVideoList}=state
      return {
        ...state,
        starVideoList:starVideoList.concat(list),
      }
    },
    saveGalaxy(state,{payload}){
      const {list}=payload
      const {galaxyVideoList}=state;
      return {
        ...state,
        galaxyVideoList:galaxyVideoList.concat(list),
      }
    },
    saveUniverse(state,{payload}){
      const {list}=payload
      const {universeVideoList}=state;
      return {
        ...state,
        universeVideoList:universeVideoList.concat(list),
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
      const {type,item}=payload
      const {starVideoList,galaxyVideoList,universeVideoList}=state;
      let videoList;
      if(type=='star'){
        videoList=starVideoList
      }else if (type=='galaxy'){
        videoList=galaxyVideoList
      } else if(type=='universe'){
        videoList=universeVideoList
      }
      let index=_.findIndex(videoList,function(o){return o.id===item.id})
      return {
        ...state,
        currentIndex:index,
        currentItem:item,
        type,

      }
    },
    pre(state){
      let {currentIndex,type,starVideoList,galaxyVideoList,universeVideoList}=state;
      let videoList;
      let map={'star':starVideoList,'galaxy':galaxyVideoList,'universe':universeVideoList}
      videoList= map[type]
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
      let {currentIndex,type,starVideoList,galaxyVideoList,universeVideoList}=state;
      let videoList;
      let map={'star':starVideoList,'galaxy':galaxyVideoList,'universe':universeVideoList}
      videoList=map[type]
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
    setStarIsLast(state,{payload}){
      return {
        ...state,
        starIsLast:payload
      }
    },
    setGalaxyIsLast(state,{payload}){
      return {
        ...state,
        galaxyIsLast:payload
      }
    },
    setUniverseIsLast(state,{payload}){
      return {
        ...state,
        universeIsLast:payload
      }
    }
  },
  effects:{
    *getStarAnimation({payload},{call,put,select}){
      let {starCurrentPage,starPageSize,starIsLast,starCurrentNav}=yield select(state=>state.animationHidden)
      if(starIsLast!=true) {
        let s;
        if (starCurrentNav == 0) {
          s = 'regular'
        } else if (starCurrentNav == 1) {
          s = '360'
        } else {
          s = ''
        }
          const result= yield call(getAnimationByLevel,{currentPage:starCurrentPage,pageSize:starPageSize,statusName:s,level:'star'})
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
          yield put({type:'saveStar',payload:{list}})
          yield put({type:'setStarIsLast',payload:result?.data?.isLastPage})
          if(result?.data?.hasNextPage==true){
            yield put({type:'setStarPage',payload:(starCurrentPage+1)})
          }
    }
    },
    *getGalaxyAnimation({payload},{call,put,select}){
      let {galaxyCurrentPage,galaxyPageSize,galaxyIsLast,galaxyCurrentNav}=yield select(state=>state.animationHidden)
      if(galaxyIsLast!=true) {
        let s;
        if (galaxyCurrentNav == 0) {
          s = 'regular'
        } else if (galaxyCurrentNav == 1) {
          s = '360'
        } else {
          s = ''
        }
        const result= yield call(getAnimationByLevel,{currentPage:galaxyCurrentPage,pageSize:galaxyPageSize,statusName:s,level:'galaxy'})
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
        yield put({type:'saveGalaxy',payload:{list}})
        yield put({type:'setGalaxyIsLast',payload:result?.data?.isLastPage})
        if(result?.data?.hasNextPage==true){
          yield put({type:'setGalaxyPage',payload:(galaxyCurrentPage+1)})
        }
      }
    },
    *getUniverseAnimation({payload},{call,put,select}){
      let {universeCurrentPage,universePageSize,universeIsLast,universeCurrentNav}=yield select(state=>state.animationHidden)
      if(universeIsLast!=true) {
        let s;
        if (universeCurrentNav == 0) {
          s = 'regular'
        } else if (universeCurrentNav == 1) {
          s = '360'
        } else {
          s = ''
        }
        const result= yield call(getAnimationByLevel,{currentPage:universeCurrentPage,pageSize:universePageSize,statusName:s,level:'universe'})
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
        yield put({type:'saveUniverse',payload:{list}})
        yield put({type:'setUniverseIsLast',payload:result?.data?.isLastPage})
        if(result?.data?.hasNextPage==true){
          yield put({type:'setUniversePage',payload:(universeCurrentPage+1)})
        }
      }
    }
  },
}
