/*
 * @Author: xingzai
 * @Date: 2020-11-12 00:53:49
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-12 00:53:51
 * @FilePath: \test\src\components\LoadMore\index.js
 */
import React from 'react'
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import styles from './index.css'

export default function(props){
    const {loadMore}=props;
    return (
        <React.Fragment>
            <div onClick={loadMore} className={styles.loadMore}><img src="loadMore.png" className={styles.loadMoreImg} /><img src="loadMoreText.png" className={styles.loadMoreText} /></div>
            
            <OverPack playScale={0.3} className={styles.downBox}>

                <TweenOne key="getnew" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.boxLeft}>
                    <div className={styles.boxLeftTitle}>Get News</div>
                    <div className={styles.boxLeftText}>GalaxyCGI is an Architectural Visualization Company which focused on provide affordable photorealistic CG imagery &amp; Animation for marketing campaigns and design presentations</div>
                </TweenOne>

                <TweenOne key="form" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.boxRight}>
                    <input className={styles.nameInput} placeholder="Name" />
                    <input className={styles.emailInput} placeholder="Email" />
                    <div className={styles.signBtn}>Sign Me up</div>
                </TweenOne>
            </OverPack>
        </React.Fragment>
    )
}