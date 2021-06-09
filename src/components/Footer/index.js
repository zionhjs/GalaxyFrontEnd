import React, { useState,useCallback } from 'react'
import { Link } from 'rc-scroll-anim';
import classnames from 'classnames'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import Icon from '@ant-design/icons';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {ReactComponent  as CloseSvg} from '../../assets/icons/close.svg'
import styles from './index.css'
const CloseIcon = props => <Icon component={CloseSvg} {...props} />;
const Footer=(props)=>{
  const {dispatch,contactVisible,chatToken,chatVisible,isTop}=props
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const closeDialog=useCallback(()=>{
    if(chatToken){
      dispatch({type:'chat/closeChat'})
    }else {
      dispatch({type:'global/closeContact'})
    }
  },[chatToken])
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
    dispatch({type:'chat/fetchMsg'})
  },[email,name])
  const nameChange=useCallback(e=>{
    setName(e.target.value)
  },[])
  const emailChange=useCallback(e=>{
    setEmail(e.target.value)
  },[])
  const gotoTop=useCallback(()=>{
    let el=document.getElementById('top')
    el.scrollIntoView({behavior:'smooth'})
    dispatch({type:'global/toggleIsTop'})
  },[])
  const gotoFooter=useCallback(()=>{
    let el=document.getElementById('footer')
    el.scrollIntoView({behavior:'smooth'});
    dispatch({type:'global/toggleIsTop'})
  },[])
  return (
    <div id={'footer'} className={styles.footer}>
      <OverPack playScale={0.3}>
      <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500} className={styles.footerTitleBox}>
        <img key="userAni" src="/user.png" alt="" className={styles.userIcon} />
        <span key="userTextAni" className={styles.footerTitle}>CONTACT</span>
        </QueueAnim>
      </OverPack>
      <OverPack playScale={0.3}>
      <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500}  className={styles.footerIconBox}>
        <img key="email" src="/email.png" className={styles.footerIcon} alt="" />
        <img key="tel" src="/tel.png" alt="" className={styles.footerIcon} />
        <img key="camera" src="/camera.png" alt="" className={styles.footerIcon} />
        <img key="bird" src="/bird.png" alt="" className={styles.footerIcon} />
        <img key="facebook" src="/facebook.png" alt="" className={styles.footerIcon} />
        <img key="linkin" src="/linkin.png" alt="" className={styles.footerIcon} />
      </QueueAnim>
      </OverPack>
      
      <div id="email" className={classnames(styles.footerText,styles.emailText)}>zion@galaxycgi.com</div>
      <div className={styles.footerText}>6262655257</div>
      <div className={styles.footerText}>  9415 Culver Blvd #19, Culver City, CA 90232</div>
      <div className={styles.footerText}> Copyright © GalaxyCGI www.galaxycgi.com all rights reserved.</div>
      <div className={styles.footerText}> The website design, the logo, the covers and gallery images are property of GalaxyCGI for its total or partial reproduction, as well as exploitation, distribution</div>
      <div className={styles.footerText}> and marketing.</div>
       <Animate key={'dialogContainerAni'} transitionName={'dialog'}>
         {contactVisible ? <div key={"dialogAni"} className={styles.dialog}>
         <div className={styles.dialogTitle}>conversation</div>
        <div className={styles.dialogLabel}>Please fill in the following</div>
        <div className={styles.dialogLabel}>information first</div>
        <input value={name} onChange={nameChange} className={styles.nameInput} placeholder="Phone" />
        <input value={email} onChange={emailChange} className={styles.emailInput} placeholder="Email" />
           <div onClick={handleSubmit} className={styles.submitButton}>SUBMIT</div></div> : null}
      </Animate>
      <Animate className={styles.anchorContainer} transitionLeave={false} transitionName={'td'}>{isTop?(<span className={styles.anchor} onClick={gotoFooter} key={'bottomAni'} to="footer"><img src="/up.png" className={styles.downIcon} alt="" /></span>):<span className={styles.anchor} onClick={gotoTop} key={'topAni'} to="top"><img src="/up.png" className={styles.upIcon} alt="" /></span>}</Animate>
      <Animate className={styles.toggleBtn}  transitionLeave={false} transitionName={'toggle'}>{(chatToken&&chatVisible)||(!chatToken&&contactVisible) ? <span key={'closeAni'} className={styles.closeBtn}  onClick={closeDialog}><CloseIcon /></span> : <img key={'contactAni'} alt="" src="/contact.png" className={styles.btn}  onClick={openDialog} />}</Animate>
    </div>
  )
}
export default connect(({global,chat})=>({isTop:global.isTop,contactVisible:global.contactVisible,chatToken:global.chatToken,chatVisible:chat.visible}))(Footer)
