import React, { useState,useRef } from 'react'
import { Carousel } from 'antd'
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
import styles from './index.css'


export default function (props) {
    const [dot, setDot] = useState(0)
     const carousel=useRef()
    const { images } = props
    const len=images.length;
    function pre(){
        if(dot===0){
            setDot(len-1)
        }else{
            setDot(dot-1)
        }
        carousel.current.prev()
    }
    function next(){
        if(dot===len-1){
            setDot(0)
        }else{
            setDot(dot+1)
        }
        carousel.current.next()
    }
    
    return (
        <div className={styles.swiperContainer}>
            <Carousel ref={carousel} dots={false}>
                {images.map((v, i) => (<div className={styles.swiperImgWrapper} key={v+i}><img src={v} className={styles.swiperImg} /></div>))}
            </Carousel>
            <div className={styles.btnGroup}>
              <LeftOutlined onClick={pre}  className={styles.swiperBtn} />
              <RightOutlined onClick={next} className={styles.swiperBtn} />  
            </div>
            <div className={styles.dotsBox}>
                {images.map((item,index)=>(
                    <div key={index} className={styles.dot} style={dot===index ? {border:'1px solid #fff'}:{border:'none'}}></div>
                ))}
            </div>
        </div>
    )
}
