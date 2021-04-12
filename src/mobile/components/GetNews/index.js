/*
 * @Author: xingzai
 * @Date: 2020-12-13 08:24:45
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 08:24:45
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\GetNews\index.js
 */
import React,{useState,useCallback} from 'react'
import {connect} from 'dva'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import styles from './index.css'
const GetNews=(props)=>{
  const {dispatch}=props
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const phoneChange=useCallback((e)=>{
    setPhone(e.target.value)
  },[])
  const emailChange=useCallback(e=>{
    setEmail(e.target.value)
  },[])
  const handleSubmit=useCallback(()=>{
    dispatch({type:'chat/subscribe',payload:{userEmail:email,userNumber:phone}})
  },[email,phone])
    return (
        <OverPack playScale={0.3}>
        <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key="getnews" className={styles.container}>
            <div className={styles.title}>Get News</div>
            <div className={styles.text}>GalaxyCGI is an Architectural Visualization Company which focused on provide affordable photorealistic CG imagery &amp; Animation for marketing campaigns and design presentations</div>
            <input value={phone} onChange={phoneChange} className={styles.nameInput} placeholder="Phone" />
            <input value={email} onChange={emailChange} className={styles.emailInput} placeholder="Email" />
            <div onClick={handleSubmit} className={styles.signBtn}>Sign Me up</div>
        </TweenOne>
        </OverPack>
    )
}
export default connect()(GetNews)
