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
const HiddenBigImage=(props)=>{
  const {visible,currentItem,dispatch}=props;
  const [viewer,setViewer]=useState(null)
  useEffect(()=>{
    if(viewer){
      if(currentItem.imgUrl&&currentItem.statusName=='360'){
        viewer.setPanorama(currentItem.imgUrl)
      }
    }else{
      if(currentItem.imgUrl&&currentItem.statusName=='360'){
        let temp = new Viewer({
          container: document.querySelector('#viewer'),
          panorama:currentItem.imgUrl
        });
        setViewer(temp)
      }
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
    dispatch({type:'imageHidden/closeBigImage'})
  },[])
  const pre=useCallback(()=>{
    dispatch({type:'imageHidden/pre'})
  },[])
  const next=useCallback(()=>{
    dispatch({type:'imageHidden/next'})
  },[])
  return (
    <div className={classnames(styles.container,{[styles.visible]:visible})}>
      <img onClick={close} src="/close.png" className={styles.closeIcon} alt="" />
      <img onClick={pre} className={styles.pre} src="/pre.png" alt="" />
      <img onClick={next} className={styles.next} src="/next.png" alt="" />
      <div id="viewer" className={classnames(styles.picBox,{[styles.hidden]:currentItem.statusName!='360'})}></div>
      <div className={classnames(styles.picBox,{[styles.hidden]:currentItem.statusName=='360'})}><img src={currentItem.imgUrl} alt="" className={styles.pic} /></div>
      <div className={styles.desc}>{currentItem.desc}</div>
    </div>
  )
}
export default connect(({imageHidden})=>({visible:imageHidden.bigImageVisible,currentItem:imageHidden.currentItem}))(HiddenBigImage)
