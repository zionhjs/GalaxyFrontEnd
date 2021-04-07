/*
 * @Author: xingzai
 * @Date: 2020-11-15 16:02:39
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-15 16:02:40
 * @FilePath: \test\src\components\Subscribe\index.js
 */
import React,{useCallback,useState} from 'react'
import {SmileFilled,CloseOutlined} from '@ant-design/icons'
import Animate from 'rc-animate';
import {connect} from 'dva'
import styles from './index.css'

const Subscribe=(props)=>{
    const {visible,close,chatToken,dispatch}=props
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const handleChange=useCallback(e=>{
    setEmail(e.target.value)
  },[])
  const handleSubmit=useCallback(()=>{
    dispatch({type:'chat/subscribe',payload:{userEmail:email}})
    dispatch({type:'chat/fetchMsg'})
  },[email])
    return (
        <Animate transitionName={'slideBottom'}>
          {/*visible&&!chatToken*/}
          {visible&&!chatToken ?<div className={styles.container}>
            <CloseOutlined onClick={close}  alt="" className={styles.closeIcon} />
            <SmileFilled className={styles.smileIcon} />
            <div className={styles.subText}>Subscribe to our newsletter and get Quote!</div>
            <input value={email} onChange={handleChange} className={styles.subInput} placeholder="Enter your email" />
            <div onClick={handleSubmit} className={styles.sendBtn}><img src="plane.png" alt="" className={styles.sendIcon} /></div>
        </div> :null}
        </Animate>
    )
}
export default connect(({global:{chatToken}})=>({chatToken}))(Subscribe)
