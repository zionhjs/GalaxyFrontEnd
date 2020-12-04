/*
 * @Author: xingzai
 * @Date: 2020-12-01 06:29:45
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-01 06:29:46
 * @FilePath: \GalaxyFrontEnd\src\components\Video\index.js
 */
import React from 'react'
import ReactPlayer from 'react-player'
import styles from './index.css'
export default function(props){
    const {visible,video,close}=props
    return visible ? (
        <div className={styles.container}>
        
            <div className={styles.videoWrapper}><ReactPlayer controls light className={styles.video} width="100%" height="100%" url={video.video}/></div>            
            
            <div className={styles.desc}>Name-© 2020 GalaxyCGI</div>
            <img onClick={close} src="close.png" alt="" className={styles.closeIcon} />
            <img className={styles.preIcon} src="pre.png" alt="" />
            <img className={styles.nextIcon} src="next.png" alt="" />
        </div>
    ): null
}