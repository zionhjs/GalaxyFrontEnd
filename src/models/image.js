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
import {getImages,uploadImage,updateImg,updateImgText} from '../service/api'
//let temp=[]
/* for(let i=1;i<=35;i++){
    let img=require('../assets/waterfall/'+i+'.jpeg')
    temp.push({id:i,name:'voluptatem',date:'2020.11.23',desc:'GalaxyCGI is an Architectural Visualization',imgUrl:img,liked:parseInt(Math.random()*1000)})
} */
const banners=['imageBanner1.jpeg', 'imageBanner2.jpeg', 'imageBanner3.jpeg', 'imageBanner4.jpeg']
export default {
    namespace:'image',
    state:{
        currentPage:1,//当前分页
        pageSize:20,//分页大小
        hasMore:true,//是否有更多数据
        bigImageVisible:false,//大图对话框是否可见
        img360Visible:false,//360对话框是否可见
        currentIndex:0,
        currentItem:{},
        uploadImg:'',//要上传的图片的路径
        name:'',//要上传的图片的标题
        desc:'',//要上传的图片的描述
        suffix:'',//要上传图片的suffix
        level:'',//要上传图片的level
        banners:banners,
        images:[],
        pages:0,//图片数据总页数
        col1:[],
        col2:[],
        col3:[],
        col4:[],

    },
    reducers:{
        setHasMore(state,{payload}){
            return {
                ...state,
                hasMore:payload
            }
        },
        saveUpdateImg(state,{payload}){
         let {col1,col2,col3,col4,images}=state;
         const {id}=payload
         images= images.map(item => {
            if(item.id===id){
                return {
                    ...item,
                    ...payload
                }
            }
            return item;             
        });
        col1= col1.map(item => {
             if(item.id===id){
                 return {
                     ...item,
                     ...payload
                 }
             }
             return item;             
         });
         col2= col2.map(item => {
            if(item.id===id){
                return {
                    ...item,
                    ...payload
                }
            }
            return item;             
        });
        col3= col3.map(item => {
            if(item.id===id){
                return {
                    ...item,
                    ...payload
                }
            }
            return item;             
        });
        col4= col4.map(item => {
            if(item.id===id){
                return {
                    ...item,
                    ...payload
                }
            }
            return item;             
        });
        return {
            ...state,
            images:[...images],
            col1:[...col1],
            col2:[...col2],
            col3:[...col3],
            col4:[...col4]
        }
        },
        
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
        setuploadSuffix(state,{payload}){
        return {
            ...state,
            suffix:payload
        }
        },
        setuploadLevel(state,{payload}){
            return {
                ...state,
                level:payload
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
        openImg360(state){
            return {
                ...state,
                img360Visible:true,
            }
        },
        closeImg360(state){
            return {
                ...state,
                img360Visible:false
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
        setSuffix(state,{payload}){
         const {currentItem}=state;
         return {
             ...state,
             currentItem:{
                 ...currentItem,
                 suffix:payload
             }
         }
        },
        setLevel(state,{payload}){
        const {currentItem}=state
        return {
            ...state,
            currentItem:{
                ...currentItem,
                level:payload
            }
        }
        },
        setPage(state,{payload}){
              return {
                  ...state,
                  currentPage:payload
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
            const {list,pages}=payload
            console.log('pages====',pages)
            return {
                ...state,
                images:list,
                pages
            }
        },
        saveMore(state,{payload}){
            const {images}=state
          return {
              ...state,
              images: images.concat(payload)
          }
        },
         sortByRate(state){
      const {images}=state;
      images.sort((a,b)=>{return parseInt(b.rating)-parseInt(a.rating)})
      console.log('sort',images)
      return {
          ...state,
          images,
      }
        }, 
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
        },
        closeEditor(state){
            return {
                ...state,
                currentItem:{}
            }
        }
    },
    effects:{
        *getImage({payload},{call,put,select}){
            yield put({type:'setPage',payload:1})
         let {currentPage,pageSize}=yield select(state=>state.image)
            const ret=yield call(getImages,{currentPage,pageSize})
            let list=ret?.data?.list||[]
            console.log('ret===',ret)
           list= list.map((item,index)=>{
                return {
                    id:item.id,
                    name:item.title,
                    date:item.createdAt,
                    desc:item.description,
                    imgUrl:item.objectUrl240,
                    rating:item.rating,
                    suffix:item.suffix,
                    level:item.level,
                }
            })          
            yield put({type:'save',payload:{list,pages:ret?.data?.pages||0}})
            console.log('ret.data.pages',ret?.data?.pages)
            console.log('currentPage<ret.data.pages?',currentPage<(ret?.data?.pages||0))
            if(currentPage<(ret?.data?.pages||0)){
                yield put({type:'setHasMore',payload:true})
                console.log('sethasmore')
                yield put({type:'setPage',payload:(currentPage+1)})
            }
            yield put({type:'sortByRate'})
            yield put({type:'divideCol'}) 
        },
        *loadMore({payload},{call,put,select}){
            let {currentPage,pageSize,pages,hasMore}=yield select(state=>state.image)           
            if(currentPage<pages){
               const ret=yield call(getImages,{currentPage,pageSize})
               let list=ret?.data.list||[]
               list= list.map((item,index)=>{
                return {
                    id:item.id,
                    name:item.title,
                    date:item.createdAt,
                    desc:item.description,
                    imgUrl:item.objectUrl240,
                    rating:item.rating,
                    suffix:item.suffix,
                    level:item.level,
                }
            })
            yield put({type:'saveMore',payload:list})
            yield put({type:'setPage',payload:currentPage+1})
            yield put({type:'setHasMore',payload:true})
            }
            else if(currentPage==pages&&hasMore){
                const ret=yield call(getImages,{currentPage,pageSize})
                let list=ret?.data.list||[]
                list= list.map((item,index)=>{
                 return {
                     id:item.id,
                     name:item.title,
                     date:item.createdAt,
                     desc:item.description,
                     imgUrl:item.objectUrl240,
                     rating:item.rating,
                     suffix:item.suffix,
                     level:item.level,
                 }
             })
             yield put({type:'saveMore',payload:list})
             yield put({type:'setHasMore',payload:false})
            }
            yield put({type:'sortByRate'})
            yield put({type:'divideCol'}) 
        },
        *upload({payload},{call,put,select}){
            const {uploadImg,name,desc,suffix,level}=yield select(state=>state.image)
            let form=new FormData()
            form.append('multipartFile',uploadImg)
            form.append('title',name)
            form.append('description',desc)
            form.append('suffix',suffix)
            form.append('level',level)
           const result= yield call(uploadImage,form)
           console.log('uploadimg',result)
           let data= yield put({type:'getImage'})
               console.log('data===',data)
        },
        *updateImg({payload},{call,put}){
            let {id,file}=payload
            let form=new FormData()
            form.append('multipartFile',file)
            let result=yield call(updateImg,form)
            console.log('resu',result)
            if(result.code==200){
                yield put({type:'saveUpdateImg',payload:{id,imgUrl:result.data}})
            }            
        },
        *updateImgText({payload},{call,put,select}){
            let image=yield select(state=>state.image)
            let {name,desc,id,suffix,level}=image?.currentItem
           let result= yield call(updateImgText,{id,description:desc,title:name,suffix,level})
           yield put({type:'saveUpdateImg',payload:{id,name:result.data.title,desc:result.data.description,suffix:result.data.suffix,level:result.data.level}})
           yield put({type:'closeEditor'})
        }
    }
}