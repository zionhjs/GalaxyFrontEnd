/*
 * @Author: xingzai
 * @Date: 2020-11-29 05:03:56
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-29 05:03:58
 * @FilePath: \GalaxyFrontEnd\src\components\Swiper\index.js
 */
import React,{useState,useCallback} from 'react'
import classnames from 'classnames'
import router from 'umi/router'
import SwiperCore, { Navigation, Pagination,EffectCoverflow,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {ReactComponent as PreIcon} from '@/assets/icons/pre.svg'
import {ReactComponent as NextIcon} from '@/assets/icons/next.svg'
import {connect} from 'dva'
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import 'swiper/components/scrollbar/scrollbar.less';
import styles from './index.css'
SwiperCore.use([Navigation, Pagination,EffectCoverflow,Autoplay]);
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
  const handleClick=useCallback((item)=>{
    if(item.title=='Interior Rendering'){
      dispatch({type:'global/setCurrentMenu',payload: 1})
      dispatch({type:'global/setCurrentNav',payload:0})
      dispatch({type:'image/reset'})
      router.push('/image')
    }else if(item.title=='MasterPlan Rendering'){
      dispatch({type:'global/setCurrentMenu',payload: 1})
      dispatch({type:'global/setCurrentNav',payload:1})
      dispatch({type:'image/reset'})
      router.push('/image')

    }else if(item.title=='Exterior Rendering'){
      dispatch({type:'global/setCurrentMenu',payload: 1})
      dispatch({type:'global/setCurrentNav',payload:1})
      dispatch({type:'image/reset'})
      router.push('/image')
    }else if(item.title=='Animations'){
      dispatch({type:'global/setCurrentMenu',payload: 2})
      router.push('/animation')

    }else if(item.title=='360 Visualizations'){
      dispatch({type:'global/setCurrentMenu',payload: 1})
      dispatch({type:'global/setCurrentNav',payload:2})
      dispatch({type:'image/reset'})
      router.push('/image')
    }

  },[])
    return (
        <div className={styles.container}>            
             <Swiper
             speed={800}
             autoplay={true}
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
                  <img className={styles.swiperImg} src={item.imgUrl} alt="" />
                  <p className={styles.swiperTitle}>{item.title}</p>
                  <p onClick={handleClick.bind(null,item)} className={styles.swiperText}>{item.desc}</p>
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
          <div onClick={openDialog} className={styles.contactBtn}><span className={styles.contactText}>CONTACT US</span></div>
        </div>
    )
}
export default connect(({home})=>({banners:home.banners}))(Sw)
