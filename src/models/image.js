/*
 * @Author: xingzai
 * @Date: 2020-12-10 23:29:17
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 01:39:34
 * @FilePath: \GalaxyFrontEnd\src\models\image.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-10 23:29:17
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-10 23:29:17
 * @FilePath: \GalaxyFrontEnd\src\models\image.js
 */
import _ from 'lodash'
let temp=[]
for(let i=1;i<=35;i++){
    let img=require('../assets/waterfall/'+i+'.jpeg')
    temp.push({id:i,name:'voluptatem',date:'2020.11.23',desc:'GalaxyCGI is an Architectural Visualization',imgUrl:img,liked:parseInt(Math.random()*1000)})
}
const banners=['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg']
const res={
    banners,
    images:temp
}
export default {
    namespace:'image',
    state:{
        bigImageVisible:false,//大图对话框是否可见
        currentIndex:0,
        currentItem:{},
        banners:[],
        images:[],
        col1:[],
        col2:[],
        col3:[],
        col4:[],

    },
    reducers:{
        openBigImage(state){
         return {
             ...state,
             bigImageVisible:true,
         }
        },
        closeBigImage(state){
          return {
              ...state,
              bigImageVisible:false
          }
        },
        setCurrent(state,{payload}){
            const {images}=state;
            let index=_.findIndex(images,function(o){return o.id===payload.id})
          return {
              ...state,
              currentIndex: index,
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
        next(state){
          let {currentIndex,images}=state;
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
         let {currentIndex,images}=state;
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
        save(state,{payload}){
            return {
                ...state,
                banners:payload.banners,
                images:payload.images
            }
        },
        sortByLiked(state){
      const {images}=state;
      images.sort((a,b)=>{return parseInt(b.liked)-parseInt(a.liked)})
      console.log('sort',images)
      return {
          ...state,
          images,
      }
        },
        divideCol(state){
            const {images}=state;
            console.log('divide',images)
            let len=images.length;
            let col1=[]
            let col2=[]
            let col3=[]
            let col4=[]
            for(let i=0;i<len;i=i+4){
                console.log('images',images[i])
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
                col4
            }
        }
    },
    effects:{
        *getImage({payload},{call,put}){            
            yield put({type:'save',payload:res})
            yield put({type:'sortByLiked'})
            yield put({type:'divideCol'}) 
        }
    }
}