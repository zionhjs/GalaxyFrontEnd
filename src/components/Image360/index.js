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
        console.log('effect')
        let canvasUrl;
        let imgs=new Image()
        imgs.crossOrigin="Anonymous"
        imgs.src=currentItem.imgUrl
        imgs.onload=function(){
            console.log('onload')
            let canvas=document.createElement('canvas')
            canvas.width=imgs.width
            canvas.height=imgs.height
            let ctx=canvas.getContext('2d')
            ctx.drawImage(imgs,0,0,imgs.width,imgs.height)
            canvasUrl=canvas.toDataURL("image/png")
            console.log('canvasurl',canvasUrl)
        }       
          if(viewer){
              viewer.setPanorama(canvasUrl)
          }else{
              console.log(viewer)
         let temp = new Viewer({
                container: document.querySelector('#viewer'),
                panorama:canvasUrl
              });
              setViewer(temp) 
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
           <div id="viewer" className={styles.picBox}></div>
    <div className={styles.desc}>{currentItem.desc}</div>
        </div>
    )
}
export default connect(({image})=>({visible:image.img360Visible,currentItem:image.currentItem}))(Image360)