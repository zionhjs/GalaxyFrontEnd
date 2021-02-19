import React,{useState} from 'react'
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
import Chat from '../components/Chat'

const avatar="avatar.png"

function BasicLayout(props) {
  const [subVisible,setSubVisible]=useState(false)
  //const isMobile = useMediaQuery({ maxWidth: 767 })
  const isMobile=window.screen.width<768
  console.log('ismobile',isMobile)
  function closeSub(){
    setSubVisible(false)
  }
  function openSub(){
    setSubVisible(true)
  }
  
return  isMobile ? (<MobileLayout>{props.children}</MobileLayout>) :(
    <div id="top" className={styles.container}>
      <ThreeLine />
        <Dashboard avatar={avatar} />
        <Menus />
        <Login />
        <Subscribe visible={subVisible} close={closeSub} />
        <Header openSub={openSub}/> 
      <div className={styles.placeholder}></div>      
      {props.children}
      <Footer />
      <Chat />
    </div>
  );
}

export default BasicLayout;
