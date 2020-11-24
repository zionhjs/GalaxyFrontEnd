/*
 * @Author: xingzai
 * @Date: 2020-11-22 00:04:48
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-22 00:04:49
 * @FilePath: \test\src\components\BigImage\index.js
 */
import React from 'react'
import classnames from 'classnames'
import styles from './index.css'
export default function(props){
    const {visible,close}=props;
    return (
        <div className={classnames(styles.container,{[styles.visible]:visible})}>
            <img onClick={close} src="close.png" className={styles.closeIcon} alt="" />
            <img className={styles.pre} src="pre.png" alt="" />
            <img className={styles.next} src="next.png" alt="" />
           <div className={styles.picBox}><img src="profile3.jpeg" alt="" className={styles.pic} /></div>
           <div className={styles.desc}>Name-© 2020 GalaxyCGI</div>
        </div>
    )
}