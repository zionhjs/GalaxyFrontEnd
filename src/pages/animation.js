/*
 * @Author: xingzai
 * @Date: 2020-11-08 07:04:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-09 01:43:31
 * @FilePath: \test\src\pages\animation.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-11-08 07:04:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-08 16:04:45
 * @FilePath: \test\src\pages\animation.js
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import classnames from 'classnames'
import NavBar from '../components/NavBar'
import VideoList from '../components/VideoList'
import Video from '../components/Video'
import AnimationSwiper from '../components/AnimationSwiper'
import { getAnimation } from '../service/api'
import cover from '../assets/animation/video.png'
import styles from './animation.css'
const navButtons = ['Regular', '360 VR/AR', 'Mixed', 'Nav to lmages']
const videoList = [{
  id:1,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:2,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:3,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:4,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:5,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:6,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
}, {
  id:7,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
},
{
  id:8,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
},
{
  id:9,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": "watermarked4kAedas.mp4"
},

]
const role="admin"
export default function (props) {
  const [videoVisible,setVideoVisible]=useState(false)
  const [video,setVideo]=useState({})
  useEffect(() => {
    //TODO:获取数据
    async function getResult() {
      let result = await getAnimation()
      console.log(result)
      return result;
    }
    getResult()
    return function () { }
  },[]) 
  function btnClicked(item) {
    console.log(item)
  }
  const play=useCallback((item)=>{
    console.log('item',item)
    setVideo(item)
    setVideoVisible(true)
  },[])
  const closeVideo=useCallback(()=>{setVideoVisible(false)},[])
  return (
    <div className={styles.container}>
      <AnimationSwiper />
      <NavBar navButtons={navButtons} onBtnClicked={btnClicked} />
      <VideoList data={videoList} role={role} play={play} />
      <Video visible={videoVisible} video={video} close={closeVideo} />
    </div>
  )
}