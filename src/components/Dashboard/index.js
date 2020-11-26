/*
 * @Author: xingzai
 * @Date: 2020-11-21 06:13:54
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-21 06:13:54
 * @FilePath: \test\src\components\Dashboard\index.js
 */
import React,{useState} from 'react'
import classnames from 'classnames'
import styles from './index.css'

const menus=['Interior','Exterior','Mixed','Nav to Animation']
export default function(props){
    const {visible,close,avatar}=props
    const [idx,setIdx]=useState(0)
    function selectMenu(index){
        setIdx(index)
    }
    return (
        <div className={classnames(styles.container,{[styles.visible]:visible})}>
            <div className={styles.header}>
                <img onClick={close} src="close.png" className={styles.closeIcon} alt="" />
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