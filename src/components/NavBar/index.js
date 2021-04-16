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
    let {navButtons,currentNav,dispatch}=props;    
    const handleClick=useCallback((item,index)=>{
     dispatch({type:'global/setCurrentNav',payload:index})
     if(index==4){
       dispatch({type:'global/setCurrentMenu',payload:2})
      router.push('/animation')
     }else {
      //dispatch({type:'global/setCurrentMenu',payload:1})
      dispatch({type:'image/reset'})
      dispatch({type:'image/getImage'})
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
      console.log('scrollTop',scrollTop)
      setPosition(scrollTop)
      let direction=scrollTop-position<0 ?'up':'down'
      if(scrollTop!=position){
        setDirection(direction)
      }      
      console.log(direction)
      setIsTop(isTop)
    },100),[position])
    return (
        <Element id="navBar" onScroll={handleScroll} className={classnames(styles.container,{[styles.top]:isTop&&direction==='down',[styles.top1]:isTop&&direction==='up'})}>
          {navButtons.map((item,index)=>(
              <div onClick={handleClick.bind(null,item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:currentNav===index})}>
                  {item}
                  <div className={styles.underLine} style={currentNav===index ? {display:"block"}:{display:'none'}}></div>
                </div>
          ))}
        </Element>
    )
}
export default connect(({global:{navButtons,currentNav}})=>({navButtons,currentNav}))(NavBar)
