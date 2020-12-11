/*
 * @Author: xingzai
 * @Date: 2020-11-22 00:04:48
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-22 00:04:49
 * @FilePath: \test\src\components\BigImage\index.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './index.css'
const BigImage=(props)=>{
    const {visible,currentItem,dispatch}=props;
    const close=useCallback(()=>{
        dispatch({type:'image/closeBigImage'})
    },[])
    const pre=useCallback(()=>{
        dispatch({type:'image/pre'})
    },[])
    const next=useCallback(()=>{
        dispatch({type:'image/next'})
    },[])
    return (
        <div className={classnames(styles.container,{[styles.visible]:visible})}>
            <img onClick={close} src="close.png" className={styles.closeIcon} alt="" />
            <img onClick={pre} className={styles.pre} src="pre.png" alt="" />
            <img onClick={next} className={styles.next} src="next.png" alt="" />
           <div className={styles.picBox}><img src={currentItem.imgUrl} alt="" className={styles.pic} /></div>
    <div className={styles.desc}>{currentItem.desc}</div>
        </div>
    )
}
export default connect(({image})=>({visible:image.bigImageVisible,currentItem:image.currentItem}))(BigImage)