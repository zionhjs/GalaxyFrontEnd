import React, { useState } from 'react'
import { Link } from 'rc-scroll-anim';
import classnames from 'classnames'
import {connect} from 'dva'
import styles from './index.css'

const Footer=(props)=>{
  const {dispatch,contactVisible}=props
  function closeDialog() {
    dispatch({type:'global/closeContact'})
  }
  function openDialog() {
    dispatch({type:'global/openContact'})
  }
  return (
    <div className={styles.footer}>
      <div className={styles.footerTitleBox}>
        <img src="user.png" alt="" className={styles.userIcon} />
        <span className={styles.footerTitle}>CONTACT</span>
      </div>
      <div className={styles.footerIconBox}>
        <img src="email.png" className={styles.footerIcon} alt="" />
        <img src="tel.png" alt="" className={styles.footerIcon} />
        <img src="camera.png" alt="" className={styles.footerIcon} />
        <img src="bird.png" alt="" className={styles.footerIcon} />
        <img src="facebook.png" alt="" className={styles.footerIcon} />
        <img src="linkin.png" alt="" className={styles.footerIcon} />
      </div>
      <div id="email" className={classnames(styles.footerText,styles.emailText)}>galaxycgi@gmail.com</div>
      <div className={styles.footerText}> +1 6262656782</div>
      <div className={styles.footerText}>  9415 Culver Blvd #19, Culver City, CA 90232</div>
      <div className={styles.footerText}> Copyright © GalaxyCGI www.galaxycgi.com all rights reserved.</div>
      <div className={styles.footerText}> The website design, the logo, the covers and gallery images are property of GalaxyCGI for its total or partial reproduction, as well as exploitation, distribution</div>
      <div className={styles.footerText}> and marketing.</div>
      <div className={styles.dialog} style={contactVisible ? { display: 'flex' } : { display: 'none' }}>
        <div className={styles.closeBox} onClick={closeDialog}><img src="close.png" alt="" style={{ width: '14px', height: 'auto', opacity: 1 }} /></div>
        <div className={styles.dialogTitle}>conversation</div>
        <div className={styles.dialogLabel}>Please fill in the following</div>
        <div className={styles.dialogLabel}>information first</div>
        <input className={styles.nameInput} placeholder="Name" />
        <input className={styles.emailInput} placeholder="Email" />
        <div className={styles.submitButton}>SUBMIT</div>
      </div>
      <Link className={styles.anchor} to="top"><img src="up.png" className={styles.upIcon} alt="" /></Link>
      <img onClick={openDialog} src="contact.png" className={styles.btn} alt="" />
    </div>
  )
}
export default connect(({global})=>({contactVisible:global.contactVisible}))(Footer)