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
import React, { useState, useRef, useEffect } from 'react'
import { Carousel } from 'antd';
import classnames from 'classnames'
import NavBar from '../components/NavBar'
import VideoList from '../components/VideoList'
import { getAnimation } from '../service/api'
import cover from '../assets/animation/video.png'
import styles from './animation.css'

const leftBanners = [{ imgUrl: 'banner1.jpeg', video: '' }, { imgUrl: 'banner2.jpeg', video: '' }, { imgUrl: 'banner3.jpeg', video: '' }, { imgUrl: 'banner4.jpeg', video: '' }]
const midBanners = [{ imgUrl: 'banner2.jpeg', video: '' }, { imgUrl: 'banner3.jpeg', video: '' }, { imgUrl: 'banner4.jpeg', video: '' }, { imgUrl: 'banner1.jpeg', video: '' }]
const rightBanners = [{ imgUrl: 'banner3.jpeg', video: '' }, { imgUrl: 'banner4.jpeg', video: '' }, { imgUrl: 'banner1.jpeg', video: '' }, { imgUrl: 'banner2.jpeg', video: '' }]
const navButtons = ['Regular', '360 VR/AR', 'Mixed', 'Nav to lmages']
const videoList = [{
  id:1,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:2,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:3,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:4,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:5,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:6,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
}, {
  id:7,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
},
{
  id:8,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
},
{
  id:9,
  "name": "voluptatem",
  "date": "2020.11.23",
  "desc": "GalaxyCGI is an Architectural Visualization",
  "imgUrl": cover,
  "video": ""
},

]
const role="admin"
export default function (props) {
  const [currentDot, setDot] = useState(0)//轮播图当前选中图片索引
  const leftCarousel = useRef()
  const rightCarousel = useRef()
  const midCarousel = useRef()
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
  function pre() {
    let arr = [leftCarousel, midCarousel, rightCarousel]
    const len = midBanners.length
    if (currentDot === 0) {
      setDot(len - 1)
    } else {
      setDot(currentDot - 1)
    }
    for (const value of arr) {
      value.current.prev()
    }
  }
  function next() {
    let arr = [leftCarousel, midCarousel, rightCarousel]
    const len = midBanners.length
    if (currentDot === len - 1) {
      setDot(0)
    } else {
      setDot(currentDot + 1)
    }
    for (const value of arr) {
      value.current.next()
    }
  }
  function play(item) {
    console.log(item)
  }
  function btnClicked(item) {
    console.log(item)
  }
  return (
    <div className={styles.container}>
      <div className={styles.bannerBox}>
        <div className={styles.leftBox}>
          <Carousel dots={false} ref={leftCarousel}>
            {leftBanners.map((item, index) => (
              <div key={index} className={styles.leftBanner}><img src={item.imgUrl} alt="" className={styles.leftImg} /></div>
            ))}
          </Carousel>
          <img className={styles.preBtn} src="pre.png" alt="" onClick={pre} />
        </div>
        <div className={styles.midBox}>
          <Carousel dots={false} ref={midCarousel}>
            {midBanners.map((item, index) => (
              <div key={index} className={styles.midBanner}><img src={item.imgUrl} alt="" className={styles.midImg} /><img src="playBtn.png" className={styles.playBtn} onClick={() => play(item)} /></div>
            ))}
          </Carousel>
          <div className={styles.dotsBox}>
            {midBanners.map((dot, idx) => (<div key={idx} className={classnames(styles.dotBtn, { [styles.activeDot]: currentDot === idx })}></div>))}
          </div>
        </div>
        <div className={styles.rightBox}>
          <Carousel dots={false} ref={rightCarousel}>
            {rightBanners.map((item, index) => (
              <div key={index} className={styles.rightBanner}><img src={item.imgUrl} alt="" className={styles.rightImg} /></div>
            ))}
          </Carousel>
          <img className={styles.nextBtn} src="next.png" alt="" onClick={next} />
        </div>
      </div>
      <NavBar navButtons={navButtons} onBtnClicked={btnClicked} />
      <VideoList data={videoList} role={role} />
    </div>
  )
}