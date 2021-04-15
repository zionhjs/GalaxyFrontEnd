/*
 * @Author: xingzai
 * @Date: 2020-12-10 23:29:17
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 01:39:34
 * @FilePath: \GalaxyFrontEnd\src\models\image.js
 */
import _ from 'lodash'
import {getImages,uploadImage,updateImg,updateImgText,deleteImage} from '../service/api'
const banners=['/imageBanner1.jpeg', '/imageBanner2.jpeg', '/imageBanner3.jpeg', '/imageBanner4.jpeg','/imageBanner5.jpeg','/imageBanner6.jpeg','/imageBanner7.jpeg']
export default {
    namespace:'image',
    state:{
      loading:false,
        currentPage:1,//当前分页
        pageSize:20,//分页大小
        isLast:false,//是否是最后一页
        bigImageVisible:false,//大图对话框是否可见
        img360Visible:false,//360对话框是否可见
        currentIndex:0,
        currentItem:{},
        uploadImg:'',//要上传的图片的路径
        name:'',//要上传的图片的标题
        desc:'',//要上传的图片的描述
        statusName:'interior',//要上传图片的statusName
        level:'star',//要上传图片的level
        banners:banners,
        images:[],
        col1:[],
        col2:[],
        col3:[],
        col4:[],
      mobileImages:[],

    },
    reducers:{
      setLoading(state,{payload}){
        return {
          ...state,
          loading: payload
        }
      },
        setIsLast(state,{payload}){
            return {
                ...state,
                isLast:payload
            }
        },
        reset(state){
            return {
                ...state,
                currentPage:1,
                isLast:false,
                images:[],
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
            col1,
            col2,
            col3,
            col4
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
            statusName:payload
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
                img360Visible:false,
                 currentItem:{}
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
      setCurrentImgUrl(state,{payload}){
          const {currentItem}=state;
         return {
           ...state,
           currentItem:{
             ...currentItem,
             imgUrl:payload
           }
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
            const {list}=payload
            const {images}=state
            return {
                ...state,
                images:images.concat(list)
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
            const {currentNav}=payload
            const {images}=state;
            console.log('images====divide',images)

           /* if(currentNav==0){
                temp=_.filter(images,{statusName:'interior'})
                console.log('temp===interior',temp)
            }else if(currentNav==1){
                console.log('temp===exterior',temp)
                temp=_.filter(images,{statusName:'exterior'})
            }else if(currentNav==2){
                console.log('temp===360',temp)
                temp=_.filter(images,{statusName:'360'})
            }else {
                temp=images
            }*/
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
                col4,
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
        *getImage(action,{call,put,select}){
         let {currentPage,pageSize,isLast,loading}=yield select(state=>state.image)
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
           if(!loading){
             yield put({type:'setLoading',payload:true})
             const ret=yield call(getImages,{currentPage,pageSize,statusName:s})
             console.log('status==1',ret)
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
             yield put({type:'divideCol',payload:{currentNav}})
             yield put({type:'setLoading',payload:false})
           }
         }
            
        },      
        *upload({payload},{call,put,select}){
          const  image=yield select(state=>state.image)
          const {uploadImg,name,desc,statusName,level}=image
          console.log('uploadstatusnameimage',image)

          console.log('uploadstatusName=====',statusName)
            let form=new FormData()
            form.append('multipartFile',uploadImg)
            form.append('title',name)
            form.append('description',desc)
            form.append('statusName',statusName)
            form.append('level',level)
           const result= yield call(uploadImage,form)
           console.log('uploadimg',result)
           yield put({type:'reset'})
           let data= yield put({type:'getImage'})
               console.log('data===',data)
        },
        *updateImg({payload},{call,put,select}){
            let {id,file}=payload
            let form=new FormData()
            form.append('multipartFile',file)
            let result=yield call(updateImg,form)
            let ret;
            if(result.code==200) {
              yield put({ type: 'saveUpdateImg', payload: { id, imgUrl: result.data } })
              yield put({ type: 'setCurrentImgUrl', payload: result.data })
              let image=yield  select(state=>state.image)
              let {name,desc,id,statusName,level,imgUrl}=image?.currentItem
              ret=yield call(updateImgText,{id,description:desc,title:name,statusName,level,objectUrl240:imgUrl})
            }
            if(ret.code==200){
              yield put({type:'reset'})
              let {currentPage,pageSize,isLast}=yield select(state=>state.image)
              let {currentNav}=yield select(state=>state.global)
              if(isLast!=true){
                const retVal=yield call(getImages,{currentPage,pageSize})
                let list=retVal?.data?.list||[]
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
                yield put.resolve({type:'save',payload:{list}})
                yield put({type:'setIsLast',payload:ret?.data?.isLastPage})
                if(retVal?.data?.hasNextPage==true){
                  yield* put({type:'setPage',payload:(currentPage+1)})
                }
                yield put({type:'sortByRate'})
                yield put({type:'divideCol',payload:{currentNav}})
                yield put ({type:'closeEditor'})
              }

            }
        },
        *updateImgText({payload},{call,put,select}){
            let image=yield select(state=>state.image)
            let {name,desc,id,statusName,level,imgUrl}=image?.currentItem
           let result= yield call(updateImgText,{id,description:desc,title:name,statusName,level,objectUrl240:imgUrl})
           yield put({type:'saveUpdateImg',payload:{id,name:result.data.title,desc:result.data.description,statusName:result.data.statusName,level:result.data.level}})
           yield put({type:'closeEditor'})
        },
      *deleteImage({payload},{call,put}){
          let result=yield call(deleteImage,{id:payload})
        if(result.code==200){
          yield put({type:'reset'})
          yield put({type:'getImage'})
        }
      }
    }
}
