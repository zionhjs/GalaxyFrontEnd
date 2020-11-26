/*
 * @Author: xingzai
 * @Date: 2020-11-12 00:53:49
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-12 00:53:51
 * @FilePath: \test\src\components\LoadMore\index.js
 */
import React from 'react'
import styles from './index.css'

export default function(props){
    return (
        <React.Fragment>
            <div className={styles.loadMore}><img src="loadMore.png" className={styles.loadMoreImg} /><img src="loadMoreText.png" className={styles.loadMoreText} /></div>
            <div className={styles.downBox}>
                <div className={styles.boxLeft}>
                    <div className={styles.boxLeftTitle}>Get News</div>
                    <div className={styles.boxLeftText}>GalaxyCGI is an Architectural Visualization Company which focused on provide affordable photorealistic CG imagery &amp; Animation for marketing campaigns and design presentations</div>
                </div>
                <div className={styles.boxRight}>
                    <input className={styles.nameInput} placeholder="Name" />
                    <input className={styles.emailInput} placeholder="Email" />
                    <div className={styles.signBtn}>Sign Me up</div>
                </div>
            </div>
        </React.Fragment>
    )
}