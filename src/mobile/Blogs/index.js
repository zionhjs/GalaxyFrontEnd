/*
 * @Author: xingzai
 * @Date: 2020-12-13 04:58:36
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 04:58:37
 * @FilePath: \GalaxyFrontEnd\src\mobile\Blogs\index.js
 */
import React from 'react'
import {connect} from 'dva'
import NavBar from '../components/NavBar'
import ArticleList from '../components/ArticleList'
import LoadMore from '../components/LoadMore'
import GetNews from '../components/GetNews'
import styles from './index.css'
const BlogPage=(props)=>{
    return (
        <div className={styles.container}>
            <div className={styles.bannerBox}>
                <img src="splash.jpeg" className={styles.bannerImg} />
                <div className={styles.searchBox}>
                    <div className={styles.searchTitle}>Work with us</div>
                    <div className={styles.searchText}>See how 3D visualization can improve your business</div>
                    <div className={styles.inputView}>
                        <input className={styles.searchInput} placeholder="Blog Search Bar" />
                        <img src="search.png" className={styles.searchIcon}  />
                        </div>                    
                </div>
            </div>
            <NavBar />
            <ArticleList />
            <LoadMore />
            <GetNews />
        </div>
    )
}
export default connect()(BlogPage)