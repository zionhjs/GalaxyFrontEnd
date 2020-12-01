import React,{useState,useCallback, useEffect} from 'react'
import { Element } from 'rc-scroll-anim';
import _ from 'lodash'
import classnames from 'classnames'
import styles from './index.css'
export default function(props){
  const [idx,setIdx]=useState(0)
  const [isTop,setIsTop]=useState(false)
    let {navButtons,onBtnClicked}=props;
    function handleClick(item,index){
      setIdx(index)
      onBtnClicked(item)
    }
    useEffect(()=>{
     
    },[])
    let handleScroll=useCallback(_.debounce(({ scrollTop, offsetTop, id})=>{
      let el=document.getElementById(id)
      let top=el&&getComputedStyle(el,null).getPropertyValue('top').replace('px','')
      let t=Math.ceil(top)
      let isTop=(offsetTop-scrollTop)<=t;
      console.log('istop',isTop)
      setIsTop(isTop)
    },500),[])
    return (
        <Element id="navBar" onScroll={handleScroll} className={classnames(styles.container,{[styles.top]:isTop})}>
          {navButtons.map((item,index)=>(
              <div onClick={()=>handleClick(item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:idx===index})}>
                  {item}
                  <div className={styles.underLine} style={idx===index ? {display:"block"}:{display:'none'}}></div>
                </div>
          ))}
        </Element>
    )
}