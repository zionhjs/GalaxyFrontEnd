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
      contactVisible:false,//底部聊天对话框是否可见
      menuVisible:false,//右上角3条杠打开的菜单是否可见
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
     },
     toggleMenu(state){
       return {
         ...state,
         menuVisible:!state.menuVisible
       }
     }
    },
    effects:{

    }
}