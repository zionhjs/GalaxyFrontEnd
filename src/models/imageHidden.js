import { getImages } from '@/service/api';
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
    currentPage:0,
    pageSize:10,
    isLast:false,
    images:[],
    col1:[],
    col2:[],
    col3:[],
    col4:[]
  },
  reducers:{
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
    save(state,{payload}){
      const {list}=payload
      const {images}=state
      return {
        ...state,
        images:images.concat(list)
      }

    },
    setPage(state,{payload}){
      return {
        ...state,
        currentPage:payload
      }
    },
    sortByRate(state){
      const {images}=state;
      images.sort((a,b)=>{return parseInt(b.rating)-parseInt(a.rating)})
      return {
        ...state,
        images,
      }
    },
    divideCol(state,{payload}){
      const {images}=state;
      let len=images.length;
      let col1=[]
      let col2=[]
      let col3=[]
      let col4=[]
      for(let i=0;i<len;i=i+4){
        col1.push(images[i])
        if(i<len-1){
          col2.push(images[i+1])
        }
        if(i<len-2){
          col3.push(images[i+2])
        }
        if(i<len-3){
          col4.push(images[i+3])
        }
      }
      return {
        ...state,
        col1,
        col2,
        col3,
        col4,
      }
    }
  },
  effects:{
    *getImage(action,{call,put,select}){
      let {currentPage,pageSize,isLast,loading}=yield select(state=>state.imageHidden)
      let {currentNav}=yield select(state=>state.global)
      if(isLast!=true){
        console.log('isLast',isLast!=true)
        let s;
        if(currentNav==0){
          s='interior'}
        else if(currentNav==1){
          s='exterior'}
        else if(currentNav==2){
          s='360'
        }else{
          s=''
        }
          const ret=yield call(getImages,{currentPage,pageSize,statusName:s})
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
          yield put({type:'save',payload:{list}})
          yield put({type:'setIsLast',payload:ret?.data?.isLastPage})
          if(ret?.data?.hasNextPage==true){
            yield put({type:'setPage',payload:(currentPage+1)})
          }
          yield put({type:'sortByRate'})
        yield put({type:'divideCol'})
      }

    }
  }
}
