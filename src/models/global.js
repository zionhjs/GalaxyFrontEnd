/*
 * @Author: xingzai
 * @Date: 2020-12-04 07:36:51
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-04 07:36:52
 * @FilePath: \GalaxyFrontEnd\src\models\global.js
 */
export default {
    namespace:'global',
    state:{
      contactVisible:false,
    },
    reducers:{
     openContact(state){
       return {
         ...state,
         contactVisible:true
       }
     },
     closeContact(state){
       return {
         ...state,
         contactVisible:false
       }
     }
    },
    effects:{

    }
}