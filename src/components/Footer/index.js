import React, { useState,useCallback } from 'react'
import { Link } from 'rc-scroll-anim';
import classnames from 'classnames'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import {CloseCircleFilled} from '@ant-design/icons'
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import styles from './index.css'

const Footer=(props)=>{
  const {dispatch,contactVisible,chatToken,chatVisible}=props
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const closeDialog=useCallback(()=>{
    if(chatToken){
      dispatch({type:'chat/closeChat'})
    }else {
      dispatch({type:'global/closeContact'})
    }
  },[])
  const openDialog=useCallback(()=>{
    if(chatToken){
      dispatch({type:'chat/toggleChat'})
    }else {
      dispatch({type:'global/toggleContact'})
    }
      
  },[chatToken])
  const handleSubmit=useCallback(()=>{
    dispatch({type:'chat/subscribe',payload:{userEmail:email,userNumber:name}})
    dispatch({type:'chat/openChat'})
    dispatch({type:'global/closeContact'})
  },[email,name])
  const nameChange=useCallback(e=>{
    setName(e.target.value)
  },[])
  const emailChange=useCallback(e=>{
    setEmail(e.target.value)
  },[])
  return (
    <div className={styles.footer}>
      <OverPack playScale={0.3}>
      <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500} className={styles.footerTitleBox}>
        <img key="userAni" src="user.png" alt="" className={styles.userIcon} />
        <span key="userTextAni" className={styles.footerTitle}>CONTACT</span>
        </QueueAnim>
      </OverPack>
      <OverPack playScale={0.3}>
      <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500}  className={styles.footerIconBox}>
        <img key="email" src="email.png" className={styles.footerIcon} alt="" />
        <img key="tel" src="tel.png" alt="" className={styles.footerIcon} />
        <img key="camera" src="camera.png" alt="" className={styles.footerIcon} />
        <img key="bird" src="bird.png" alt="" className={styles.footerIcon} />
        <img key="facebook" src="facebook.png" alt="" className={styles.footerIcon} />
        <img key="linkin" src="linkin.png" alt="" className={styles.footerIcon} />
      </QueueAnim>
      </OverPack>
      
      <div id="email" className={classnames(styles.footerText,styles.emailText)}>galaxycgi@gmail.com</div>
      <div className={styles.footerText}> +1 6262656782</div>
      <div className={styles.footerText}>  9415 Culver Blvd #19, Culver City, CA 90232</div>
      <div className={styles.footerText}> Copyright © GalaxyCGI www.galaxycgi.com all rights reserved.</div>
      <div className={styles.footerText}> The website design, the logo, the covers and gallery images are property of GalaxyCGI for its total or partial reproduction, as well as exploitation, distribution</div>
      <div className={styles.footerText}> and marketing.</div>
       {contactVisible ? <TweenOne animation={{ scale:0,x:'+=200',opacity: 0,type: 'from', ease:'easeInQuart',duration:100}} className={styles.dialog}>
        <div className={styles.closeBox} onClick={closeDialog}><img src="close.png" alt="" style={{ width: '14px', height: 'auto', opacity: 1 }} /></div>
        <div className={styles.dialogTitle}>conversation</div>
        <div className={styles.dialogLabel}>Please fill in the following</div>
        <div className={styles.dialogLabel}>information first</div>
        <input value={name} onChange={nameChange} className={styles.nameInput} placeholder="Name" />
        <input value={email} onChange={emailChange} className={styles.emailInput} placeholder="Email" />
        <div onClick={handleSubmit} className={styles.submitButton}>SUBMIT</div>
      </TweenOne> : null}
      <Link className={styles.anchor} to="top"><img src="up.png" className={styles.upIcon} alt="" /></Link>
      {(chatToken&&chatVisible)||(!chatToken&&contactVisible) ? <CloseCircleFilled className={styles.closeBtn}  onClick={closeDialog} /> : <img alt="" src="contact.png" className={styles.btn}  onClick={openDialog} />}
    </div>
  )
}
export default connect(({global,chat})=>({contactVisible:global.contactVisible,chatToken:global.chatToken,chatVisible:chat.chatVisible}))(Footer)