/*
 * @Author: xingzai
 * @Date: 2020-12-15 04:27:48
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-15 04:27:49
 * @FilePath: \GalaxyFrontEnd\src\mobile\BlogDetail\Dialog.js
 */
import React,{useCallback,Fragment,useState} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './dialog.css'
const Dialog=props=>{
    const {visible,dispatch}=props;
    const [zoom,setZoom]=useState(false)
    const close=useCallback(()=>{
 dispatch({type:'blogdetail/closeComment'})
    },[])
    const toggleZoom=useCallback(()=>{
    setZoom(!zoom)
    },[zoom])
    return visible ? (
        <Fragment>
        <div className={styles.container}>
            <input placeholder="Name" className={styles.nameInput} />
            <input placeholder="Email" className={styles.emailInput} />
            <div className={styles.commentContent}>
                <textarea placeholder="Enter your comment..." className={classnames({[styles.commentTextarea]:!zoom,[styles.zoomInTextarea]:zoom})} />
                <div className={styles.iconWrapper}>
                <img onClick={toggleZoom} src="zoom.png" alt="" className={styles.zoomIcon} />
                <img src="plane.png" alt="" className={styles.planeIcon} />
            </div>
            </div>           
        </div>
        <div onClick={close} className={styles.mask}></div> 
        </Fragment>
    ) : null
}
export default connect(({blogdetail:{commentDialogVisible}})=>({visible:commentDialogVisible}))(Dialog)