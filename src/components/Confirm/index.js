/*
 * @Author: xingzai
 * @Date: 2020-11-20 07:11:37
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-20 07:11:37
 * @FilePath: \test\src\components\Confirm\index.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './index.css'

const Confirm=(props)=>{
    const {visible,dispatch}=props
    const close=useCallback(()=>{
     dispatch({type:'blog/closeConfirm'})
    },[])
    const onConfirm=useCallback(()=>{

    },[])
    return (
        <div className={classnames(styles.container,{[styles.show]:visible})}>
            <div className={styles.header}>
               <img src="recycle.png" alt="" className={styles.recycleIcon} />
               <span className={styles.deleteText}>Delete</span>
               <img src="close.png" alt="" className={styles.closeIcon} onClick={close} /> 
            </div>
            <div className={styles.confirmPromptBox}>
                <img src="warnning.png" alt="" className={styles.warnIcon} />
                <div className={styles.confirmTitle}>Confirm delete?</div>
            </div>
            <div className={styles.confirmContent}>Will not be restored after deletion</div>
            <div onClick={onConfirm} className={styles.confirmBtn}>Confirm</div>

        </div>
    )
}
export default connect(({blog:{confirmVisible}})=>({visible:confirmVisible}))(Confirm)