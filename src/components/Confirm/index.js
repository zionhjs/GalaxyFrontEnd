/*
 * @Author: xingzai
 * @Date: 2020-11-20 07:11:37
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-20 07:11:37
 * @FilePath: \test\src\components\Confirm\index.js
 */
import React from 'react'
import classnames from 'classnames'
import styles from './index.css'

export default function(props){
    const {visible,close,onConfirm}=props
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