/*
 * @Author: xingzai
 * @Date: 2020-12-12 08:36:04
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-12 08:36:05
 * @FilePath: \GalaxyFrontEnd\src\mobile\Animation\index.js
 */
import React from 'react'
import {connect} from 'dva'
import Swiper from './swiper'
import NavBar from '../components/AnimationNavBar'
import VideoList from '../components/VideoList'
import LoadMore from '../components/LoadMore'
import GetNews from '../components/GetNews'
import styles from './index.css'
const AnimationPage=(props)=>{
    return (
        <div className={styles.container}>
            <Swiper />
            <NavBar />
            <VideoList />
            <LoadMore />
            <GetNews />
        </div>
    )
}
export default connect()(AnimationPage)
