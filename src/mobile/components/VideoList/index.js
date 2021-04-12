/*
 * @Author: xingzai
 * @Date: 2020-12-13 00:59:06
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 00:59:06
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\VideoList\index.js
 */
import React from 'react'
import {connect} from 'dva'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import * as moment from 'moment'
import styles from './index.css'
const VideoList=(props)=>{
    const {list}=props
    return (
        <div className={styles.container}>
            {
                list.map((item,index)=>(
                    <OverPack playScale={0.3} key={index}>
                    <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                        <div className={styles.imgWrapper}>
                            <img src={item.imgUrl} alt="" className={styles.listImg} />
                            <img src="/playBtn.png" className={styles.playIcon} alt="" />
                        </div>
                        <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span></div>
                        <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
                    </TweenOne>
                    </OverPack>
                ))
            }
        </div>
    )
}
export default connect(({animation:{videoList}})=>({list:videoList}))(VideoList)
