/*
 * @Author: xingzai
 * @Date: 2020-12-01 06:29:45
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-01 06:29:46
 * @FilePath: \GalaxyFrontEnd\src\components\Video\index.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import ReactPlayer from 'react-player'
import styles from './index.css'
const Video=(props)=>{
    const {visible,currentItem,dispatch}=props
    const close=useCallback(()=>{
        dispatch({type:'animation/closeVideo'})
    },[])
    const next=useCallback(()=>{
        dispatch({type:'animation/next'})
    },[])
    const pre=useCallback(()=>{
        dispatch({type:'animation/pre'})
    },[])
    return visible ? (
        <div className={styles.container}>
        
            <div className={styles.videoWrapper}><ReactPlayer controls light className={styles.video} width="100%" height="100%" url={currentItem.video}/></div>            
            
            <div className={styles.desc}>Name-© 2020 GalaxyCGI</div>
            <img onClick={close} src="close.png" alt="" className={styles.closeIcon} />
            <img onClick={pre} className={styles.preIcon} src="pre.png" alt="" />
            <img onClick={next} className={styles.nextIcon} src="next.png" alt="" />
        </div>
    ): null
}
export default connect(({animation:{videoVisible,currentItem}})=>({visible:videoVisible,currentItem}))(Video)