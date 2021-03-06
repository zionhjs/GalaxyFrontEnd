import React, { useCallback } from 'react';
import {connect} from 'dva'
import NavBar from '@/mobile/components/ImageHiddenNavBar'
import LoadMore from '@/mobile/components/LoadMore';
import styles from './index.css'
import classnames from 'classnames';
import router from 'umi/router';
import { OverPack } from 'rc-scroll-anim';
import Video from '@/mobile/components/HiddenVideo'
import TweenOne from 'rc-tween-one';
import * as moment from 'moment';
const AnimationHidden=props=>{
  const {dispatch,currentCate,starVideoList,galaxyVideoList,universeVideoList,starNavButtons,galaxyNavButtons,universeNavButtons,starCurrentNav,galaxyCurrentNav,universeCurrentNav}=props
  const handleClick=useCallback(item=>{
    dispatch({type:'animationHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  const starLoadMore=useCallback(()=>{
 dispatch({type:'animationHidden/getStarAnimation'})
  },[])
  const galaxyLoadMore=useCallback(()=>{
 dispatch({type:'animationHidden/getGalaxyAnimation'})
  },[])
  const universeLoadMore=useCallback(()=>{
dispatch({type:'animationHidden/getUniverseAnimation'})
  },[])
  const starHandleClick=useCallback((item,index)=>{
    dispatch({type:'animationHidden/setStarCurrentNav',payload: index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }else{
      dispatch({type:'animationHidden/resetStar'})
      dispatch({type:'animationHidden/getStarAnimation'})
    }
  },[])
  const galaxyHandleClick=useCallback((item,index)=>{
    dispatch({type:'animationHidden/setGalaxyCurrentNav',payload:index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }else{
      dispatch({type:'animationHidden/resetGalaxy'})
      dispatch({type:'animationHidden/getGalaxyAnimation'})
    }
  },[])
  const universeHandleClick=useCallback((item,index)=>{
    dispatch({type:'animationHidden/setUniverseCurrentNav',payload:index})
    if(index==3){
      router.push('/hidden/image-quotation')
    }else{
      dispatch({type:'animationHidden/resetUniverse'})
      dispatch({type:'animationHidden/getUniverseAnimation'})
    }
  },[])
  const play=useCallback((item,type)=>{
    dispatch({type:'animationHidden/setCurrent',payload:{type,item}})
    dispatch({type:'animationHidden/openVideo'})
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div className={styles.space}></div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
      <NavBar navButtons={starNavButtons} currentNav={starCurrentNav} handleClick={starHandleClick}/>
      <div className={styles.starContainer}>
        {
          starVideoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img onClick={play.bind(null,item,'star')} src="/playBtn.png" className={styles.playIcon} alt="" />
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
          galaxyVideoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img onClick={play.bind(null,item,'galaxy')} src="/playBtn.png" className={styles.playIcon} alt="" />
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
          universeVideoList.map((item,index)=>(
            <OverPack playScale={0.3} key={index}>
              <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'video'} className={styles.listItem}>
                <div className={styles.imgWrapper}>
                  <img src={item.imgUrl} alt="" className={styles.listImg} />
                  <img onClick={play.bind(null,item,'universe')} src="/playBtn.png" className={styles.playIcon} alt="" />
                </div>
                <div className={styles.nameWrapper}><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span></div>
                <div className={styles.descWrapper}><span className={styles.descText}>{item.desc}</span></div>
              </TweenOne>
            </OverPack>
          ))
        }
      </div>
      <LoadMore loadMore={universeLoadMore}  />
      <Video/>
    </div>
  )
}
export default connect(({animationHidden:{currentCate,starVideoList,galaxyVideoList,universeVideoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,starVideoList,galaxyVideoList,universeVideoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(AnimationHidden)
