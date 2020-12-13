/*
 * @Author: xingzai
 * @Date: 2020-12-13 00:59:06
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 00:59:06
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\VideoList\index.js
 */
import React from 'react'
import {connect} from 'dva'
import styles from './index.css'
const VideoList=(props)=>{
    const {list}=props
    console.log('list',list)
    return (
        <div className={styles.container}>
            {
                list.map((item,index)=>(
                    <div key={index} className={styles.listItem}>
                        <div className={styles.imgWrapper}>
                            <img src={item.imgUrl} alt="" className={styles.listImg} />
                            <img src="playBtn.png" className={styles.playIcon} alt="" />
                        </div>
                        <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
                    </div>
                ))
            }
        </div>
    )
}
export default connect(({animation:{videoList}})=>({list:videoList}))(VideoList)
