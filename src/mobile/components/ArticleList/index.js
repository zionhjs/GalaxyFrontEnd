/*
 * @Author: xingzai
 * @Date: 2020-12-13 05:44:34
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 05:44:35
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ArticleList\index.js
 */
import React from 'react'
import {connect} from 'dva'
import Swiper from './swiper'
import styles from './index.css'
const ArticleList=(props)=>{
    const {articles}=props
    return (
        <div className={styles.container}>
            {
                articles.map((item,index)=>(
                    <div key={index} className={styles.listItem}>
                        <Swiper data={item.images} />
                        <div className={styles.articleTitle}>{item.title}</div>
                <div className={styles.authorWrapper}><span className={styles.authorText}>{item.author}</span><span className={styles.dateText}>{item.date}</span></div>
                <div className={styles.listContent}>{item.content}</div>
                <div className={styles.descBox}>
                    <img src="read.png" className={styles.readIcon} alt="" />
                    <span className={styles.readText}>{item.read}</span>
                    <img src="liked.png" className={styles.likedIcon} alt="" />
                    <span className={styles.likedText}>{item.liked}</span>
                    <img src="comment.png" className={styles.commentIcon} alt="" />
                    <span className={styles.commentText}>{item.comment}</span>
                </div>
                    </div>
                ))
            }
        </div>
    )
}
export default connect(({blog:{articles}})=>({articles}))(ArticleList)