/*
 * @Author: xingzai
 * @Date: 2020-12-12 08:50:19
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-12 08:50:20
 * @FilePath: \GalaxyFrontEnd\src\mobile\Animation\swiper.js
 */
import React,{useCallback} from 'react'
import classnames from 'classnames'
import SwiperCore, {  Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {connect} from 'dva'
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import 'swiper/components/scrollbar/scrollbar.less';
import styles from './swiper.css'
SwiperCore.use([Autoplay, Pagination]);
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
    
    return banners.length===0 ? null : (
        <div className={styles.container}>            
             <Swiper
             autoplay
             speed={800}
      slidesPerView={1}
      centeredSlides
      centeredSlidesBounds
      loop
      pagination={{clickable:true,el:'.swiper-pagination',type:'custom', renderCustom}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {
          banners.map((item,index)=>(
            <SwiperSlide key={index}>
                {({isActive,isPrev,isNext})=> 
                (<div className={classnames(styles.imgWrapper)}>
                    <img className={styles.swiperImg} src={item} alt="" />
                    {isActive ? <img className={styles.playIcon} src="playBtn.png" alt="" /> : null }
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
export default connect(({animation})=>({banners:animation.banners}))(Sw)