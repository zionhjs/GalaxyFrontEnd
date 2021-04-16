import React, { useCallback, useEffect, useMemo } from 'react';
import {connect} from 'dva'
import styles from './index.css'
import classnames from 'classnames';
import _ from 'lodash';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import * as moment from 'moment';
import NavBar from '@/components/ImageHiddenNavBar'
import AnimationMobile from '@/mobile/AnimationHidden'
import { FullscreenOutlined } from '@ant-design/icons';
import Video from '@/components/HiddenVideo'
import router from 'umi/router';

const AnimationHidden=props=>{
  const {dispatch,currentCate,starVideoList,galaxyVideoList,universeVideoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}=props
  const isMobile=window.screen.width<768
  useEffect(()=>{
    dispatch({type:'animationHidden/getStarAnimation'})
    dispatch({type:'animationHidden/getGalaxyAnimation'})
    dispatch({type:'animationHidden/getUniverseAnimation'})
  },[])

  let starList = useMemo(() => {
    return _.chunk(starVideoList, 3)
  }, [starVideoList])
  let galaxyList = useMemo(() => {
    return _.chunk(galaxyVideoList, 3)
  }, [galaxyVideoList])
  let universeList = useMemo(() => {
    return _.chunk(universeVideoList, 3)
  }, [universeVideoList])
  const handleClick=useCallback(item=>{
    dispatch({type:'animationHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  const play=useCallback((item,type)=>{
    dispatch({type:'animationHidden/setCurrent',payload:{type,item}})
    dispatch({type:'animationHidden/openVideo'})
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
    }else {
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
  return isMobile ? (<AnimationMobile />) : (
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
          starList.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0],'star')} src="/playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1],'star')} src="/playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2],'star')} src="/playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
        <div onClick={starLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></div>
      </div>
      <div id={'galaxy'} className={styles.titleBox}>Galaxy - Excellent Quality</div>
      <NavBar navButtons={galaxyNavButtons} currentNav={galaxyCurrentNav} handleClick={galaxyHandleClick}/>
      <div className={styles.galaxyContainer}>
        {
          galaxyList.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0],'galaxy')} src="/playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1],'galaxy')} src="/playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2],'galaxy')} src="/playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
        <div onClick={galaxyLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></div>
      </div>
      <div id={'universe'} className={styles.titleBox}>Universe - Superior Quality</div>
      <NavBar navButtons={universeNavButtons} currentNav={universeCurrentNav} handleClick={universeHandleClick}/>
      <div className={styles.universeContainer}>
        {
          universeList.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0],'universe')} src="/playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1],'universe')} src="/playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2],'universe')} src="/playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
        <div onClick={universeLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></div>
      </div>
      <Video/>
    </div>
  )
}
export default connect(({animationHidden:{currentCate,starVideoList,galaxyVideoList,universeVideoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,starVideoList,galaxyVideoList,universeVideoList,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(AnimationHidden)
