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
                {({isActive,isPrev,isNext})=> 
                (<div className={classnames(styles.imgWrapper,{[styles.activeItem]:isActive,[styles.preItem]:isPrev,[styles.nextItem]:isNext})}><img className={styles.swiperImg} src={item} alt="" /></div>)
}
                </SwiperSlide>
          ))
      }
      <div className="swiper-pagination"></div>     
    </Swiper>
          <span className={styles.swiperTitle}>Interior rendering</span>
          <p className={styles.swiperText}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
    )
}
export default connect(({home})=>({banners:home.banners}))(Sw)