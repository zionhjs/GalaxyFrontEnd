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
SwiperCore.use([Navigation, Pagination,EffectCoverflow]);
const Sw=(props)=>{
  const {dispatch,banners}=props
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
  return banners.length===0 ? null : (
    <div className={styles.container}>
      <Swiper
        speed={800}
        spaceBetween={20}
        slidesPerView={2}
        effect="coverflow"
        coverflowEffect={{ rotate: 0,
          slideShadows : false}}
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
                (<div className={classnames(styles.imgWrapper,{[styles.activeItem]:isActive,[styles.preItem]:isPrev,[styles.nextItem]:isNext})}>
                  <img className={styles.swiperImg} src={item} alt="" />
                  {isActive ? <img className={styles.playIcon} src="playBtn.png" alt="" /> : null }
                </div>)
              }
            </SwiperSlide>
          ))
        }
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      <div className={styles.leftMask}></div>
      <div className={styles.rightMask}></div>
    </div>
  )
}
export default connect(({image})=>({banners:image.banners}))(Sw)
