/*
 * @Author: xingzai
 * @Date: 2020-11-22 00:04:48
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-22 00:04:49
 * @FilePath: \test\src\components\BigImage\index.js
 */
import React,{useCallback, useEffect,useState} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import { Viewer } from 'photo-sphere-viewer';
import styles from './index.css'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
const Image360=(props)=>{
  const {visible,currentItem,dispatch}=props;
  const [viewer,setViewer]=useState(null)
  useEffect(()=>{
    if(viewer){
      viewer.setPanorama(currentItem.imgUrl)
    }else{
      console.log(viewer)
      let temp = new Viewer({
        container: document.querySelector('#viewer'),
        panorama:currentItem.imgUrl
      });
      setViewer(temp)
    }
    if(document.createEvent) {
      let event = document.createEvent("HTMLEvents");
      event.initEvent("resize", true, true);
      window.dispatchEvent(event);
    } else if(document.createEventObject) {
      window.fireEvent("onresize");
    }
  },[currentItem.imgUrl])


  const close=useCallback(()=>{
    dispatch({type:'image/closeImg360'})
  },[])
  const pre=useCallback(()=>{
    dispatch({type:'image/pre'})
  },[])
  const next=useCallback(()=>{
    dispatch({type:'image/next'})
  },[])
  return (
    <div className={classnames(styles.container,{[styles.visible]:visible})}>
      <img onClick={close} src="close.png" className={styles.closeIcon} alt="" />
      <img onClick={pre} className={styles.pre} src="pre.png" alt="" />
      <img onClick={next} className={styles.next} src="next.png" alt="" />
      <div id="viewer" className={classnames(styles.picBox,{[styles.hidden]:currentItem.statusName!='360'})}></div>
      <div className={classnames(styles.picBox,{[styles.hidden]:currentItem.statusName=='360'})}><img src={currentItem.imgUrl} alt="" className={styles.pic} /></div>
      <div className={styles.desc}>{currentItem.desc}</div>
    </div>
  )
}
export default connect(({image})=>({visible:image.img360Visible,currentItem:image.currentItem}))(Image360)
