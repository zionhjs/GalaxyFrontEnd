/*
 * @Author: xingzai
 * @Date: 2020-12-09 23:27:49
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 23:27:50
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ThreeLine\index.js
 */
import React,{useCallback} from 'react'
import styles from './index.css'
import {connect} from 'dva'
const ThreeLine=(props)=>{
    const {dispatch}=props
    const handleClick=useCallback(()=>{
        dispatch({type:'global/toggleMenuMobile'})
        var nav_line_1 = document.getElementById('nav-line-1');
        var nav_line_2 = document.getElementById('nav-line-2');
        var nav_line_3 = document.getElementById('nav-line-3');
        nav_line_1.classList.toggle(styles["nav-line-actived-1"]);
        nav_line_2.classList.toggle(styles["nav-line-actived-2"]);
        nav_line_3.classList.toggle(styles["nav-line-actived-3"]);
    },[])
    return (
        <div onClick={handleClick} className={styles['nav-icon']} id="nav-icon">
          <div className={styles["nav-line"]} id="nav-line-1" />
          <div className={styles["nav-line"]} id="nav-line-2" />
          <div className={styles["nav-line"]} id="nav-line-3" />
        </div>
    )
}
export default connect()(ThreeLine)