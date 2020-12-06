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
      loginVisible:false,//登录对话框是否可见
      dashboardVisible:false,//dashboard是否可见
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
     toggleContact(state){
     return {
       ...state,
       contactVisible:!state.contactVisible
     }
     },
     toggleMenu(state){
       return {
         ...state,
         menuVisible:!state.menuVisible
       }
     },
     openLogin(state){
       return {
         ...state,
         loginVisible:true
       }
     },
     closeLogin(state){
       return {
         ...state,
         loginVisible:false
       }
     },
     openDashboard(state){
       return {
         ...state,
         dashboardVisible:true
       }
     },
     closeDashboard(state){
       return {
         ...state,
         dashboardVisible:false
       }
     },
     closeAll(state){
       return {
         ...state,
         loginVisible:false,
         dashboardVisible:false
       }
     }
    },
    effects:{

    }
}