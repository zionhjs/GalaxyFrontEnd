/*
 * @Author: xingzai
 * @Date: 2020-11-29 05:03:56
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-29 05:03:58
 * @FilePath: \GalaxyFrontEnd\src\components\Swiper\index.js
 */
import React,{useState,useCallback} from 'react'
import classnames from 'classnames'
import SwiperCore, { Navigation, Pagination,EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {connect} from 'dva'
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import 'swiper/components/scrollbar/scrollbar.less';
import styles from './index.css'
const banners=['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg']
SwiperCore.use([Navigation, Pagination,EffectCoverflow]);
const Sw=(props)=>{
    const {dispatch}=props
    const renderCustom=useCallback((swiper,current,total)=>{
        var paginationHtml = " ";
        for (var i = 0; i < total; i++) {
            // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
            if (i === (current - 1)) {
                paginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
            }else{
                paginationHtml += '<span class="swiper-pagination-customs"></span>';
            }						  
        }
        return paginationHtml;
    },[])
    const openDialog=useCallback(()=>{
        dispatch({type:'global/openContact'})
    },[])
    return (
        <div className={styles.container}>            
             <Swiper
      slidesPerView={2}
      effect="coverflow"
      coverflowEffect={{rotate:0,depth:0}}
      centeredSlides
      centeredSlidesBounds
      navigation={{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}}
      loop
      pagination={{ clickable: true,el:'.swiper-pagination',type:'custom', renderCustom}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {
          banners.map((item,index)=>(
            <SwiperSlide key={index}>
                {({isActive,isPrev,isNext})=> 
                (<div className={classnames(styles.imgWrapper,{[styles.activeItem]:isActive,[styles.preItem]:isPrev,[styles.nextItem]:isNext})}><img className={styles.swiperImg} src={item} alt="" /></div>)
}
                </SwiperSlide>
          ))
      }
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
	    <div class="swiper-button-next"></div>      
    </Swiper>
          <div className={styles.leftMask}></div>
          <div className={styles.rightMask}></div>
          <span className={styles.swiperTitle}>Interior rendering</span>
          <p className={styles.swiperText}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <div onClick={openDialog} className={styles.contactBtn}><span className={styles.contactText}>CONTACT US</span></div>
        </div>
    )
}
export default connect()(Sw)