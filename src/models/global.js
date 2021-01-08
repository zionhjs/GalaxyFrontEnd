/*
 * @Author: xingzai
 * @Date: 2020-12-05 08:42:57
 * @LastEditors: xingzai
 * @LastEditTime: 2021-01-07 08:27:59
 * @FilePath: \GalaxyFrontEnd\src\models\global.js
 */
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
      chatToken:null,
      role:'adm',
      menus:[{ icon: 'home.png', text: 'Home',route:'/home' },
      { icon: 'image.png', text: 'Images',route:'/image' },
      { icon: 'animation.png', text: 'Animations',route:'/animation' },
      { icon: 'edit.png', text: 'Blogs',route:'/blogs' },
      { icon: 'team.png', text: 'Team',route:'/team' }],//顶部导航菜单
      navButtons: ['Interior','Exterior','360','Mixed','Nav to Animation'],//副导航菜单
      currentNav:3,//副导航当前选中索引
      contactVisible:false,//底部聊天对话框是否可见
      menuVisible:false,//右上角3条杠打开的菜单是否可见
      loginVisible:false,//登录对话框是否可见
      dashboardVisible:false,//dashboard是否可见
      menuVisibleMobile:false,//移动端导航栏是否可见
    },
    reducers:{
      setCurrentNav(state,{payload}){
       return {
         ...state,
         currentNav:payload
       }
      },
      toggleMenuMobile(state){
       return {
         ...state,
         menuVisibleMobile:!state.menuVisibleMobile
       }
      },
      closeMenuMobile(state){      
      return {
        ...state,
        menuVisibleMobile:false
      }
      },
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
     closeMenu(state){
return {
  ...state,
  menuVisible:false
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