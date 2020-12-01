/*
 * @Author: xingzai
 * @Date: 2020-11-29 05:03:56
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-29 05:03:58
 * @FilePath: \GalaxyFrontEnd\src\components\Swiper\index.js
 */
import React,{useState,useCallback,useMemo} from 'react'
import classnames from 'classnames'
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import styles from './index.css'
const banners=['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg']
export default function(props){
    const [currentDot,setDot]=useState(0)
    const [aniL,setAniL]=useState({})
    const [aniR,setAniR]=useState({})
    const [aniM,setAniM]=useState({})    
    const pre=useCallback(()=>{
        setAniL({type:'from',x:'+=200'})
        setAniM({type:'from',x:'+=200',delay:50})
        setAniR({type:'from',x:'+=200',delay:100})
        let len=banners.length
        if(currentDot-1>=0){
            setDot(currentDot-1)
        }else{
            setDot(len-1)
        }
    },[banners,currentDot])
    const next=useCallback(()=>{
        let len=banners.length
        setAniL({type:'from',x:'-=200',delay:100})
        setAniM({type:'from',x:'-=200',delay:50})
        setAniR({type:'from',x:'-=200'})
    if(currentDot+1<len){
        console.log('add',currentDot)
        setDot(currentDot+1)
    }else{
        console.log('aaa')
        setDot(0)
    }
    console.log(currentDot)
    },[banners,currentDot])
    return (
        <div className={styles.container}>
            
            {
                banners.map((item,index,arr)=>((currentDot+1)<arr.length ? (currentDot+1) :0)===index ? (
                    <TweenOne resetStyle animation={aniL} key={'left'+index} className={styles.leftBox}>
                    <img className={styles.leftImg} src={item} alt="" />
                   </TweenOne>
                ) :null)
            }
    
            
            {
              banners.map((item,index)=>currentDot===index ? (
                <TweenOne resetStyle animation={aniM} key={'mid'+index} className={styles.midBox}>
                <img className={styles.midImg} src={item} alt="" />
                 </TweenOne> 
              ) : null )
            }
            {
                banners.map((item,index,arr)=>(currentDot-1>=0 ? (currentDot-1) :(currentDot-1+arr.length))===index ? (
                    <TweenOne  resetStyle animation={aniR} key={'right'+index} className={styles.rightBox}>
                    <img className={styles.rightImg} src={item} alt="" />
                </TweenOne>
                ): null)
            }
            
            <div className={styles.dotsBox}>
            {banners.map((dot, idx) => (<div key={idx} className={classnames(styles.dotBtn, { [styles.activeDot]: currentDot === idx })}></div>))}
          </div>
          <img className={styles.preBtn} src="pre.png" alt="" onClick={pre} />
          <img className={styles.nextBtn} src="next.png" alt="" onClick={next} />
          <div className={styles.leftMask}></div>
          <div className={styles.rightMask}></div>
          <span className={styles.swiperTitle}>Interior rendering</span>
          <p className={styles.swiperText}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <div className={styles.contactBtn}><span className={styles.contactText}>CONTACT US</span></div>
        </div>
    )
}