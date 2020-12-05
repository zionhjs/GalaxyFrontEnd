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
const menus = [{ icon: 'home.png', text: 'Home' },
{ icon: 'image.png', text: 'Images' },
{ icon: 'animation.png', text: 'Animations' },
{ icon: 'edit.png', text: 'Blogs' },
{ icon: 'team.png', text: 'Team' }]
const avatar="avatar.jpg"

function BasicLayout(props) {
  const [visible,setVisible]=useState(false)
  const [loginVisible,setLoginVisible]=useState(false)
  const [subVisible,setSubVisible]=useState(false)
  const [dashVisible,setDashVisible]=useState(false)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  console.log('ismobile',isMobile)
  
  function open(){
    setVisible(true)
  }
  function loginClose(){
    setLoginVisible(false)
  }
  function openLogin(){
    setLoginVisible(true)
  }
  function closeSub(){
    setSubVisible(false)
  }
  function openSub(){
    setSubVisible(true)
  }
  function openDashboard(){
    setDashVisible(true)
  }
  function dashClose(){
    setDashVisible(false)
  }
return  isMobile ? (<MobileLayout>{props.children}</MobileLayout>) :(
    <div id="top" className={styles.container}>
      <ThreeLine />
        <Dashboard visible={dashVisible} close={dashClose} avatar={avatar} />
        <Menus openLogin={openLogin} openDashboard={openDashboard} />
        <Login visible={loginVisible} close={loginClose} />
        <Subscribe visible={subVisible} close={closeSub} />
        <Header menus={menus} openSub={openSub}/> 
      <div className={styles.placeholder}></div>      
      {props.children}
      <Footer />
    </div>
  );
}

export default BasicLayout;
