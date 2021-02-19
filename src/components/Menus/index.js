
/*
 * @Author: xingzai
 * @Date: 2020-11-12 06:01:38
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-12 06:01:38
 * @FilePath: \test\src\components\Menus\index.js
 */
import React, { useState,useCallback,useEffect ,Fragment} from 'react'
import QueueAnim from 'rc-queue-anim';
import Router from 'umi/router'
import {connect} from 'dva'
import styles from './index.css'

const menus = ['Home', 'Images', 'Animations','Blogs','Team']
const MenuComponent= (props)=> {
    const {dispatch,menuVisible,isLogin,idx } = props
  const gotoDashboard=useCallback(()=>{
    dispatch({type:'global/closeMenu'})
    dispatch({type:'global/openDashboard'})
  },[])
  const gotoLogin=useCallback(()=>{
    dispatch({type:'global/closeMenu'})
    dispatch({type:'global/openLogin'})
  },[])
  const gotoLogout=useCallback(()=>{
    let userId=localStorage.getItem('userId')
    dispatch({type:'login/logout',payload:{userId}})
  },[])
     function handleCliked(item, index) {
        if(item==='Home'){
            dispatch({type:'global/setCurrentMenu',payload:0})
          Router.push('/home')
        }
        if(item==='Images'){
           dispatch({type:'global/setCurrentMenu',payload:1})
          Router.push('/image')
        }
        if(item==='Animations'){
           dispatch({type:'global/setCurrentMenu',payload:2})
          Router.push('/animation')
        }
        if(item==='Blogs'){
          dispatch({type:'global/setCurrentMenu',payload:3})
          Router.push('/blogs')
        }
        if(item==='Team'){
          dispatch({type:'global/setCurrentMenu',payload:4})
          Router.push('/team')
        }
        dispatch({type:'global/closeMenu'})
    }

    return (
        menuVisible ? (<div className={styles.container}>
            <div className={styles.loginBox}>
              {isLogin ? <><div onClick={gotoDashboard} className={styles.dashboardText}>DashBoard</div><div onClick={gotoLogout} className={styles.logoutText}>Log out</div></> :<div onClick={gotoLogin} className={styles.loginText}>Login</div>}
            </div>
            <QueueAnim ease={"easeInOutElastic"} type="bottom"  className={styles.menuBox}>
                {menus.map((item, index) => (
                        <div className={styles.menuItem} key={index} onClick={() => handleCliked(item, index)} style={idx === index ? { color: '#fff' } : { color: '#9e9e9e' }}>{item}</div>                    
                ))}
            </QueueAnim>
        </div>):null
    )
}
export default connect(({global})=>({menuVisible:global.menuVisible,isLogin: global.isLogin,idx:global.currentMenu}))(MenuComponent)
