/*
 * @Author: xingzai
 * @Date: 2020-12-11 06:55:26
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 06:55:27
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ImageMobile\index.js
 */
import React from 'react'
import {connect} from 'dva'
import Swiper from './swiper'
import NavBar from '../NavBar'
import styles from './index.css'
const ImageMobile=({images})=>{
    return (
        <div className={styles.container}>
            <Swiper />
            <NavBar />
            <div className={styles.list}>
                {images.map((item,index)=>(
                    <div className={styles.listItem}>
                        <img className={styles.listImg} src={item.imgUrl} alt="" />
                <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
                    </div>
                ))}
           </div>            
        </div>
    )
}
export default connect(({image:{images}})=>({images}))(ImageMobile)