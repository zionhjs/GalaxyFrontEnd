/*
 * @Author: xingzai
 * @Date: 2020-12-11 06:55:26
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 06:55:27
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\ImageMobile\index.js
 */
import React, { useCallback, useEffect } from 'react';
import { connect } from 'dva'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import Swiper from './swiper'
import NavBar from '../NavBar'
import LoadMore from '../LoadMore'
import BigImage360 from '../Image360Mobile'
import styles from './index.css'
const ImageMobile = ({ images,dispatch }) => {
  const openBigImg=useCallback((item)=>{
    dispatch({type:'image/setCurrent',payload:item})
    dispatch({type:'image/openImg360'})
  },[])
    return (
        <div className={styles.container}>
            <Swiper />
            <NavBar />
            <div className={styles.list}>
                {images.map((item, index) => (
                    <OverPack key={index+item.imgUrl} playScale={0.3}>
                    <TweenOne className={styles.listItem} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'tw'}>
                        <img onClick={openBigImg.bind(null,item)} className={styles.listImg} src={item.imgUrl} alt="" />
                        <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
                    </TweenOne>
                    </OverPack>
                ))}
            </div>
            <LoadMore />
            <BigImage360/>
        </div>
    )
}
export default connect(({ image: { images } }) => ({ images }))(ImageMobile)
