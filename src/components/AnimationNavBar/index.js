import React,{useState,useCallback, useEffect} from 'react'
import {connect} from 'dva'
import { Element } from 'rc-scroll-anim';
import _ from 'lodash'
import router from 'umi/router'
import classnames from 'classnames'
import styles from './index.css'
const NavBar=(props)=>{
  const [isTop,setIsTop]=useState(false)
  const [position,setPosition]=useState(0)
  const [direction,setDirection]=useState('down')
  let {aniNavButtons,aniCurrentNav,dispatch}=props;
  const handleClick=useCallback((item,index)=>{
    dispatch({type:'global/setAniCurrentNav',payload:index})
    if(index==3){
      router.push('/image')
    }else {
      //dispatch({type:'global/setCurrentMenu',payload:1})
      dispatch({type:'animation/reset'})
      dispatch({type:'animation/getAnimation'})
      //router.push('/image')
    }
  },[])
  useEffect(()=>{

  },[])
  let handleScroll=useCallback(_.debounce(({ scrollTop, offsetTop, id})=>{
    let el=document.getElementById(id)
    let top=el&&getComputedStyle(el,null).getPropertyValue('top').replace('px','')
    let t=Math.ceil(top)
    let isTop=(offsetTop-scrollTop)<=t;
    setPosition(scrollTop)
    let direction=scrollTop-position<0 ?'up':'down'
    if(scrollTop!=position){
      setDirection(direction)
    }
    setIsTop(isTop)
  },100),[position])
  return (
    <Element id="aniNavBar" onScroll={handleScroll} className={classnames(styles.container,{[styles.top]:isTop&&direction==='down',[styles.top1]:isTop&&direction==='up'})}>
      {aniNavButtons.map((item,index)=>(
        <div onClick={handleClick.bind(null,item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:aniCurrentNav===index})}>
          {item}
          <div className={styles.underLine} style={aniCurrentNav===index ? {display:"block"}:{display:'none'}}></div>
        </div>
      ))}
    </Element>
  )
}
export default connect(({global:{aniNavButtons,aniCurrentNav}})=>({aniNavButtons,aniCurrentNav}))(NavBar)
