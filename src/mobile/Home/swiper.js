/*
 * @Author: xingzai
 * @Date: 2020-12-10 03:58:04
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-10 03:58:04
 * @FilePath: \GalaxyFrontEnd\src\mobile\Home\swiper.js
 */
import React,{useCallback} from 'react'
import classnames from 'classnames'
import SwiperCore, {Pagination,Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {connect} from 'dva'
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import 'swiper/components/scrollbar/scrollbar.less';
import styles from './swiper.css'
import router from 'umi/router';
SwiperCore.use([Pagination,Autoplay]);
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
             autoplay
       slidesPerView={1}
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
                {()=>
                (<div className={classnames(styles.imgWrapper)}>
                  <img className={styles.swiperImg} src={item.imgUrl} alt="" />
                  <p className={styles.swiperTitle}>{item.title}</p>
                  <p onClick={handleClick.bind(null,item)} className={styles.swiperText}>{item.desc}</p>
                </div>)
}
                </SwiperSlide>
          ))
      }
      <div className="swiper-pagination"></div>     
    </Swiper>
        </div>
    )
}
export default connect(({home})=>({banners:home.banners}))(Sw)
