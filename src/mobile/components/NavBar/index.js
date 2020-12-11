import React,{useState,useCallback, useEffect} from 'react'
import {connect} from 'dva'
import { Element } from 'rc-scroll-anim';
import _ from 'lodash'
import classnames from 'classnames'
import styles from './index.css'
const NavBar=(props)=>{
  const [idx,setIdx]=useState(0)
  const [isTop,setIsTop]=useState(false)
  const [position,setPosition]=useState(0)
  const [direction,setDirection]=useState('down')
    let {navButtons}=props;
    function handleClick(item,index){
      setIdx(index)
    }
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
              <div onClick={()=>handleClick(item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:idx===index})}>
                  {item}
                  <div className={styles.underLine} style={idx===index ? {display:"block"}:{display:'none'}}></div>
                </div>
          ))}
        </Element>
    )
}
export default connect(({global:{navButtons}})=>({navButtons}))(NavBar)