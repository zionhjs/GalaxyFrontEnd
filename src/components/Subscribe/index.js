/*
 * @Author: xingzai
 * @Date: 2020-11-15 16:02:39
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-15 16:02:40
 * @FilePath: \test\src\components\Subscribe\index.js
 */
import React from 'react'
import {SmileFilled,CloseOutlined} from '@ant-design/icons'
import styles from './index.css'

export default function(props){
    const {visible,close}=props
    return (
        <div className={styles.container} style={visible ? {display:'flex'}:{display:'none'}}>
            <CloseOutlined onClick={close}  alt="" className={styles.closeIcon} />
            <SmileFilled className={styles.smileIcon} />
            <div className={styles.subText}>Subscribe to our newsletter and get Quote!</div>
            <input className={styles.subInput} placeholder="Enter your email" />
            <div className={styles.sendBtn}><img src="plane.png" alt="" className={styles.sendIcon} /></div>
        </div>
    )
}