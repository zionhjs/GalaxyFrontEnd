/*
 * @Author: xingzai
 * @Date: 2020-12-13 08:24:45
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 08:24:45
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\GetNews\index.js
 */
import React from 'react'
import {connect} from 'dva'
import styles from './index.css'
const GetNews=(props)=>{
    return (
        <div className={styles.container}>
            <div className={styles.title}>Get News</div>
            <div className={styles.text}>GalaxyCGI is an Architectural Visualization Company which focused on provide affordable photorealistic CG imagery &amp; Animation for marketing campaigns and design presentations</div>
            <input className={styles.nameInput} placeholder="Name" />
            <input className={styles.emailInput} placeholder="email" />
            <div className={styles.signBtn}>Sign Me up</div>
        </div>
    )
}
export default connect()(GetNews)