/*
 * @Author: xingzai
 * @Date: 2020-11-21 06:13:54
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-21 06:13:54
 * @FilePath: \test\src\components\Dashboard\index.js
 */
import React,{useState,useCallback} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './index.css'

const menus=['WaterMarker','UnderDevelopment Features',]
const Dashboard=(props)=>{
    const {avatar,visible}=props
    const [idx,setIdx]=useState(0)
    const selectMenu=useCallback(index=>{
        console.log('index===',index)
        setIdx(index)
    },[])
    return (
        <div className={classnames(styles.container,{[styles.visible]:visible})}>
            <div className={styles.header}>
            </div>
            <div><img src={avatar} className={styles.avatar} alt=""/></div>
            <div className={styles.nameText}>Tom Tang</div>
            <div className={styles.jobText}>Architect &amp; 3D Artist</div>
            <span className={styles.emailText}>tangshaobo90@gmail.com</span>
            {
                menus.map((item,index)=>(
                <div onClick={selectMenu.bind(null,index)} className={classnames(styles.menuItem,{[styles.active]:index===idx})} key={index}>{item}</div>
                ))
            }
            <div className={styles.footer}>
                <img src="email.png" className={styles.footerIcon} alt="" />
                <img src="tel.png" className={styles.footerIcon} alt="" />
                <img src="camera.png" className={styles.footerIcon} alt="" />
                <img src="bird.png" className={styles.footerIcon} alt="" />
                <img src="facebook.png" className={styles.footerIcon} alt="" />
                <img src="linkin.png" className={styles.footerIcon} alt="" />
            </div>
        </div>
    )
}
export default connect(({global})=>({visible:global.dashboardVisible}))(Dashboard)
