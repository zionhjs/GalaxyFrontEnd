/*
 * @Author: xingzai
 * @Date: 2020-11-08 07:04:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-08 16:04:45
 * @FilePath: \test\src\pages\animation.js
 */
import React, {useEffect } from 'react'
import {connect} from 'dva'
import { useMediaQuery } from 'react-responsive'
import NavBar from '../components/NavBar'
import VideoList from '../components/VideoList'
import Video from '../components/Video'
import AnimationSwiper from '../components/AnimationSwiper'
import AnimationMobile from '../mobile/Animation'
import styles from './animation.css'
const AnimationPage=({dispatch})=> {
  const isMobile=window.screen.width<768
  useEffect(()=>{
    dispatch({type:'animation/getAnimation'})},[])
  return isMobile ? (<AnimationMobile />) : (
    <div className={styles.container}>
      <AnimationSwiper />
      <NavBar />
      <VideoList />
      <Video  />
    </div>
  )
}
export default connect()(AnimationPage)
