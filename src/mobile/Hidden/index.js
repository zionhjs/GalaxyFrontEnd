import React, { useCallback } from 'react';
import {connect} from 'dva'
import NavBar from '../components/ImageHiddenNavBar'
import styles from './index.css'
import classnames from 'classnames';
import { OverPack } from 'rc-scroll-anim/es';
import TweenOne from 'rc-tween-one';
import LoadMore from '@/mobile/components/LoadMore';
import BigImage360 from '@/mobile/components/Image360Mobile';
import router from 'umi/router';
const HiddenMobile=props=>{
  const {dispatch,currentCate,images,starNavButtons,starCurrentNav,galaxyNavButtons,
    galaxyCurrentNav,universeNavButtons,universeCurrentNav
  }=props;
  const handleClick=useCallback(item=>{
    dispatch({type:'imageHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  //todo
  const starLoadMore=useCallback(()=>{

  },[])
  //todo
  const galaxyLoadMore=useCallback(()=>{

  },[])
  //todo
  const universeLoadMore=useCallback(()=>{

  },[])
  //todo
  const starHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setStarCurrentNav',payload: index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  //todo
  const galaxyHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setGalaxyCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  const universeHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setUniverseCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  const openBigImg=useCallback((item)=>{
    dispatch({type:'image/setCurrent',payload:item})
    dispatch({type:'image/openImg360'})
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
      <NavBar navButtons={starNavButtons} currentNav={starCurrentNav} handleClick={starHandleClick}/>
      <div className={styles.list}>
        {images.map((item, index) => (
          <OverPack key={index+item.imgUrl} playScale={0.3}>
            <TweenOne className={styles.listItem} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'tw'}>
              <img onClick={openBigImg.bind(null,item)} className={styles.listImg} src={item.imgUrl} alt="" />
              <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
              <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
            </TweenOne>
          </OverPack>
        ))}
      </div>
      <LoadMore loadMore={starLoadMore}  />
      <div id={'galaxy'} className={styles.titleBox} style={{marginTop:'0.41rem'}}>Galaxy - Excellent Quality</div>
      <NavBar navButtons={galaxyNavButtons} currentNav={galaxyCurrentNav} handleClick={galaxyHandleClick}/>
      <div className={styles.list}>
        {images.map((item, index) => (
          <OverPack key={index+item.imgUrl} playScale={0.3}>
            <TweenOne className={styles.listItem} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'tw'}>
              <img onClick={openBigImg.bind(null,item)} className={styles.listImg} src={item.imgUrl} alt="" />
              <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
              <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
            </TweenOne>
          </OverPack>
        ))}
      </div>
      <LoadMore loadMore={galaxyLoadMore}  />
      <div id={'universe'} className={styles.titleBox} style={{marginTop:'0.41rem'}}>Universe - Superior Quality</div>
      <NavBar navButtons={universeNavButtons} currentNav={universeCurrentNav} handleClick={universeHandleClick}/>
      <div className={styles.list}>
        {images.map((item, index) => (
          <OverPack key={index+item.imgUrl} playScale={0.3}>
            <TweenOne className={styles.listItem} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'tw'}>
              <img onClick={openBigImg.bind(null,item)} className={styles.listImg} src={item.imgUrl} alt="" />
              <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
              <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
            </TweenOne>
          </OverPack>
        ))}
      </div>
      <LoadMore loadMore={universeLoadMore}  />
      <BigImage360/>
    </div>
  )
}
export default connect(({imageHidden:{currentCate,images,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,images,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(HiddenMobile)
