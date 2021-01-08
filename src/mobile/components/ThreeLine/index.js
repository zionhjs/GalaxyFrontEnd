/*
 * @Author: xingzai
 * @Date: 2020-12-09 23:27:49
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 23:27:50
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ThreeLine\index.js
 */
import React,{useCallback} from 'react'
import styles from './index.css'
import classnames from 'classnames'
import {connect} from 'dva'
const ThreeLine=(props)=>{
    const {dispatch,visible}=props
    const handleClick=useCallback(()=>{
        dispatch({type:'global/toggleMenuMobile'})
    },[])
    return (
        <div onClick={handleClick} className={styles['nav-icon']} id="nav-icon">
          <div className={classnames(styles["nav-line"],{[styles["nav-line-actived-1"]]:visible})} id="nav-line-1" />
          <div className={classnames(styles["nav-line"],{[styles["nav-line-actived-2"]]:visible})} id="nav-line-2" />
          <div className={classnames(styles["nav-line"],{[styles["nav-line-actived-3"]]:visible})} id="nav-line-3" />
        </div>
    )
}
export default connect(({global})=>({visible:global.menuVisibleMobile}))(ThreeLine)