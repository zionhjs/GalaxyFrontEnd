import React,{useState,useCallback,useEffect} from 'react'
import { Element } from 'rc-scroll-anim';
import { useMediaQuery } from 'react-responsive'
import styles from './index.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menus from '../components/Menus'
import Login from '../components/Login'
import Subscribe from '../components/Subscribe'
import Dashboard from '../components/Dashboard'
import MobileLayout from '../mobile/Layout'
import ThreeLine from '../components/ThreeLine';
import Animate from 'rc-animate';
import Chat from '../components/Chat'
import NotifyCation from '@/components/Notification'
import {connect} from 'dva'

const avatar="avatar.png"

function BasicLayout(props) {
  const {chatVisible}=props
  const [subVisible,setSubVisible]=useState(false)
  //const isMobile = useMediaQuery({ maxWidth: 767 })
  const isMobile=window.screen.width<768
  function closeSub(){
    setSubVisible(false)
  }
  function openSub(){
    setSubVisible(true)
  }
return  isMobile ? (<MobileLayout>{props.children}</MobileLayout>) :(
    <Element id="top" className={styles.container}>
      <NotifyCation/>
      <ThreeLine />
        <Dashboard avatar={avatar} />
        <Menus />
        <Login />
        <Subscribe visible={subVisible} close={closeSub} />
        <Header openSub={openSub}/> 
      <div className={styles.placeholder}></div>      
      {props.children}
      <Footer />
      <Animate transitionName={'slide'}>{chatVisible ? <Chat /> :null}</Animate>
    </Element>
  );
}

export default connect(({chat:{visible}})=>({chatVisible:visible}))(BasicLayout);
