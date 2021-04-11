import React, { useCallback } from 'react';
import {connect} from 'dva'
import Swiper from './swiper'
import NavBar from '../components/NavBar'
import styles from './index.css'
import classnames from 'classnames';
const HiddenMobile=props=>{
  const {dispatch,currentCate,images}=props;
  const handleClick=useCallback(item=>{
    dispatch({type:'imageHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  return (
    <div className={styles.container}>
      <Swiper/>
    <NavBar />
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
    </div>
  )
}
export default connect(({imageHidden:{currentCate,images}})=>({currentCate,images}))(HiddenMobile)
