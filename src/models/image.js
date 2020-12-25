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
import {getImages,uploadImage} from '../service/api'
let temp=[]
for(let i=1;i<=35;i++){
    let img=require('../assets/waterfall/'+i+'.jpeg')
    temp.push({id:i,name:'voluptatem',date:'2020.11.23',desc:'GalaxyCGI is an Architectural Visualization',imgUrl:img,liked:parseInt(Math.random()*1000)})
}
const banners=['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg']
export default {
    namespace:'image',
    state:{
        bigImageVisible:false,//大图对话框是否可见
        currentIndex:0,
        currentItem:{},
        uploadImg:'',//要上传的图片的路径
        name:'',//要上传的图片的标题
        desc:'',//要上传的图片的描述
        banners:banners,
        images:[],
        col1:[],
        col2:[],
        col3:[],
        col4:[],

    },
    reducers:{
        setuploadImg(state,{payload}){
          return {
              ...state,
              uploadImg:payload
          }
        },
        setuploadDesc(state,{payload}){
            return {
                ...state,
                desc:payload
            }
        },
        setuploadName(state,{payload}){
            return {
                ...state,
                name:payload
            }
        },
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
                images:payload
            }
        },
       /*  sortByLiked(state){
      const {images}=state;
      images.sort((a,b)=>{return parseInt(b.liked)-parseInt(a.liked)})
      console.log('sort',images)
      return {
          ...state,
          images,
      }
        }, */
        divideCol(state){
            const {images}=state;
            console.log('imagesdivide===',images)
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
            const ret=yield call(getImages)
            let list=ret?.data?.list||[]
           list= list.map((item,index)=>{
                return {
                    id:item.id,
                    name:item.title,
                    date:item.createdAt,
                    desc:item.description,
                    imgUrl:item.objectUrl240
                }
            })          
            yield put({type:'save',payload:list})
           // yield put({type:'sortByLiked'})
            yield put({type:'divideCol'}) 
        },
        *upload({payload},{call,put,select}){
            const {uploadImg,name,desc}=yield select(state=>state.image)   
            console.log(uploadImg)
            console.log(name)
            console.log(desc)
            let form=new FormData()
            form.append('multipartFile',uploadImg)
            form.append('title',name)
            form.append('description',desc)
            form.append('suffix','in')
            form.append('level','star')
           const result= yield call(uploadImage,form)
           console.log(result)
        }
    }
}