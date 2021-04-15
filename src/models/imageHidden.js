import { getImages,getImagesByLevel } from '@/service/api';
import _ from 'lodash';
export default {
  namespace:'imageHidden',
  state:{
    starNavButtons: ['Interior','Exterior','360','Mixed','Nav to Animation'],//副导航菜单
    starCurrentNav:3,//副导航当前选中索引
    galaxyNavButtons: ['Interior','Exterior','360','Mixed','Nav to Animation'],//副导航菜单
    galaxyCurrentNav:3,//副导航当前选中索引
    universeNavButtons: ['Interior','Exterior','360','Mixed','Nav to Animation'],//副导航菜单
    universeCurrentNav:3,//副导航当前选中索引
    currentCate:'star',
    starCurrentPage:1,
    starPageSize:10,
    starIsLast:false,
    starImages:[],
    starCol1:[],
    starCol2:[],
    starCol3:[],
    starCol4:[],
    galaxyCurrentPage:1,
    galaxyPageSize:10,
    galaxyIsLast:false,
    galaxyImages:[],
    galaxyCol1:[],
    galaxyCol2:[],
    galaxyCol3:[],
    galaxyCol4:[],
    universeCurrentPage:1,
    universePageSize:10,
    universeIsLast:false,
    universeImages:[],
    universeCol1:[],
    universeCol2:[],
    universeCol3:[],
    universeCol4:[],
    type:'',
    currentItem:{},
    currentIndex:0,
    bigImageVisible:false,
  },
  reducers:{
    resetStar(state){
      return {
        ...state,
        starCurrentPage:1,
        starIsLast:false,
        starImages:[],
      }
    },
    resetGalaxy(state){
      return {
        ...state,
        galaxyCurrentPage:1,
        galaxyIsLast:false,
        galaxyImages:[],
      }
    },
    resetUniverse(state){
      return {
        ...state,
        universeCurrentPage:1,
        universeIsLast:false,
        universeImages:[],
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
    setIsLast(state,{payload}){
      return {
        ...state,
        isLast:payload
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
    },
    saveStar(state,{payload}){
      const {list}=payload
      const {starImages}=state
      return {
        ...state,
        starImages:starImages.concat(list)
      }
    },
    saveGalaxy(state,{payload}){
      const {list}=payload
      const {galaxyImages}=state
      return {
        ...state,
        galaxyImages:galaxyImages.concat(list)
      }
    },
    saveUniverse(state,{payload}){
      const {list}=payload
      const {universeImages}=state
      return {
        ...state,
        universeImages:universeImages.concat(list)
      }
    },
    setStarPage(state,{payload}){
      return {
        ...state,
        starCurrentPage: payload
      }
    },
    setGalaxyPage(state,{payload}){
      return {
        ...state,
        galaxyCurrentPage: payload
      }
    },
    setUniversePage(state,{payload}){
      return {
        ...state,
        universeCurrentPage: payload
      }
    },
    starSortByRate(state){
      const {starImages}=state;
      starImages.sort((a,b)=>{return parseInt(b.rating)-parseInt(a.rating)})
      return {
        ...state,
        starImages
      }
    },
    galaxySortByRate(state){
      const {galaxyImages}=state;
      galaxyImages.sort((a,b)=>{return parseInt(b.rating)-parseInt(a.rating)})
      return {
        ...state,
        galaxyImages
      }
    },
    universeSortByRate(state){
      const {universeImages}=state;
      universeImages.sort((a,b)=>{return parseInt(b.rating)-parseInt(a.rating)})
      return {
        ...state,
        universeImages
      }
    },
    starDivideCol(state,{payload}){
      const {starImages}=state;
      let len=starImages.length;
      let starCol1=[]
      let starCol2=[]
      let starCol3=[]
      let starCol4=[]
      for(let i=0;i<len;i=i+4){
        starCol1.push(starImages[i])
        if(i<len-1){
          starCol2.push(starImages[i+1])
        }
        if(i<len-2){
          starCol3.push(starImages[i+2])
        }
        if(i<len-3){
          starCol4.push(starImages[i+3])
        }
      }
      return {
        ...state,
        starCol1,
        starCol2,
        starCol3,
        starCol4,
      }
    },
    galaxyDivideCol(state,{payload}){
      const {galaxyImages}=state;
      let len=galaxyImages.length;
      let galaxyCol1=[]
      let galaxyCol2=[]
      let galaxyCol3=[]
      let galaxyCol4=[]
      for(let i=0;i<len;i=i+4){
        galaxyCol1.push(galaxyImages[i])
        if(i<len-1){
          galaxyCol2.push(galaxyImages[i+1])
        }
        if(i<len-2){
          galaxyCol3.push(galaxyImages[i+2])
        }
        if(i<len-3){
          galaxyCol4.push(galaxyImages[i+3])
        }
      }
      return {
        ...state,
        galaxyCol1,
        galaxyCol2,
        galaxyCol3,
        galaxyCol4,
      }
    },
    universeDivideCol(state,{payload}){
      const {universeImages}=state;
      let len=universeImages.length;
      let universeCol1=[]
      let universeCol2=[]
      let universeCol3=[]
      let universeCol4=[]
      for(let i=0;i<len;i=i+4){
        universeCol1.push(universeImages[i])
        if(i<len-1){
          universeCol2.push(universeImages[i+1])
        }
        if(i<len-2){
          universeCol3.push(universeImages[i+2])
        }
        if(i<len-3){
          universeCol4.push(universeImages[i+3])
        }
      }
      return {
        ...state,
        universeCol1,
        universeCol2,
        universeCol3,
        universeCol4,
      }
    },
    setCurrent(state,{payload}){
      const {type,item}=payload
      let images;
      if(type=='star'){
        images=state.starImages
      }else if(type=='galaxy'){
        images=state.galaxyImages
      }else if(type=='universe'){
        images=state.universeImages
      }
      let index=_.findIndex(images,function(o){return o.id===item.id})
      return {
        ...state,
        currentIndex: index,
        currentItem:item,
        type,
      }
    },
    next(state){
      let {currentIndex,type,starImages,galaxyImages,universeImages}=state;
      console.log('type',type)
      let images;
      if(type==='star'){
       images=starImages
      }else if(type==='galaxy'){
        images=galaxyImages
      }else if(type==='universe'){
        images=universeImages
      }
      let len=images.length;
      if(currentIndex<len-1){
        currentIndex++;
      }else{
        currentIndex=0;
      }
      return {
        ...state,
        currentIndex,
        currentItem:images[currentIndex]
      }

    },
    pre(state){
      let {currentIndex,type,starImages,galaxyImages,universeImages}=state;
      let images;
      if(type==='star'){
        images=starImages
      }else if(type==='galaxy'){
        images=galaxyImages
      }else if(type==='universe'){
        images=universeImages
      }
      let len=images.length;
      if(currentIndex-1>=0){
        currentIndex--;
      }else{
        currentIndex=len-1;
      }
      return {
        ...state,
        currentIndex,
        currentItem:images[currentIndex]
      }
    },
    closeBigImage(state){
      return {
        ...state,
        bigImageVisible:false,
        currentItem:{}
      }
    },
    openBigImage(state){
      return {
        ...state,
        bigImageVisible:true
      }
    }
  },
  effects:{
    *getStarImage(action,{call,put,select}){
      let r=yield select(state=>state.imageHidden)
      let {starCurrentPage,starPageSize,starIsLast,starCurrentNav}=r
      console.log('starCurrentPage',starCurrentPage)
      console.log(starPageSize)

      if(starIsLast!=true){
        let s;
        if(starCurrentNav==0){
          s='interior'}
        else if(starCurrentNav==1){
          s='exterior'}
        else if(starCurrentNav==2){
          s='360'
        }else{
          s=''
        }
        const ret=yield call(getImagesByLevel,{currentPage:starCurrentPage,pageSize:starPageSize,statusName:s,level:'star'})
        let list=ret?.data?.list||[]
        list= list.map((item,index)=>{
          return {
            id:item.id,
            name:item.title,
            date:item.createdAt,
            desc:item.description,
            imgUrl:item.objectUrl240,
            rating:item.rating,
            statusName:item.statusName,
            level:item.level,
          }
        })
        yield put({type:'saveStar',payload:{list}})
        yield put({type:'setStarIsLast',payload:ret?.data?.isLastPage})
        if(ret?.data?.hasNextPage==true){
          yield put({type:'setStarPage',payload:(starCurrentPage+1)})
        }
        yield put({type:'starSortByRate'})
        yield put({type:'starDivideCol'})
      }

    },
    *getGalaxyImage(action,{call,put,select}){
      let {galaxyCurrentPage,galaxyPageSize,galaxyIsLast,galaxyCurrentNav}=yield select(state=>state.imageHidden)
      if(galaxyIsLast!=true){
        let s;
        if(galaxyCurrentNav==0){
          s='interior'}
        else if(galaxyCurrentNav==1){
          s='exterior'}
        else if(galaxyCurrentNav==2){
          s='360'
        }else{
          s=''
        }
        const ret=yield call(getImagesByLevel,{currentPage:galaxyCurrentPage,pageSize:galaxyPageSize,statusName:s,level:'galaxy'})
        let list=ret?.data?.list||[]
        list= list.map((item,index)=>{
          return {
            id:item.id,
            name:item.title,
            date:item.createdAt,
            desc:item.description,
            imgUrl:item.objectUrl240,
            rating:item.rating,
            statusName:item.statusName,
            level:item.level,
          }
        })
        yield put({type:'saveGalaxy',payload:{list}})
        yield put({type:'setGalaxyIsLast',payload:ret?.data?.isLastPage})
        if(ret?.data?.hasNextPage==true){
          yield put({type:'setGalaxyPage',payload:(galaxyCurrentPage+1)})
        }
        yield put({type:'galaxySortByRate'})
        yield put({type:'galaxyDivideCol'})
      }

    },
    *getUniverseImage(action,{call,put,select}){
      let {universeCurrentPage,universePageSize,universeIsLast,universeCurrentNav}=yield select(state=>state.imageHidden)
      if(universeIsLast!=true){
        let s;
        if(universeCurrentNav==0){
          s='interior'}
        else if(universeCurrentNav==1){
          s='exterior'}
        else if(universeCurrentNav==2){
          s='360'
        }else{
          s=''
        }
        const ret=yield call(getImagesByLevel,{currentPage:universeCurrentPage,pageSize:universePageSize,statusName:s,level:'universe'})
        let list=ret?.data?.list||[]
        list= list.map((item,index)=>{
          return {
            id:item.id,
            name:item.title,
            date:item.createdAt,
            desc:item.description,
            imgUrl:item.objectUrl240,
            rating:item.rating,
            statusName:item.statusName,
            level:item.level,
          }
        })
        yield put({type:'saveUniverse',payload:{list}})
        yield put({type:'setUniverseIsLast',payload:ret?.data?.isLastPage})
        if(ret?.data?.hasNextPage==true){
          yield put({type:'setUniversePage',payload:(universeCurrentPage+1)})
        }
        yield put({type:'universeSortByRate'})
        yield put({type:'universeDivideCol'})
      }

    },
  }
}
