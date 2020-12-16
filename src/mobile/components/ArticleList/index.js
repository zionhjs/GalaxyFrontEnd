/*
 * @Author: xingzai
 * @Date: 2020-12-13 05:44:34
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 05:44:35
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ArticleList\index.js
 */
import React, { useCallback } from 'react'
import { connect } from 'dva'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import router from 'umi/router'
import Swiper from './swiper'
import styles from './index.css'
const ArticleList = (props) => {
    const { articles } = props
    const gotoDetail = useCallback((item) => {
        router.push('blogDetail?id=' + item.id)
    }, [])
    return (
        <div className={styles.container}>
            {
                articles.map((item, index) => (
                    <OverPack key={index} playScale={0.3}>
                    <TweenOne key={'article'+index} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.listItem}>
                        <Swiper data={item.images} />
                        <div onClick={gotoDetail.bind(null, item)} className={styles.articleTitle}>{item.title}</div>
                        <div className={styles.authorWrapper}><span className={styles.authorText}>{item.author}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div onClick={gotoDetail.bind(null, item)} className={styles.listContent}>{item.content}</div>
                        <div className={styles.descBox}>
                            <img src="read.png" className={styles.readIcon} alt="" />
                            <span className={styles.readText}>{item.read}</span>
                            <img src="liked.png" className={styles.likedIcon} alt="" />
                            <span className={styles.likedText}>{item.liked}</span>
                            <img src="comment.png" className={styles.commentIcon} alt="" />
                            <span className={styles.commentText}>{item.comment}</span>
                        </div>
                    </TweenOne>
                    </OverPack>
                ))
            }
        </div>
    )
}
export default connect(({ blog: { articles } }) => ({ articles }))(ArticleList)