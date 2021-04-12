import React, { useCallback } from 'react';
import {connect} from 'dva'
import NavBar from '@/mobile/components/ImageHiddenNavBar'
import LoadMore from '@/mobile/components/LoadMore';
import styles from './index.css'
import classnames from 'classnames';
import router from 'umi/router';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import * as moment from 'moment';
const AnimationHidden=props=>{
  const {dispatch,currentCate,videoList,starNavButtons,galaxyNavButtons,universeNavButtons,starCurrentNav,galaxyCurrentNav,universeCurrentNav}=props
  const handleClick=useCallback(item=>{
    dispatch({type:'animationHidden/setCate',payload:item})
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
    dispatch({type:'animationHidden/setStarCurrentNav',payload: index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }
  },[])
  //todo
  const galaxyHandleClick=useCallback((item,index)=>{
    dispatch({type:'animationHidden/setGalaxyCurrentNav',payload:index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }
  },[])
  const universeHandleClick=useCallback((item,index)=>{
    dispatch({type:'animationHidden/setUniverseCurrentNav',payload:index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }
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
      <div className={styles.starContainer}>
        {
          videoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img src="/playBtn.png" className={styles.playIcon} alt="" />
                </div>
                <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span></div>
                <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
              </TweenOne>
            </OverPack>
          ))
        }
      </div>
      <LoadMore loadMore={starLoadMore}  />
      <div id={'galaxy'} className={styles.titleBox} style={{marginTop:'0.41rem'}}>Galaxy - Excellent Quality</div>
      <NavBar navButtons={galaxyNavButtons} currentNav={galaxyCurrentNav} handleClick={galaxyHandleClick}/>
      <div className={styles.galaxyContainer}>
        {
          videoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img src="/playBtn.png" className={styles.playIcon} alt="" />
                </div>
                <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span></div>
                <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
              </TweenOne>
            </OverPack>
          ))
        }
      </div>
      <LoadMore loadMore={galaxyLoadMore}  />
      <div id={'universe'} className={styles.titleBox} style={{marginTop:'0.41rem'}}>Universe - Superior Quality</div>
      <NavBar navButtons={universeNavButtons} currentNav={universeCurrentNav} handleClick={universeHandleClick}/>
      <div className={styles.universeContainer}>
        {
          videoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img src="/playBtn.png" className={styles.playIcon} alt="" />
                </div>
                <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span></div>
                <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
              </TweenOne>
            </OverPack>
          ))
        }
      </div>
      <LoadMore loadMore={universeLoadMore}  />
    </div>
  )
}
export default connect(({animationHidden:{currentCate,videoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,videoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(AnimationHidden)
